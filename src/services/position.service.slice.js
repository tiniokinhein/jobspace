import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get("/positions");
}

const PositionDataService = { all };

export default PositionDataService;