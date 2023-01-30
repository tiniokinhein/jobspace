import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get(`/promoted-articles`);
}

const PromotedArticleService = { all };

export default PromotedArticleService;