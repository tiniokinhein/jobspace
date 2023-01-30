import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get('/employer/application-info');
}

const AppInfoDataService = { get };

export default AppInfoDataService;