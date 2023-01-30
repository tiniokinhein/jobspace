import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'companyPhotos';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const companyPhotoActions = {...slice.actions, ...extraActions};
export const companyPhotoReducer = slice.reducer;

function createInitialState() {
    return {
        photos: {},
    }
}

function createExtraActions() {
    return {
        get: get(),
        create: create(),
        destroy: destroy()
    }

    function get() {
        return createAsyncThunk(
            `${name}/get`,
            async (data) => await fetchWrapper.get('/employer/photos', data)
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.post('/employer/photos', data, true)
                thunkAPI.dispatch(setMessage('The photo uploaded.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function destroy() {
        return createAsyncThunk(
            `${name}/delete`,
            async (uuid, thunkAPI) => {
                const res = await fetchWrapper.delete(`/employer/photos/${uuid}`)
                thunkAPI.dispatch(setMessage('The uploaded photo removed.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {}
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
        ...create(),
        ...destroy()
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.photos = action.payload.data;
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
                state.photos = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function destroy() {
        let {pending, fulfilled, rejected} = extraActions.destroy;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
               //
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}