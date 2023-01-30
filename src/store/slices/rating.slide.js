import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage, setOpen} from "./message.slice";
import {fetchWrapper} from "../../helpers";

const name = 'rating';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const ratingActions = {...slice.actions, ...extraActions};
export const ratingReducer = slice.reducer;

function createInitialState() {
    return {
        rating: {}
    }
}

function createExtraActions() {
    return {
        create: create()
    }

    function create() {
        return createAsyncThunk(
            `${name}`,
            async ({uuid, data}, thunkAPI) => {
                const res = await fetchWrapper.post(`/employer/posted-jobs/${uuid}/rating`, data)
                thunkAPI.dispatch(setMessage("Applicant's rating set."))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...create()
    };

    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.rating = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}