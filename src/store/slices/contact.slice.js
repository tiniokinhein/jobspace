import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {setMessage, setOpen} from "./message.slice";
import ContactDataService from "../../services/contact.service";

const name = 'contact-us';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const contactActions = {...slice.actions, ...extraActions};
export const contactReducer = slice.reducer;

function createInitialState() {
    return {
        contact: {}
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
                const res = await ContactDataService.create({...data})
                thunkAPI.dispatch(setMessage('Successful send message to contact us.'))
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
                state.contact = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}