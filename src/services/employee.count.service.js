import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get("/employee-counts")
}

const EmployeeCountService = { all };

export default EmployeeCountService;