import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get(`/notice-periods`);
}

const NoticePeriodDataService = { all };

export default NoticePeriodDataService;