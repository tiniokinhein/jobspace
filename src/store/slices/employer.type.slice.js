import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EmployerTypeService from "../../services/employer.type.service";

const name = 'employer_types';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const employerTypeActions = { ...slice.actions, ...extraActions };
export const employerTypReducer = slice.reducer;

function createInitialState() {
    return {
        employer_types: {}
    }
}

function createExtraActions() {
    return {
        getAll: getAll()
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await EmployerTypeService.all()
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    }

    function getAll() {
        let {fulfilled} = extraActions.getAll;

        return {
            [fulfilled]: (state, action) => {
                state.employer_types = action.payload.data;
            }
        }
    }
}