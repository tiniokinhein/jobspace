import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get('/employer/posted-jobs', params);
}

const getByUuid = (uuid) => {
    return fetchWrapper.get(`/employer/posted-jobs/${uuid}`);
}

const updatePostedJob = (uuid, data) => {
    return fetchWrapper.put(`/employer/posted-jobs/${uuid}`, data)
}

const EmpPostedJobsDataService = { get, getByUuid, updatePostedJob };

export default EmpPostedJobsDataService;