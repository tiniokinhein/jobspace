import React, {Fragment, useEffect} from 'react';
import {Alert, IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {clearMessage, setOpen} from "../../store/slices/message.slice";

const SnackBar = () => {

    const dispatch = useDispatch();
    const {message} = useSelector((state) => state.message);
    const {open} = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(setOpen(false));
    }, [dispatch]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setOpen(false))
    }

    return (
        <Fragment>
            {message &&
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert
                    severity="info"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
            }
        </Fragment>
    )
}

export default SnackBar;