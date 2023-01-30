import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get(`/job-seeker/profile-progress`);
}

const ProfileProgressDataService = { get };

export default ProfileProgressDataService;