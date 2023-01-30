import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage, setOpen} from "./message.slice";
import {fetchWrapper} from "../../helpers";

const name = "employer_contact_persons";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers,
});

export const employerContactPersonActions = {...slice.actions, ...extraActions};
export const employerContactPersonReducer = slice.reducer;

function createInitialState() {
    return {
        employer_contact_persons: {},
    };
}

function createExtraActions() {
    return {
        getAll: getAll(),
        create: create(),
        update: update()
    };

    function getAll() {
        return createAsyncThunk(`${name}/getAll`, async () => {
            const res = await fetchWrapper.get('/employer/contact-persons');
            return res.data ?? {};
        });
    }

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async ({...data}, thunkAPI) => {
                const res = await fetchWrapper.post('/employer/contact-persons', {...data})
                thunkAPI.dispatch(setMessage('Contact person added.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async ({uuid, data}, thunkAPI) => {
                const res = await fetchWrapper.put(`/employer/contact-persons/${uuid}`, data)
                thunkAPI.dispatch(setMessage('Contact person updated.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getAll(),
        ...create(),
        ...update()
    };

    function getAll() {
        let {pending, fulfilled, rejected} = extraActions.getAll;

        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.employer_contact_persons = action.payload;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            },
        };
    }

    function create() {
        let {pending, fulfilled, rejected} = extraActions.create;

        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.employer_contact_persons = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`);
                }
            },
        };
    }

    function update() {
        let {pending, fulfilled, rejected} = extraActions.update;

        return {
            [pending]: (state) => {
                state.error = null;
            },
            [fulfilled]: (state, action) => {
                state.employer_contact_persons = action.payload;
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`);
                }
            },
        };
    }
}
