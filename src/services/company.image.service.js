import {fetchWrapper} from "../helpers";

const all = (uuid, params) => {
    return fetchWrapper.get(`/companies/${uuid}/images`, params);
}

const CompanyImageDataService = { all };

export default CompanyImageDataService;