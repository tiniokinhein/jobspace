import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'resume';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const resumeActions = {...slice.actions, ...extraActions};
export const resumeReducer = slice.reducer;

function createInitialState() {
    return {
        resume: {},
        applicantResume: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
        create: create(),
        update: update(),
        getApplicantResume: getApplicantResume()
    }

    function get() {
        return createAsyncThunk(
            `${name}/get`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/resume')
                return res.data ?? {}
            }
        )
    }

    function getApplicantResume() {
        return createAsyncThunk(
            `${name}/applicant`,
            async ({pId, uId}) => {
                const res = await fetchWrapper.get(`/employer/posted-jobs/${pId}/applicants/${uId}/resume`)
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/resume', data, true)
                thunkAPI.dispatch(setMessage('Your CV file uploaded.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async ({data, uuid}, thunkAPI) => {
                const res = await fetchWrapper.post(`/job-seeker/resume/${uuid}`, data, true)
                thunkAPI.dispatch(setMessage('Your CV file replaced.'))
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
        ...update(),
        ...getApplicantResume()
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.resume = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getApplicantResume() {
        let {pending, fulfilled, rejected} = extraActions.getApplicantResume;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.applicantResume = action.payload;
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
                state.resume = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function update() {
        let {pending, fulfilled, rejected} = extraActions.update;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.resume = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}

