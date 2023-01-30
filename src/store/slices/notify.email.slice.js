import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {setMessage, setOpen} from "./message.slice";
import NotifyEmailService from "../../services/notify.email.service";

const name = 'notify-email';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const notifyEmailActions = {...slice.actions, ...extraActions};
export const notifyEmailReducer = slice.reducer;

function createInitialState() {
    return {
        notifyEmail: {}
    }
}

function createExtraActions() {
    return {
        create: create()
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async ({...data}, thunkAPI) => {
                const res = await NotifyEmailService.create({...data})
                thunkAPI.dispatch(setMessage('You have successfully subscribed.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...create()
    };
    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.notifyEmail = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}