import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get(`/qualifications`);
}

const QualificationDataService = { all };

export default QualificationDataService;