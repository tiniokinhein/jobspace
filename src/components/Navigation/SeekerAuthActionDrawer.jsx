import React, {Fragment} from 'react';
import {Divider, List, ListItem, ListItemButton, ListItemIcon, Typography, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store";
import PersonIcon from "@mui/icons-material/Person";
import {Logout} from "@mui/icons-material";

const SeekerAuthActionDrawer = () => {

    const dispatch = useDispatch();

    const {user} = useSelector(x => x.auth);
    const {isLoggedIn} = useSelector((state) => state.auth);

    function logout() {
        if (isLoggedIn) {
            return dispatch(authActions.sessionLogout()).then(() => {
                dispatch(authActions.logout());
                window.location.reload();
            })
        }
    }

    const handleClickProfile = () => {
        window.location = '/seekers/dashboard';
    }

    return (
        <Fragment>
            {Object.keys(user).length > 0 &&
            <>
                <Divider/>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClickProfile}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography fontSize="14px">
                                    Profile
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography fontSize="14px">
                                    Log Out
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </>
            }
        </Fragment>
    )
}

export default SeekerAuthActionDrawer;