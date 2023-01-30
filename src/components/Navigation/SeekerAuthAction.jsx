import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Avatar, IconButton, ListItemIcon, Menu, MenuItem, Badge} from "@mui/material";
import {Logout, Notifications as NotificationsIcon, Person as PersonIcon} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store";
import StringAvatar from "../Common/StringAvatar";
import {useLocation} from "react-router-dom";
import SeekerNotification from "./SeekerNotification";
import { seekerNotificationActions } from '../../store';

const SeekerAuthAction = () => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const {isLoggedIn} = useSelector(x => x.auth);
    const {user} = useSelector((state) => state.auth);
    const [profileEl, setProfileEl] = useState(null);
    const {notifications} = useSelector((state) => state.seeker_notifications)

    const fetchNotifications = useCallback(() => {
        dispatch(seekerNotificationActions.get());
    }, [dispatch]);

    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications])

    const open = Boolean(profileEl);

    const handleClick = (event) => {
        setProfileEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileEl(null);
    };

    function logout() {
        if (isLoggedIn) {
            return dispatch(authActions.sessionLogout()).then(() => {
                dispatch(authActions.logout());
                window.location.reload();
            })
        }
    }

    const iniFetch = useCallback(() => {
        if (isLoggedIn) {
            dispatch(authActions.getUser())
        }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        iniFetch()
    }, [iniFetch]);

    useEffect(() => {
        setProfileEl(null);
    }, [pathname])

    const handleClickProfile = () => {
        setProfileEl(null);
        window.location = '/seekers/dashboard';
    }

    const [openNotification, setOpenNotification] = useState(false);

    const handleNotificationOpen = () => {
        setOpenNotification(true);
    }

    const handleNotificationClose = () => {
        setOpenNotification(false);
    };

    return (
        <Fragment>
            {Object.keys(user).length > 0 &&
                <>
                    <IconButton
                        size="medium"
                        onClick={handleNotificationOpen}
                    >
                        <Badge 
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "#B71C1C"
                                }
                            }} 
                            badgeContent={notifications?.newCnt ?? 0}
                        >
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>

                    <SeekerNotification
                        openNotification={openNotification}
                        handleNotificationClose={handleNotificationClose}
                    />

                    <IconButton onClick={handleClick} size="medium">
                        {user.job_seeker ?
                            <Avatar
                                alt={user.job_seeker.full_name}
                                src={`${process.env.REACT_APP_URL}/storage/profiles/${user.job_seeker?.profile_img}`}
                                sx={{width: 30, height: 30}}
                            /> :
                            <StringAvatar name={user.full_name} width={30} height={30}/>
                        }
                    </IconButton>

                    <Menu
                        anchorEl={profileEl}
                        id="profile-menu"
                        open={open}
                        onClose={handleProfileClose}
                        onClick={handleProfileClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        disableScrollLock={true}
                    >
                        <MenuItem onClick={handleClickProfile}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small"/>
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </>
            }
        </Fragment>
    )
}

export default SeekerAuthAction;