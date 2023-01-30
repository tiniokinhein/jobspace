import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'seeker_experiences';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const seekerExperienceActions = {...slice.actions, ...extraActions};
export const seekerExperienceReducer = slice.reducer;

function createInitialState() {
    return {
        seeker_experience: {},
        seeker_experiences: {},
    }
}

function createExtraActions() {
    return {
        get: get(),
        show: show(),
        create: create(),
        update: update(),
        destroy: destroy()
    }

    function get() {
        return createAsyncThunk(
            `${name}/get`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/experiences')
                return res.data ?? {}
            }
        )
    }

    function show() {
        return createAsyncThunk(
            `${name}/show`,
            async (uuid) => {
                const res = await fetchWrapper.get(`/job-seeker/experiences/${uuid}`)
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/experiences', {...data})
                thunkAPI.dispatch(setMessage('Successful to update the experience.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async ({data, uuid}, thunkAPI) => {
                const res = await fetchWrapper.put(`/job-seeker/experiences/${uuid}`, {...data})
                thunkAPI.dispatch(setMessage('Successful to update the experience.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function destroy() {
        return createAsyncThunk(
            `${name}/delete`,
            async (uuid, thunkAPI) => {
                const res = await fetchWrapper.delete(`/job-seeker/experiences/${uuid}`)
                thunkAPI.dispatch(setMessage('Successful to remove the experience.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {}
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
        ...show(),
        ...create(),
        ...update(),
        ...destroy()
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.seeker_experiences = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function show() {
        let {pending, fulfilled, rejected} = extraActions.show;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.seeker_experience = action.payload;
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
                state.seeker_experiences = action.payload;
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
                state.seeker_experience = action.payload;
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
                state.seeker_experience = [];
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}