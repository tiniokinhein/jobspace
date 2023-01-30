import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper, history} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'empAuth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({name, initialState, reducers, extraReducers});

export const employerAuthActions = {...slice.actions, ...extraActions};
export const employerAuthReducer = slice.reducer;

function createInitialState() {
    return {
        me: {},
        company: {},
        alert: null,
        employer: {},
        alertType: 'success',
        isEmpLoggedIn: localStorage.getItem('isEmpLoggedIn') === 'true'
    }
}

function createReducers() {
    return {
        logout,
        clearAlert,
        internalLogout
    };

    function logout(state) {
        state.employer = {};
        state.isEmpLoggedIn = false;
        localStorage.removeItem('isEmpLoggedIn');
        window.location.href = '/';
    }

    function internalLogout(state) {
        state.employer = {};
        state.isEmpLoggedIn = false;
        localStorage.removeItem('isEmpLoggedIn');
    }

    function clearAlert(state) {
        state.alert = null;
    }
}

function createExtraActions() {
    return {
        me: me(),
        login: login(),
        company: company(),
        register: register(),
        sessionLogout: sessionLogout(),
        updateAccount: updateAccount(),
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({...data}, ThunkAPI) => {
                await fetchWrapper.login(`${process.env.REACT_APP_API_URL}/employer/login`, {...data})
                ThunkAPI.dispatch(setMessage('You have successfully logged in.'));
                ThunkAPI.dispatch(setOpen(true));
                ThunkAPI.dispatch(employerAuthActions.logout())
            }
        );
    }

    function register() {
        return createAsyncThunk(
            `${name}/register`,
            async ({...data}, ThunkAPI) => {
                await fetchWrapper.post(`/employer/register`, {...data})
                ThunkAPI.dispatch(setMessage('JobSpace Employer Registration is successful.'));
                ThunkAPI.dispatch(setOpen(true))
            }
        );
    }

    function sessionLogout() {
        return createAsyncThunk(
            `${name}/logout`,
            async (_, ThunkAPI) => {
                await fetchWrapper.get(`/employer/session-logout`)
                ThunkAPI.dispatch(setMessage('You have successfully logged out.'));
                ThunkAPI.dispatch(setOpen(true));
            }
        );
    }

    function me() {
        return createAsyncThunk(
            `${name}/me`, async () => await fetchWrapper.get('/employer/me')
        );
    }

    function updateAccount() {
        return createAsyncThunk(
            `${name}/updateAccount`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.put('/employer/me', data)
                thunkAPI.dispatch(setMessage('Your account setting updated.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function company() {
        return createAsyncThunk(
            `${name}/company`, async () => await fetchWrapper.get('/employer/company')
        );
    }
}

function createExtraReducers() {
    return {
        ...me(),
        ...login(),
        ...company(),
        ...register(),
        ...sessionLogout(),
        ...updateAccount()
    };

    function login() {
        let {pending, fulfilled, rejected} = extraActions.login;
        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                localStorage.setItem('isEmpLoggedIn', true);
                state.isEmpLoggedIn = true;
                state.user = {};
                localStorage.removeItem('isLoggedIn');
                window.location.href('/')
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        };
    }

    function register() {
        let {pending, fulfilled, rejected} = extraActions.register;
        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.user = null;
                localStorage.removeItem('isLoggedIn');
                const {from} = history.location.state || {from: {pathname: '/employers/sign-in'}};
                state.alert = 'Account Registration was successful. Please wait to approve our admin.';
                history.navigate(from)
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function sessionLogout() {
        let {pending, fulfilled, rejected} = extraActions.sessionLogout;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.employer = {}
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function me() {
        let {pending, fulfilled, rejected} = extraActions.me;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.me = action.payload
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function company() {
        let {pending, fulfilled, rejected} = extraActions.company;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.company = action.payload.data
            },
            [rejected]: (state, action) => {
                state.error = action.error;
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
}