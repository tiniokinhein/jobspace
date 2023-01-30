import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";

const name = 'seeker_profile';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const SeekerProfileActions = {...slice.actions, ...extraActions};
export const seekerProfileReducer = slice.reducer;

function createInitialState() {
    return {
        seeker_profile: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
    }

    function get() {
        return createAsyncThunk(
            `${name}`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/profile')
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
                state.seeker_profile = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}

