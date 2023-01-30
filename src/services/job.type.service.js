import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get(`/job-types`, params);
}

const JobTypeDataService = { get };

export default JobTypeDataService;