import {fetchWrapper} from "../helpers";

const all = (params) => {
    return fetchWrapper.get(`/regions`, params)
}

const getRegionsByCountryUuid = (uuid) => {
    return fetchWrapper.get(`/countries/${uuid}/regions`)
}

const RegionDataService = { all, getRegionsByCountryUuid }

export default RegionDataService;