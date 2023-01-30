import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";

const name = 'latest_experience';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const latestExperienceActions = {...slice.actions, ...extraActions};
export const latestExperienceReducer = slice.reducer;

function createInitialState() {
    return {
        latest_experience: {},
    }
}

function createExtraActions() {
    return {
        get: get(),
    }

    function get() {
        return createAsyncThunk(
            `${name}/get`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/experiences?latest=1')
                return res.data ?? {}
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.latest_experience = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}