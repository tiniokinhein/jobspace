import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'job_preference';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const jobPreferenceActions = {...slice.actions, ...extraActions};
export const jobPreferenceReducer = slice.reducer;

function createInitialState() {
    return {
        job_preference: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
        create: create()
    }

    function get() {
        return createAsyncThunk(
            `${name}`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/job-preference')
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/job-preference', {...data})
                thunkAPI.dispatch(setMessage('Successful to update the job preference.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
        ...create()
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.job_preference = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.job_preference = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}