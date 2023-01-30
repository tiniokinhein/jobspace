import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'apply_job';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const applyJobActions = {...slice.actions, ...extraActions};
export const applyJobReducer = slice.reducer;

function createInitialState() {
    return {
        apply_job: {},
        applied_jobs: {},
        active_jobs: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
        create: create(),
        getActiveJobs: getActiveJobs()
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async (data, ThunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/apply-jobs', data, true)

                ThunkAPI.dispatch(setMessage('Job Applied.'));
                ThunkAPI.dispatch(setOpen(true));

                return res.data ?? {};
            }
        )
    }

    function get() {
        return createAsyncThunk(
            `${name}/get`,
            async (params) => {
                const res = await fetchWrapper.get('/job-seeker/apply-jobs', params)
                return res.data ?? {};
            }
        )
    }

    function getActiveJobs() {
        return createAsyncThunk(
            `${name}/active_jobs`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/apply-jobs', {is_active: 1})
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
        ...create(),
        ...getActiveJobs()
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.apply_job = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.applied_jobs = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getActiveJobs() {
        let {pending, fulfilled, rejected} = extraActions.getActiveJobs;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.active_jobs = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}
