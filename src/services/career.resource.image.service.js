import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/career-resource-images`);
}

const CareerResourceImageDataService = { get };

export default CareerResourceImageDataService;