import {fetchWrapper} from "../helpers";

const all = (uuid, params) => {
    return fetchWrapper.get(`/companies/${uuid}/promotions`, params);
}

const getProducts = (uuid, params) => {
    return fetchWrapper.get(`/companies/${uuid}/products`, params)
}

const CompanyPromotionDataService = { all, getProducts };

export default CompanyPromotionDataService;