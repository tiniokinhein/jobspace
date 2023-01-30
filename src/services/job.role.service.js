import {fetchWrapper} from "../helpers";

const get = (categoryUuid) => {
    return fetchWrapper.get(`/job-categories/${categoryUuid}/job-roles`);
}

const JobRoleDataService = { get };

export default JobRoleDataService;