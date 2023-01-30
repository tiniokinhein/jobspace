import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/job-seeker/dashboard`);
}

const SeekerDashboardDataService = { get };

export default SeekerDashboardDataService;