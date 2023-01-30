import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get('/nationalities');
}

const NationalityDataService = { get };

export default NationalityDataService;