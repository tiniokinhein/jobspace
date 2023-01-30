import {fetchWrapper} from "../helpers";

const getByUuid = (uuid, params) => {
    return fetchWrapper.get(`/job-posts/${uuid}/similar`, params);
}

const SimilarJobDataService = { getByUuid };

export default SimilarJobDataService;