import {fetchWrapper} from "../helpers";

const all = (params) => {
    return fetchWrapper.get(`/articles`, params);
}

const getByUuid = (uuid) => {
    return fetchWrapper.get(`/articles/${uuid}`);
}

const getCareerCategories = () => {
    return fetchWrapper.get('/career-resource-categories');
}

const ArticleService = { all, getByUuid, getCareerCategories };

export default ArticleService;