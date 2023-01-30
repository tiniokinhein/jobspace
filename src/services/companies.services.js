import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get('/companies');
}

const getByUuid = (uuid) => {
    return fetchWrapper.get(`/companies/${uuid}`);
}

const CompanyDataService = { all, getByUuid };

export default CompanyDataService;