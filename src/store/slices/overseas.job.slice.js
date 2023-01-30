import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'overseas-jobs';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const overseasJobsActions = {...slice.actions, ...extraActions};
export const overseasJobsReducer = slice.reducer;

function createInitialState() {
    return {
        overseasJob: {},
        overseasJobs: {},
    }
}

function createExtraActions() {
    return {
        getAll: getAll(),
        create: create(),
        update: update(),
        getDataByUuid: getDataByUuid(),
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async (params) => {
                return await fetchWrapper.get('/job-posts', params);
            }
        )
    }

    function getDataByUuid() {
        return createAsyncThunk(
            `${name}/getJobPostByUuid`,
            async (uuid) => {
                const res = await fetchWrapper.get(`/employer/job-posts/${uuid}`);
                return res.data ?? {};
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`, async (data, ThunkAPI) => {
                const res = await fetchWrapper.post(`/employer/job-posts/`, data)
                ThunkAPI.dispatch(setMessage('Your application submitted.'))
                ThunkAPI.dispatch(setOpen(true));
                return res.data ?? {};
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`, async ({uuid, data}, ThunkAPI) => {
                const res = await fetchWrapper.put(`/employer/job-posts/${uuid}`, data)
                ThunkAPI.dispatch(setMessage('Your application updated.'))
                ThunkAPI.dispatch(setOpen(true));
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...create(),
        ...getDataByUuid()
    }

    function getAll() {
        let {fulfilled} = extraActions.getAll;

        return {
            [fulfilled]: (state, action) => {
                state.overseasJobs = action.payload;
            },
        }
    }

    function getDataByUuid() {
        let {fulfilled} = extraActions.getDataByUuid;

        return {
            [fulfilled]: (state, action) => {
                state.overseasJob = action.payload;
            },
        }
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.overseasJob = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}