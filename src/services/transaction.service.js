import { fetchWrapper } from "../helpers";

const create = (data) => {
    return fetchWrapper.post("/employer/transactions", data);
}

const verify = (data) => {
    return fetchWrapper.post("/employer/transactions/verify", data);
}

const kbzVerify = (data) => {
    return fetchWrapper.post("/employer/transactions/kbz-verify", data);
}

const TransactionDataService = {create, verify, kbzVerify}

export default TransactionDataService;