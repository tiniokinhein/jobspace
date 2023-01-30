import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get("/employer/analysis")
}

const EmployerAnalysisDataService = { get };

export default EmployerAnalysisDataService;