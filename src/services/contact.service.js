import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get('/contact-us');
}

const create = (data) => {
    return fetchWrapper.post('/contact-us', data);
}

const ContactDataService = { get, create };

export default ContactDataService;