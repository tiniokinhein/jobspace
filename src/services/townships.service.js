import {fetchWrapper} from "../helpers";

const all = (params) => {
    return fetchWrapper.get(`/townships`, params)
}

const getTownshipByRegionUuid = (uuid) => {
    return fetchWrapper.get(`/regions/${uuid}/townships`);
}

const TownshipDataService = { all, getTownshipByRegionUuid }

export default TownshipDataService;