import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import EmployerPositionService from "../../services/employer.position.service";

const name = "employer_positions";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const employerPositionActions = {...slice.actions, ...extraActions};
export const employerPositionReducer = slice.reducer;

function createInitialState() {
    return {
        employer_positions: {}
    }
}

function createExtraActions() {
    return {
        getAll: getAll()
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => {
                const res = await EmployerPositionService.all();
                return res.data ?? {};
            }
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
                state.employer_positions = action.payload;
            },
        }
    }
}
