import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AppDataService from "../../services/app.service";

const name = 'app';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const appActions = {...slice.actions, ...extraActions};
export const appReducer = slice.reducer;

function createInitialState() {
    return {
        links: {}
    }
}

function createExtraActions() {
    return {
        get: get()
    }

    function get() {
        return createAsyncThunk(
            `${name}/mobile-links`,
            async () => await AppDataService.get('/mobile-links')
        )
    }
}

function createExtraReducers() {
    return {
        ...get()
    }

    function get() {
        let {fulfilled} = extraActions.get;

        return {
            [fulfilled]: (state, action) => {
                state.links = action.payload.data;
            },
        }
    }
}
