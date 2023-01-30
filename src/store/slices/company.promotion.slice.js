import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../../helpers";
import {setMessage, setOpen} from "./message.slice";

const name = 'companyPromotions';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const companyPromotionActions = {...slice.actions, ...extraActions};
export const companyPromotionReducer = slice.reducer;

function createInitialState() {
    return {
        promotions: {},
        products: {},
    }
}

function createExtraActions() {
    return {
        getProducts: getProducts(),
        createProduct: createProduct(),
        getPromotions: getPromotions(),
        deleteProducts: deleteProducts(),
        createPromotion: createPromotion(),
        deletePromotions: deletePromotions(),
    }

    function getPromotions() {
        return createAsyncThunk(
            `${name}/promotions`,
            async (params) => await fetchWrapper.get('/employer/promotions', params)
        )
    }

    function getProducts() {
        return createAsyncThunk(
            `${name}/products`,
            async (params) => await fetchWrapper.get('/employer/products', params)
        )
    }

    function createPromotion() {
        return createAsyncThunk(
            `${name}/create`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.post('/employer/promotions', data, true)
                thunkAPI.dispatch(setMessage('The promotion uploaded.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function createProduct() {
        return createAsyncThunk(
            `${name}/create`,
            async (data, thunkAPI) => {
                const res = await fetchWrapper.post('/employer/products', data, true)
                thunkAPI.dispatch(setMessage('The product uploaded.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {};
            }
        )
    }

    function deletePromotions() {
        return createAsyncThunk(
            `${name}/delete`,
            async (uuid, thunkAPI) => {
                const res = await fetchWrapper.delete(`/employer/promotions/${uuid}`)
                thunkAPI.dispatch(setMessage('The promotion removed.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {}
            }
        )
    }

    function deleteProducts() {
        return createAsyncThunk(
            `${name}/delete`,
            async (uuid, thunkAPI) => {
                const res = await fetchWrapper.delete(`/employer/products/${uuid}`)
                thunkAPI.dispatch(setMessage('The product removed.'))
                thunkAPI.dispatch(setOpen(true))
                return res.data ?? {}
            }
        )
    }
}

function createExtraReducers() {
    return {
        ...getProducts(),
        ...getPromotions(),
        ...deleteProducts(),
        ...deletePromotions(),
        ...createProduct(),
        ...createPromotion()
    };

    function getProducts() {
        let {pending, fulfilled, rejected} = extraActions.getProducts;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.products = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function getPromotions() {
        let {pending, fulfilled, rejected} = extraActions.getPromotions;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                state.promotions = action.payload.data;
            },
            [rejected]: (state, action) => {
                state.error = action.error;
            }
        }
    }

    function createProduct() {
        let {pending, fulfilled, rejected} = extraActions.createProduct;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                //
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function createPromotion() {
        let {pending, fulfilled, rejected} = extraActions.createPromotion;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                //
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function deleteProducts() {
        let {pending, fulfilled, rejected} = extraActions.deleteProducts;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                //
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }

    function deletePromotions() {
        let {pending, fulfilled, rejected} = extraActions.deletePromotions;

        return {
            [pending]: (state) => {
                state.error = null
            },
            [fulfilled]: (state, action) => {
                //
            },
            [rejected]: (state, action) => {
                if (action.error?.message) {
                    setMessage(`${action.error.message}`)
                }
            }
        }
    }
}