import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get("/synonyms", params);
}

const SynonymDataService = { get };

export default SynonymDataService;