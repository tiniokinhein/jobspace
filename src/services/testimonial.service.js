import {fetchWrapper} from "../helpers";

const all = () => {
    return fetchWrapper.get('/testimonials');
}

const TestimonialService = { all };

export default TestimonialService;