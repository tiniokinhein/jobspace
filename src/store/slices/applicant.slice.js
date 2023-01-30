import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";

const name = 'applicants';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const applicantActions = {...slice.actions, ...extraActions};
export const applicantReducer = slice.reducer;

function createInitialState() {
    return {
        all: {},
        info: {},
        resume: {},
        recent: {}
    }
}

function createExtraActions() {
    return {
        getAll: getAll(),
        getInfo: getInfo(),
        getResume: getResume(),
        getRecent: getRecent(),
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/all-applicants`,
            async (params) => await fetchWrapper.get(`/employer/applicants`, params)
        )
    }

    function getRecent() {
        return createAsyncThunk(
            `${name}/recent`,
            async (params) => await fetchWrapper.get(`/employer/applicants`, params)
        )
    }

    function getInfo() {
        return createAsyncThunk(
            `${name}/info`,
            async (uid) => await fetchWrapper.get(`/employer/applicants/${uid}`)
        )
    }

    function getResume() {
        return createAsyncThunk(
            `${name}/resume`,
            async (uId) => await fetchWrapper.get(`/employer/applicants/${uId}/resume`)
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...getRecent(),
        ...getInfo(),
        ...getResume(),
    };

    function getAll() {
        let {pending, fulfilled, rejected} = extraActions.getAll;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.all = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getRecent() {
        let {pending, fulfilled, rejected} = extraActions.getRecent;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.recent = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getInfo() {
        let {pending, fulfilled, rejected} = extraActions.getInfo;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.info = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getResume() {
        let {pending, fulfilled, rejected} = extraActions.getResume;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.resume = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}

