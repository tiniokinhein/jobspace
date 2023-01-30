import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get('/employer/recent-applies', params);
}

const RecentApplyDataService = { get };

export default RecentApplyDataService;