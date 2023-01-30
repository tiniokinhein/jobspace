import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get('/top-job-categories');
}

const TopCategoriesService = { all };

export default TopCategoriesService;