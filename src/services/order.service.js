import { fetchWrapper } from "../helpers";

const create = (data) => {
    return fetchWrapper.post(`/employer/orders`, data);
}

const OrderDataService = {create}

export default OrderDataService;