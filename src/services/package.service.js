import { fetchWrapper } from "../helpers";

const all = () => {
    return fetchWrapper.get("/employer/packages");
}

const PackageDataService = {all}

export default PackageDataService;