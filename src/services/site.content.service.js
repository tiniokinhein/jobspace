import {fetchWrapper} from "../helpers";

const all = (params) => {
    return fetchWrapper.get(`/site-contents`, params);
}

const SiteContentService = { all };

export default SiteContentService;