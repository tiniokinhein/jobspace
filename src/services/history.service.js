import {fetchWrapper} from "../helpers";

const getTrxHistories = (params) => {
    return fetchWrapper.get(`/employer/histories`, params);
}

const getPkgUsages = () => {
    return fetchWrapper.get('/employer/usages');
}

const HistoryDataService = { get: getTrxHistories, getPkgUsages };

export default HistoryDataService;