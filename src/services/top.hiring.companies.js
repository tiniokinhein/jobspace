import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get('/top-hiring-companies');
}

const TopHiringCompanyService = { all };

export default TopHiringCompanyService;