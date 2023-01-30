import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get("/auth/social-urls");
}

const SocialUrlsService = { get };

export default SocialUrlsService;