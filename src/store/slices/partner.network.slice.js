import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PartnerNetworkService from "../../services/partner.network.service";

const name = 'partner_networks';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({
    name,
    initialState,
    extraReducers
});

export const partnerNetworkActions = {...slice.actions, ...extraActions};
export const partnerNetworkReducer = slice.reducer;

function createInitialState() {
    return {
        partnerNetworks: {}
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
                const res = await PartnerNetworkService.all();
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
                state.partnerNetworks = action.payload;
            },
        }
    }
}
