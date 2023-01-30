import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchWrapper} from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = "companies";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers,
});

export const companiesActions = {...slice.actions, ...extraActions};
export const companyReducer = slice.reducer;

function createInitialState() {
    return {
        companies: {},
    };
}

function createExtraActions() {
    return {
        getAll: getAll(),
        getByUuid: getByUuid(),
        create: create(),
    };

    function getAll() {
        return createAsyncThunk(
            `${name}`,
            async () => {
                const res = await fetchWrapper.get('/companies')
                return res.data ?? {}
            }
        )
    }

    function getByUuid() {
        return createAsyncThunk(
            `${name}`,
            async (uuid) => {
                const res = await fetchWrapper.get(`/companies/${uuid}`)
                return res.data ?? {}
            }
        )
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async (data, ThunkAPI) => {
                await fetchWrapper.post(`/employer/company`, data, true);
                ThunkAPI.dispatch(setMessage('Company profile updated.'))
                ThunkAPI.dispatch(setOpen(true))
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...getByUuid(),
        ...create(),
    };

    function getAll() {
        let {fulfilled} = extraActions.getAll;

        return {
            [fulfilled]: (state, action) => {
                state.companies = action.payload;
            },
        };
    }

    function getByUuid() {
        let {fulfilled} = extraActions.getByUuid;

        return {
            [fulfilled]: (state, action) => {
                state.companies = action.payload;
            },
        };
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.company = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}
