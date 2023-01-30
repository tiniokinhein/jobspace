import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SlideShowAdService from "../../services/slide.show.ad.service";

const name = 'slide_show_ads';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const slideShowAdActions = {...slice.actions, ...extraActions};
export const slideShowAdReducer = slice.reducer;

function createInitialState() {
    return {
        slide_show_ads: {}
    }
}

function createExtraActions() {
    return {
        getAll: getAll()
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await SlideShowAdService.all()
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
                state.slide_show_ads = action.payload.data;
            },
        }
    }
}