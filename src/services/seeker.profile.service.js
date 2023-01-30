import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/job-seeker/profile`);
}

const SeekerProfileDataService = { get };

export default SeekerProfileDataService;