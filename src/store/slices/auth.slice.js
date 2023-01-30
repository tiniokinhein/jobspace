import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchWrapper, history} from '../../helpers';
import {setMessage, setOpen} from "./message.slice";
import SeekerDataService from "../../services/seeker.service";
import {employerAuthActions} from "../index";

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({name, initialState, reducers, extraReducers});
export const authActions = {...slice.actions, ...extraActions};
export const authReducer = slice.reducer;
const baseUrl = `${process.env.REACT_APP_API_URL}/job-seeker`;

function createInitialState() {
    return {
        user: {},
        alert: null,
        alertType: 'success',
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    }
}

function createReducers() {
    return {
        logout,
        clearAlert,
        internalLogout
    };

    function logout(state) {
        state.user = {};
        state.isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/';
    }

    function internalLogout(state) {
        state.user = {};
        state.isLoggedIn = false;
        localStorage.removeItem('isLoggedIn');
    }

    function clearAlert(state) {
        state.alert = null;
    }
}

function createExtraActions() {

    return {
        login: login(),
        getUser: getUser(),
        register: register(),
        sessionLogout: sessionLogout(),
        loginWithSocial: loginWithSocial(),
    };

    function login() {
        return createAsyncThunk(
            `${name}/login`,
            async ({email, password}, ThunkAPI) => {
                await fetchWrapper.login(`${baseUrl}/login`, {email, password})
                ThunkAPI.dispatch(setMessage('You have successfully logged in.'))
                ThunkAPI.dispatch(setOpen(true))
                ThunkAPI.dispatch(employerAuthActions.logout())
            }
        );
    }

    function sessionLogout() {
        return createAsyncThunk(
            `${name}/logout`,
            async (_, ThunkAPI) => {
                await fetchWrapper.get(`/job-seeker/session-logout`)
                ThunkAPI.dispatch(setMessage('You have successfully logged out.'));
                ThunkAPI.dispatch(setOpen(true));
            }
        );
    }

    function getUser() {
        return createAsyncThunk(`${name}/user`, async () => await SeekerDataService.get());
    }

    function register() {
        return createAsyncThunk(
            `${name}/register`,
            async ({...data}, ThunkAPI) => {
                await fetchWrapper.post(`/job-seeker/register`, {...data})
                ThunkAPI.dispatch(setMessage('JobSpace Account Registration is successful.'));
                ThunkAPI.dispatch(setOpen(true))
            }
        )
    }

    function loginWithSocial() {
        return createAsyncThunk(
            `${name}/loginWithSocial`,
            async ({data, type}, ThunkAPI) => {
                await fetchWrapper.socialLogin(`${baseUrl}/auth/social${data}&type=${type}`)
                ThunkAPI.dispatch(employerAuthActions.logout())
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...login(),
        ...getUser(),
        ...register(),
        ...loginWithSocial(),
        ...sessionLogout()
    };

    function login() {
        return actions(extraActions.login);
    }

    function loginWithSocial() {
        return actions(extraActions.loginWithSocial);
    }

    function register() {
        let {pending, fulfilled, rejected} = extraActions.register;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.employer = null;
                localStorage.removeItem('isEmpLoggedIn');
                const {from} = history.location.state || {from: {pathname: '/seekers/sign-in'}};
                state.alert = "Your account has been created successfully you can now log in.";
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
                state.user = {}
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getUser() {
        let {pending, fulfilled, rejected} = extraActions.getUser;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.user = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function actions(actions) {
        let {pending, fulfilled, rejected} = actions;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.isLoggedIn = true;
                localStorage.setItem('isLoggedIn', true);
                window.location.href = '/seekers/dashboard';
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }
}