import {fetchWrapper} from "../helpers";

const check = ({...data}) => {
    return fetchWrapper.post(`/job-seeker/check-token`, {...data});
}

const empCheck = ({...data}) => {
    return fetchWrapper.post(`/employer/check-token`, {...data});
}

const CheckTokenDataService = { check, empCheck };

export default CheckTokenDataService;