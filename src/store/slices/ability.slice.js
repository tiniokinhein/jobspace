import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";

const name = 'ability';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const abilitiesActions = {...slice.actions, ...extraActions};
export const abilitiesReducer = slice.reducer;

function createInitialState() {
    return {
        abilities: {},
    }
}

function createExtraActions() {
    return {
        getAll: getAll(),
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => {
                return await fetchWrapper.get('/employer/abilities');
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
    }

    function getAll() {
        let {pending, fulfilled, rejected} = extraActions.getAll;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.abilities = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}