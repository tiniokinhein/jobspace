import { fetchWrapper } from "../helpers";

const get = () => {
  return fetchWrapper.get(`/messenger`);
};

const MessengerDataService = { get };

export default MessengerDataService;
