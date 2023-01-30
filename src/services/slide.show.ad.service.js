import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get("/slide-show-ads");
}

const SlideShowAdService = { all };

export default SlideShowAdService;