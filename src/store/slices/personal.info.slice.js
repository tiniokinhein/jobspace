import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'personal_info';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const personalInfoActions = {...slice.actions, ...extraActions};
export const personalInfoReducer = slice.reducer;

function createInitialState() {
    return {
        personal_info: {}
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
                const res = await fetchWrapper.get('/job-seeker/personal-info')
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/personal-info', data, true)
                thunkAPI.dispatch(setMessage('Successful to update the profile.'))
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
                state.personal_info = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.personal_info = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}

