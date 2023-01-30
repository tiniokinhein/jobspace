import {fetchWrapper} from "../helpers";

const get = (params) => {
    return fetchWrapper.get(`/skills`, params);
}

const SkillDataService = { get }

export default SkillDataService;