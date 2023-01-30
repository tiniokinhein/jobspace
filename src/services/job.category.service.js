import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get('/job-categories', params);
}

const getByUuid = (uuid) => {
    return fetchWrapper.get(`/job-categories/${uuid}`);
}

const JobCategoryDataService = { get, getByUuid };

export default JobCategoryDataService;