import {fetchWrapper} from "../helpers";

const get = (uuid) => {
    return fetchWrapper.get(`/click-away/${uuid}`)
}

const ClickAwayService = { get };

export default ClickAwayService;