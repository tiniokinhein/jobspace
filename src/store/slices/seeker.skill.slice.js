import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'seeker_skills';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const seekerSkillActions = {...slice.actions, ...extraActions};
export const seekerSkillReducer = slice.reducer;

function createInitialState() {
    return {
        seeker_skill: {},
        seeker_skills: {}
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
                const res = await fetchWrapper.get('/job-seeker/skills')
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/skills', {...data})
                thunkAPI.dispatch(setMessage('Successful to update the skill.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function destroy() {
        return createAsyncThunk(
            `${name}/delete`,
            async (uuid, thunkAPI) => {
                const res = await fetchWrapper.delete(`/job-seeker/skills/${uuid}`)
                thunkAPI.dispatch(setMessage('Successful to remove the skill.'))
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
                state.seeker_skills = action.payload;
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
                state.seeker_skills = action.payload;
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
                state.seeker_skill = [];
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}