import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'recruitment';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const recruitmentActions = {...slice.actions, ...extraActions};
export const recruitmentReducer = slice.reducer;

function createInitialState() {
    return {
        analysis: {},
        applicants: {},
        candidates: {},
        considerings: {},
        prescreens: {},
        shortlisted: {},
        interviews: {},
        hires: {},
        notSuitable: {},
    }
}

function createExtraActions() {
    return {
        getAnalysis: getAnalysis(),
        getApplicants: getApplicants(),
        getAllApplicants: getAllApplicants(),
        updateApplicantType: updateApplicantType(),
        getCandidates: getCandidates(),
        getConsiderings: getConsiderings(),
        getPrescreens: getPrescreens(),
        getShortlisted: getShortListed(),
        getInterviews: getInterviews(),
        getHires: getHires(),
        getNotSuitable: getNotSuitable()
    }

    function getApplicants() {
        return createAsyncThunk(
            `${name}/get`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getAllApplicants() {
        return createAsyncThunk(
            `${name}/all-applicants`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/applicants`, params)
        )
    }

    function getCandidates() {
        return createAsyncThunk(
            `${name}/candidates`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getConsiderings() {
        return createAsyncThunk(
            `${name}/considerings`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getPrescreens() {
        return createAsyncThunk(
            `${name}/prescreens`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getShortListed() {
        return createAsyncThunk(
            `${name}/shortlisted`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getInterviews() {
        return createAsyncThunk(
            `${name}/interviews`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getHires() {
        return createAsyncThunk(
            `${name}/hires`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getNotSuitable() {
        return createAsyncThunk(
            `${name}/not-suitable`,
            async ({uuid, params}) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/applicants`, params)
        )
    }

    function getAnalysis() {
        return createAsyncThunk(
            `${name}/analysis`,
            async (uuid) => await fetchWrapper.get(`/employer/posted-jobs/${uuid}/analysis`)
        )
    }

    function updateApplicantType() {
        return createAsyncThunk(
            `${name}/update`,
            async ({uuid, data}, ThunkAPI) => {
                await fetchWrapper.post(`/employer/posted-jobs/${uuid}/applicants`, data)
                ThunkAPI.dispatch(setMessage('Applicant moved.'));
                ThunkAPI.dispatch(setOpen(true));
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getAnalysis(),
        ...getApplicants(),
        ...getAllApplicants(),
        ...getCandidates(),
        ...getConsiderings(),
        ...getPrescreens(),
        ...getShortListed(),
        ...getInterviews(),
        ...getHires(),
        ...getNotSuitable()
    };

    function getAnalysis() {
        let {pending, fulfilled, rejected} = extraActions.getAnalysis;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.analysis = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getApplicants() {
        let {pending, fulfilled, rejected} = extraActions.getApplicants;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.applicants = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getAllApplicants() {
        let {pending, fulfilled, rejected} = extraActions.getApplicants;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.applicants = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getCandidates() {
        let {pending, fulfilled, rejected} = extraActions.getCandidates;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.candidates = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getConsiderings() {
        let {pending, fulfilled, rejected} = extraActions.getConsiderings;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.considerings = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getPrescreens() {
        let {pending, fulfilled, rejected} = extraActions.getPrescreens;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.prescreens = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getShortListed() {
        let {pending, fulfilled, rejected} = extraActions.getShortlisted;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.shortlisted = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getInterviews() {
        let {pending, fulfilled, rejected} = extraActions.getInterviews;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.interviews = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getHires() {
        let {pending, fulfilled, rejected} = extraActions.getHires;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.hires = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getNotSuitable() {
        let {pending, fulfilled, rejected} = extraActions.getNotSuitable;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.notSuitable = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}

