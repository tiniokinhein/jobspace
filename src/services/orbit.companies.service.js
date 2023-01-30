import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get("/orbit-companies");
}

const OrbitCompanyService = { all };

export default OrbitCompanyService;