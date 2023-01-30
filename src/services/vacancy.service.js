import {fetchWrapper} from "../helpers";

const get = () => {
    return fetchWrapper.get('/employer/vacancies');
}

const VacancyDataService = { get };

export default VacancyDataService;