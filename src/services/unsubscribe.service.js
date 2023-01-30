import {fetchWrapper} from "../helpers";

const unsubscribe = (params) => {
    return fetchWrapper.post(`/unsubscribe`, params);
}

const UnsubscribeDataService = { unsubscribe };

export default UnsubscribeDataService;