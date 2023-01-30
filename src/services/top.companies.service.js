import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get('/top-companies');
}

const TopCompanyService = { all };

export default TopCompanyService;