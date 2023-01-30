import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/job-seeker/personal-info`);
}

const create = (data, withFormData) => {
    return fetchWrapper.post(`/job-seeker/personal-info`, data, withFormData);
}

const PersonalInfoDataService = { get, create };

export default PersonalInfoDataService;