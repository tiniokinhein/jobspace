import { fetchWrapper } from "../helpers";

const all = () => {
    return fetchWrapper.get("/employer/payment-methods");
}

const PaymentMethodDataService = {all}

export default PaymentMethodDataService;