import {fetchWrapper} from "../helpers";

const getApplicantInfoByUid = (pId, uId) => {
    return fetchWrapper.get(`/employer/posted-jobs/${pId}/applicants/${uId}`);
}

const ApplicantInfoDataService = { getApplicantInfoByUid }

export default ApplicantInfoDataService;