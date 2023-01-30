import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get("/suggested-job-posts", params);
}

const getDataByUser = (params) => {
    return fetchWrapper.get(`/job-seeker/suggested-jobs`, params);
}

const SuggestedJobsService = { get, getDataByUser };

export default SuggestedJobsService;