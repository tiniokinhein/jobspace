import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get(`/offers`, params);
}

const OfferDataService = { get };

export default OfferDataService;