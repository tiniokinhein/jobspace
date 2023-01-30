import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get('/job-posts', params);
}

const getByUuid = (uuid) => {
    return fetchWrapper.get(`/job-posts/${uuid}`);
}

const JobsDataService = { get, getByUuid };

export default JobsDataService;