import {fetchWrapper} from "../helpers";

const get = (url) => {
    return fetchWrapper.get(url);
}

const AdDataService = { get };

export default AdDataService;