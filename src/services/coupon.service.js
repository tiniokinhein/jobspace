import { fetchWrapper } from "../helpers";

const get = (code) => {
    return fetchWrapper.get(`/employer/coupons/${code}`);
}

const CouponDataService = {get}

export default CouponDataService;