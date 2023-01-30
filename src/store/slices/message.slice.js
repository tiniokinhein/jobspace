import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    open: false,
    message: null,
};
const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: () => {
            return {message: ""};
        },
        setOpen: (state, action) => {
            state.open = action.payload;
        }
    },
});

const {reducer, actions} = messageSlice;

export const {setMessage, clearMessage, setOpen} = actions

export default reducer;