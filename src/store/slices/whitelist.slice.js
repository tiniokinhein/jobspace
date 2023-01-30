import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage} from "./message.slice";

const name = 'whitelists';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const whitelistActions = {...slice.actions, ...extraActions};
export const whitelistReducer = slice.reducer;


function createInitialState() {
    return {
        whitelists: {}
    }
}

function createExtraActions() {
    return {
        all: all(),
        create: create(),
    }

    function all() {
        return createAsyncThunk(
            `${name}/all`,
            async (params) => {
                return await fetchWrapper.get('/job-seeker/whitelists', params);
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `seekers/whitelists`,
            async ({...data}, thunkAPI) => {
                try {
                    const res = await fetchWrapper.post(`/job-seeker/${name}`, {...data});
                    thunkAPI.dispatch(setMessage(res.message))
                    return res;
                } catch (error) {
                    const message = (error.response && error.response.data.message) || error.message || error.toString();
                    thunkAPI.dispatch(setMessage(message));
                    return thunkAPI.rejectWithValue();
                }
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...all(),
        ...create()
    }

    function all() {
        let {fulfilled} = extraActions.all;

        return {
            [fulfilled]: (state, action) => {
                state.whitelists = action.payload;
            },
        }
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.whitelists = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}