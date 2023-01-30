import {fetchWrapper} from "../helpers";

const get = (url) => {
    return fetchWrapper.get(url);
}

const AppDataService = { get };

export default AppDataService;