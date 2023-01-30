import React, {Fragment, useCallback, useEffect, useState} from 'react';
import NotificationsIcon from "@mui/icons-material/Notifications";
import {Avatar, IconButton, ListItemIcon, Menu, MenuItem, Badge} from "@mui/material";
import {Person as PersonIcon, Logout, ShoppingBag as ShoppingBagIcon, Receipt as ReceiptIcon} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {abilitiesActions, employerAuthActions} from "../../store";
import EmployerNotification from "./EmployerNotification";
import { employerNotificationActions } from '../../store';

const EmployerAuthAction = () => {
    const dispatch = useDispatch();
    const {company} = useSelector(x => x.empAuth);
    const [profileEl, setProfileEl] = useState(null);
    const [shoppingEl, setShoppingEl] = useState(null);
    const {isEmpLoggedIn} = useSelector((state) => state.empAuth);
    const {notifications} = useSelector((state) => state.employer_notifications);

    const fetchNotifications = useCallback(() => {
        dispatch(employerNotificationActions.get());
    }, [dispatch]);

    useEffect(() => {
        fetchNotifications()
    }, [fetchNotifications])


    const openProfile = Boolean(profileEl);
    const openShopping = Boolean(shoppingEl);

    const handleClick = (event) => {
        setProfileEl(event.currentTarget);
    };

    const handleShoppingClick = (event) => {
        setShoppingEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileEl(null);
    };

    const handleShoppingClose = () => {
        setShoppingEl(null);
    };

    const fetchCompany = useCallback(() => {
        dispatch(abilitiesActions.getAll());
        dispatch(employerAuthActions.company());
    }, [dispatch]);

    useEffect(() => {
        if (isEmpLoggedIn) {
            fetchCompany();
        }
    }, [fetchCompany, isEmpLoggedIn]);

    function logout() {
        if (isEmpLoggedIn) {
            return dispatch(employerAuthActions.sessionLogout()).then(() => {
                dispatch(employerAuthActions.logout())
            });
        }
    }

    const handleClickDashboard = () => {
        setProfileEl(null);
        window.location = '/employers/account-info';
    }

    const handleBuyNowClick = () => {
        setShoppingEl(null);
        window.location = '/employers/buy-now';
    }

    const handleBillingClick = () => {
        setShoppingEl(null);
        window.location = '/employers/billing';
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

            <EmployerNotification
                openNotification={openNotification}
                handleNotificationClose={handleNotificationClose}
            />

            <IconButton size="medium" onClick={handleShoppingClick}>
                <ShoppingBagIcon/>
            </IconButton>
            <Menu
                anchorEl={shoppingEl}
                id="shopping-menu"
                open={openShopping}
                onClose={handleShoppingClose}
                onClick={handleShoppingClose}
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
                <MenuItem onClick={handleBuyNowClick}>
                    <ListItemIcon>
                        <ShoppingBagIcon fontSize="small"/>
                    </ListItemIcon>
                    Buy Now
                </MenuItem>
                <MenuItem onClick={handleBillingClick}>
                    <ListItemIcon>
                        <ReceiptIcon fontSize="small"/>
                    </ListItemIcon>
                    Billing
                </MenuItem>
            </Menu>
            
            <IconButton size="medium" onClick={handleClick}>
                {company.logo ?
                    <Avatar alt="Company Logo" src={company.logo} sx={{width: 30, height: 30}}/> :
                    <Avatar sx={{width: 30, height: 30}}>C</Avatar>
                }
            </IconButton>

            <Menu
                anchorEl={profileEl}
                id="profile-menu"
                open={openProfile}
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
                <MenuItem onClick={handleClickDashboard}>
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
        </Fragment>
    )
}

export default EmployerAuthAction;