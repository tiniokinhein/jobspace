import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'seeker_languages';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const seekerLanguageActions = {...slice.actions, ...extraActions};
export const seekerLanguageReducer = slice.reducer;

function createInitialState() {
    return {
        seeker_languages: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
        create: create(),
        destroy: destroy(),
    }

    function get() {
        return createAsyncThunk(
            `${name}`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/language-skills')
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/language-skills', {...data})
                thunkAPI.dispatch(setMessage('Successful to update the languages.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function destroy() {
        return createAsyncThunk(
            `${name}/delete`,
            async (uuid, thunkAPI) => {
                const res = await fetchWrapper.delete(`/job-seeker/language-skills/${uuid}`)
                thunkAPI.dispatch(setMessage('Successful to remove the language.'))
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
                state.seeker_languages = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.seeker_languages = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function destroy() {
        let {pending, rejected} = extraActions.destroy;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}