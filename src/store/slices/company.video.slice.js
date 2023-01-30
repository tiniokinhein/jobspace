import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'companyVideos';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const companyVideoActions = {...slice.actions, ...extraActions};
export const companyVideoReducer = slice.reducer;

function createInitialState() {
    return {
        videos: {},
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
            async (data) => await fetchWrapper.get('/employer/videos', {...data})
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.post('/employer/videos', data)
                thunkAPI.dispatch(setMessage('The video uploaded.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function destroy() {
        return createAsyncThunk(
            `${name}/delete`,
            async (uuid, thunkAPI) => {
                const res = await fetchWrapper.delete(`/employer/videos/${uuid}`)
                thunkAPI.dispatch(setMessage('The uploaded video removed.'))
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
                state.videos = action.payload.data;
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
                state.videos = action.payload;
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