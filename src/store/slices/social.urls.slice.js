import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SocialUrlsService from "../../services/social.urls.service";

const name = 'social_urls';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const socialUrlActions = {...slice.actions, ...extraActions};
export const socialUrlReducer = slice.reducer;

function createInitialState() {
    return {
        social_urls: {}
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
                const res = await SocialUrlsService.get();
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
                state.social_urls = action.payload;
            },
        }
    }
}
