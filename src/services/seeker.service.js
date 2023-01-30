import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get('/job-seeker/me');
}

const SeekerDataService = { get };

export default SeekerDataService;