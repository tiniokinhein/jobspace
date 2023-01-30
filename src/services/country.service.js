import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get('/countries', params);
}

const CountryDataService = { get };

export default CountryDataService;