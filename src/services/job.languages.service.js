import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/job-seeker/job-languages`);
}

const JobLanguageDataService = {get};

export default JobLanguageDataService;
