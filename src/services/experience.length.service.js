import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/experience-lengths`);
}

const ExperienceLengthDataService = { get };

export default ExperienceLengthDataService;