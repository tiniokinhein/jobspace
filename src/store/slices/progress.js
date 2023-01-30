import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    progress: 0,
};
const progressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        clearProgress: () => {
            return {progress: 0};
        },
    },
});

const {reducer, actions} = progressSlice;

export const {setProgress, clearProgress} = actions

export default reducer;