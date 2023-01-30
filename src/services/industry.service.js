import {fetchWrapper} from "../helpers";

const all = (params) => {
    return fetchWrapper.get("/industries", params);
}

const getByUuid = (uuid) => {
    return fetchWrapper.get(`/industries/${uuid}`);
}

const IndustryDataService = { all, getByUuid };

export default IndustryDataService;