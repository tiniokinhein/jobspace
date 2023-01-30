import {fetchWrapper} from "../helpers";

const all = (params) => {
    return fetchWrapper.get(`/partner-networks`, params);
}

const PartnerNetworkService = { all };

export default PartnerNetworkService;