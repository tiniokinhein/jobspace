import React from 'react';
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {Logout} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {employerAuthActions} from "../../store";
import DashboardIcon from '@mui/icons-material/Dashboard';

const EmployerAuthActionDrawer = () => {

    const dispatch = useDispatch();
    const {isEmpLoggedIn} = useSelector(x => x.empAuth);

    function logout() {
        if (isEmpLoggedIn) {
            return dispatch(employerAuthActions.sessionLogout()).then(() => {
                dispatch(employerAuthActions.logout())
            });
        }
    }

    const handleClickDashboard = () => {
        window.location = '/employers/dashboard';
    }

    return (
        <>
            <Divider/>

            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClickDashboard}>
                        <ListItemIcon>
                            <DashboardIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography fontSize="14px">
                                Dashboard
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <Logout/>
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
    )
}

export default EmployerAuthActionDrawer;