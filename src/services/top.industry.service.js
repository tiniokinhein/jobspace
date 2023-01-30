import {fetchWrapper} from "../helpers";

const all = (params) => {
    return fetchWrapper.get('/top-industries', params);
}

const TopIndustryService = { all };

export default TopIndustryService;