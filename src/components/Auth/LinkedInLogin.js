import React, {useCallback, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store";
import {history} from "../../helpers";
import Loader from "../Loader/Loader";

const LinkedInLogin = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {isLoggedIn} = useSelector((state) => state.auth);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {

        if (isLoggedIn) {
            history.navigate('/')
        } else {
            history.navigate('/seekers/sign-in');
        }

        if (isLoggedIn) {
            history.navigate('/')
        }
        // eslint-disable-next-line
    }, []);

    const initFetch = useCallback(() => {
        const data = location.search;
        if (data) {
            dispatch(authActions.loginWithSocial({"data": location.search, "type": 'linkedin'})).then(() => {
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

export default LinkedInLogin;