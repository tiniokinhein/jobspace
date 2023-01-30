import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/proficiencies`);
}

const getSkillProficiencies = () => {
    return fetchWrapper.get(`/skill-proficiencies`)
}

const ProficiencyDataService = { get, getSkillProficiencies };

export default ProficiencyDataService;