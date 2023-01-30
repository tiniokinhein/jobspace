import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get('/employer/posted-jobs/count');
}

const EmpJobCountDataService = { get };

export default EmpJobCountDataService;