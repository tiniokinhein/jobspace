import React, {useEffect, useState} from 'react';
import {Alert, Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import {authActions, employerAuthActions} from "../../store";

const AuthAlert = ({notification, type, setInvalidError}) => {

    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (notification) {
            setAlert(notification);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                dispatch(authActions.clearAlert())
                dispatch(employerAuthActions.clearAlert())
                setInvalidError(null);
            }, 5000);
        }
        // eslint-disable-next-line
    }, [dispatch, notification])

    return (
        <>
            {!!showAlert &&
                <Grid item xs={12}>
                    <Alert severity={type ? type : 'error'}>{alert}</Alert>
                </Grid>
            }
        </>
    );
};

export default AuthAlert;