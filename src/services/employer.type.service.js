import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get("/employer-types");
}

const EmployerTypeService = { all };

export default EmployerTypeService;