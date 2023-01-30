import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'me';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const userActions = {...slice.actions, ...extraActions};
export const userReducer = slice.reducer;

function createInitialState() {
    return {
        me: {}
    }
}

function createExtraActions() {
    return {
        get: get(),
        update: update(),
        followCompany: followCompany(),
        updateAccount: updateAccount(),
        unFollowCompany: unFollowCompany(),
    }

    function get() {
        return createAsyncThunk(
            `${name}`,
            async () => {
                const res = await fetchWrapper.get('/job-seeker/me')
                return res.data ?? {}
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/open-to-work', {...data})
                return res.data ?? {};
            }
        )
    }

    function updateAccount() {
        return createAsyncThunk(
            `${name}/updateAccount`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.put('/job-seeker/me', data)
                thunkAPI.dispatch(setMessage('Your account setting updated.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function followCompany() {
        return createAsyncThunk(
            `${name}/follow`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/follow-company', {...data})
                thunkAPI.dispatch(setMessage('Successful follow the company.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function unFollowCompany() {
        return createAsyncThunk(
            `${name}/unfollow`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/job-seeker/unfollow-company', {...data})
                thunkAPI.dispatch(setMessage('Successful unfollow the company.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...get(),
        ...update(),
        ...followCompany(),
        ...unFollowCompany(),
        ...updateAccount()
    };

    function get() {
        let {pending, fulfilled, rejected} = extraActions.get;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.me = action.payload;
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
                state.me = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function updateAccount() {
        let {pending, fulfilled, rejected} = extraActions.updateAccount;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.me = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function followCompany() {
        let {pending, fulfilled, rejected} = extraActions.followCompany;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.me = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function unFollowCompany() {
        let {pending, fulfilled, rejected} = extraActions.unFollowCompany;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.me = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}

