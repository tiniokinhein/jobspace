import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store";
import {history} from "../../helpers";
import Loader from "../Loader/Loader";

const GoogleLogin = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [showLoading, setShowLoading] = useState(true);
    const {isLoggedIn} = useSelector((state) => state.auth);
    const {isEmpLoggedIn} = useSelector((state) => state.empAuth);

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
            dispatch(authActions.loginWithSocial({"data": location.search, "type": 'google'})).then(() => {
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

export default GoogleLogin;