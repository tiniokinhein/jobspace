import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get(`/academic-fields`);
}

const AcademicFieldDataService = { all };

export default AcademicFieldDataService;