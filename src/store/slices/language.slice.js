import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";

const name = 'languages';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const languageActions = {...slice.actions, ...extraActions};

export const languageReducer = slice.reducer;

function createInitialState() {
    return {
        languages: {}
    }
}

function createExtraActions() {
    return {
        getAll: getAll()
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get('/languages')
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        let {fulfilled} = extraActions.getAll;

        return {
            [fulfilled]: (state, action) => {
                state.languages = action.payload.data;
            },
        }
    }
}