import {fetchWrapper} from "../helpers";

const create = (data) => {
    return fetchWrapper.post(`/notify-emails`,data);
}

const NotifyEmailService = { create };

export default NotifyEmailService;