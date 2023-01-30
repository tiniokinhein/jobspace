import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from "../helpers";

export { SeekerPrivateRoute };

function SeekerPrivateRoute({ children }) {
    const {isLoggedIn} = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to='/seekers/sign-in' state={{from: history.location}} />
    }

    return children;
}