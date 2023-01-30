import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'job_alert';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const jobAlertActions = {...slice.actions, ...extraActions};
export const jobAlertReducer = slice.reducer;

function createInitialState() {
    return {
        job_alert: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
        create: create(),
        update: update()
    }

    function get() {
        return createAsyncThunk(
            `${name}`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/job-alerts')
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/job-alerts', data)
                thunkAPI.dispatch(setMessage('Successful to update the create job alert.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async ({data, uuid}, thunkAPI) => {
                const res = await fetchWrapper.put(`/job-seeker/job-alerts/${uuid}`, {...data})
                thunkAPI.dispatch(setMessage('Successful to update the job alert.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
        ...create(),
        ...update()
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.job_alert = action.payload;
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
                state.job_alert = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function update() {
        let {pending, fulfilled, rejected} = extraActions.update();

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.job_alert = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}

