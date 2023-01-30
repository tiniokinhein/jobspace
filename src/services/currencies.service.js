import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/currencies`);
}

const CurrencyDataService = { get };

export default CurrencyDataService;