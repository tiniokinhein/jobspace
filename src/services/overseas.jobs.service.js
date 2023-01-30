import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get('/job-posts', params);
}

const getByUuid = (uuid) => {
    return fetchWrapper.get(`/job-posts/${uuid}`);
}

const OverseasJobsDataService = { get, getByUuid };

export default OverseasJobsDataService;