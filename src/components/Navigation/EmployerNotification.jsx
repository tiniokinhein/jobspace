import React, {useCallback, useEffect} from 'react';
import {Dialog, DialogContent, DialogTitle, Grid, Stack, Typography, Button, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {employerNotificationActions} from "../../store";
import ClearIcon from '@mui/icons-material/Clear';

const EmployerNotification = ({openNotification, handleNotificationClose}) => {

    const dispatch = useDispatch();
    const {notifications} = useSelector((state) => state.employer_notifications)

    const fetchNotifications = useCallback(() => {
        dispatch(employerNotificationActions.get());
    }, [dispatch]);

    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications])

    const handleRemoveClick = (item) => {
        dispatch(employerNotificationActions.destroy(item.uuid))
            .then(() => dispatch(employerNotificationActions.get()));
    }

    const handleReadClick = () => {
        dispatch(employerNotificationActions.update({status: 1}))
            .then(() => dispatch(employerNotificationActions.get()));
    }

    return (
        <Dialog
            open={openNotification}
            onClose={handleNotificationClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{sx: {width: "500px", height: "700px"}}}
            disableScrollLock={true}
            scroll="paper"
        >
            <DialogTitle id="alert-dialog-title" sx={{borderBottom: '1px solid #C4C4C4'}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontSize="18px" fontWeight="600">
                        Notifications
                    </Typography>
                    <Button 
                        varient="text" 
                        color="primary"
                        sx={{ fontSize: '12px', fontWeightt: 600 }}
                        onClick={handleReadClick}
                    >
                        Mark as All Read
                    </Button>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{padding: 0}}>
                <Grid container>
                    {Object.keys(notifications?.notifications ?? []).length > 0 &&
                        (notifications?.notifications).map(notification => (
                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{borderBottom: '1px solid #C4C4C4'}}
                                key={notification.uuid}
                            >
                                <Grid 
                                    container 
                                    direction="row" 
                                    alignItems="start"
                                    sx={{
                                        padding: '8px 24px',
                                        background: notification.status === 0 ? '#eeeeee' : '#fff'
                                    }}
                                >
                                    <Grid item xs={11} md={10}>
                                        <Stack direction="column" spacing={0.5}>
                                            <Typography fontWeight="600" fontSize="14px" color="#000000">
                                                {notification.title}
                                            </Typography>
                                            <Typography fontSize="12px">
                                                {notification.description}
                                            </Typography>
                                            <Typography fontSize="10px" fontWeight="500" color="#C4C4C4">
                                                {notification.time}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={1} md={2} justifyContent="flex-end" alignItems="flex-start" display="flex">
                                        <IconButton type='button' aria-label="delete" size="small" onClick={() => handleRemoveClick(notification)}>
                                            <ClearIcon fontSize="inherit" sx={{color: "#C4C4C4"}}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default EmployerNotification;