import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store";
import {history} from "../../helpers";
import Loader from "../Loader/Loader";

const FacebookLogin = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {isLoggedIn} = useSelector((state) => state.auth);
    const {isEmpLoggedIn} = useSelector((state) => state.empAuth);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn) {
            history.navigate('/')
        } else {
            history.navigate('/seekers/sign-in');
        }

        if (isEmpLoggedIn) {
            history.navigate('/')
        }
        // eslint-disable-next-line
    }, []);

    const initFetch = useCallback(() => {
        const data = location.search;
        if (data) {
            dispatch(authActions.loginWithSocial({"data": location.search, "type": 'facebook'})).then(() => {
                setShowLoading(false);
            });
        }
    }, [dispatch, location.search]);

    useEffect(() => {
        initFetch()
    }, [initFetch])

    return (
        <>
            {showLoading && <Loader/>}
        </>
    )
}

export default FacebookLogin;