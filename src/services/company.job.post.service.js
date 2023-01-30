import {fetchWrapper} from "../helpers";

const all = (uuid, params) => {
    return fetchWrapper.get(`/companies/${uuid}/job-posts`, params);
}

const CompanyJobPostDataService = { all };

export default CompanyJobPostDataService;