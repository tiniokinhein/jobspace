import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'seeker_notifications';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const seekerNotificationActions = {...slice.actions, ...extraActions};
export const seekerNotificationReducer = slice.reducer;

function createInitialState() {
    return {
        notifications: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
        update: update(),
        destroy: destroy()
    }

    function get() {
        return createAsyncThunk(
            `${name}/get`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/notifications')
                return res.data ?? {}
            }
        )
    }

    function update() {
        return createAsyncThunk(`${name}/update`, async (data) => await fetchWrapper.post('/job-seeker/notifications', data))
    }

    function destroy() {
        return createAsyncThunk(
            `${name}/destroy`,
            async (uuid, ThunkAPI) => {
                const res = await fetchWrapper.delete(`/job-seeker/notifications/${uuid}`)
                ThunkAPI.dispatch(setMessage('Notification removed.'));
                ThunkAPI.dispatch(setOpen(true));
                return res.data ?? {}
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
        ...update(),
        ...destroy()
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.notifications = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function update() {
        let {pending, fulfilled, rejected} = extraActions.update;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                //
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function destroy() {
        let {pending, fulfilled, rejected} = extraActions.destroy;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                //
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}