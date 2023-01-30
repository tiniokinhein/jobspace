import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/faqs`);
}

const FaqDataService = { get };

export default FaqDataService;