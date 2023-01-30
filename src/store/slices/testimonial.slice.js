import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TestimonialService from "../../services/testimonial.service";

const name = 'testimonials';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const testimonialActions = {...slice.actions, ...extraActions};
export const testimonialReducer = slice.reducer;

function createInitialState() {
    return {
        testimonials: {}
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
                const res = await TestimonialService.all();
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
                state.testimonials = action.payload;
            },
        }
    }
}
