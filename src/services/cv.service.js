import {fetchWrapper} from "../helpers";

const getFirstCV = () => {
    return fetchWrapper.get('/job-seeker/generate-cv/first');
}


const getSecondCV = () => {
    return fetchWrapper.get('/job-seeker/generate-cv/second');
}

const CVDataService = { getFirstCV, getSecondCV };

export default CVDataService;