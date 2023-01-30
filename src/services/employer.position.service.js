import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get("/employer-positions");
}

const EmployerPositionService = { all };

export default EmployerPositionService;