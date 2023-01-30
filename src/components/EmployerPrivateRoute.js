import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from "../helpers";

export { EmployerPrivateRoute };

function EmployerPrivateRoute({ children }) {
    const {isEmpLoggedIn} = useSelector((state) => state.empAuth);

    if (!isEmpLoggedIn) {
        return <Navigate to='/employers/sign-in' state={{from: history.location}} />
    }

    return children;
}