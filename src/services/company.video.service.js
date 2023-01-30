import {fetchWrapper} from "../helpers";

const all = (uuid, params) => {
    return fetchWrapper.get(`/companies/${uuid}/videos`, params);
}

const CompanyVideoDataService = { all };

export default CompanyVideoDataService;