import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";

const name = 'seeker_reset_pwd';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const seekerResetPwdActions = {...slice.actions, ...extraActions};
export const seekerResetPwdReducer = slice.reducer;

function createInitialState() {
    return {
        seeker_reset_pwd: {}
    }
}

function createExtraActions() {
    return {
        verifyEmail: verifyEmail(),
        resetPassword: resetPassword(),
    }

    function verifyEmail() {
        return createAsyncThunk(
            `${name}`,
            async (data) => await fetchWrapper.post('/job-seeker/forgot-password', data)
        )
    }

    function resetPassword() {
        return createAsyncThunk(
            `${name}`,
            async (data) => await fetchWrapper.post('/job-seeker/reset-password', data)
        )
    }
}

function createExtraReducers() {
    return {
        ...verifyEmail(),
        ...resetPassword()
    };

    function verifyEmail() {
        let {pending, rejected} = extraActions.verifyEmail;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function resetPassword() {
        let {pending, rejected} = extraActions.verifyEmail;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}

