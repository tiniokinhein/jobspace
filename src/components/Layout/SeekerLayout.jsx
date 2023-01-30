import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {Box, Container, Grid, Stack} from '@mui/material';
import SeekerSideMenu from "../Seeker/SeekerSideMenu";
import { useLocation } from 'react-router-dom';
import ProfilePercentage from '../../pages/seeker/dashboard/ProfilePersentage';
import {useSelector} from "react-redux";

export default function SeekerLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const {isLoggedIn} = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/seekers/sign-in')
        }
    })

    return (
        <Box id='app' sx={{display: 'flex', flexDirection: 'column'}}>
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth="xl">
                        {isLoggedIn &&
                            <Grid container spacing={1} py={4} px={{lg: '30px', xl: 0}}>
                                <Grid
                                    item
                                    xs={12}
                                    md={3.3}
                                    lg={2.7}
                                >
                                    <Stack display="flex" alignItems={{xs: 'center', md: 'start'}}>
                                        <Box
                                            sx={{
                                                top: 110,
                                                position: 'sticky',
                                                width: {xs: '100%', md: '95%'}
                                            }}
                                        >
                                            <SeekerSideMenu/>
                                            {location.pathname === '/seekers/account' && <ProfilePercentage />}
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={8.7} lg={9.3}>
                                    <Outlet/>
                                </Grid>
                            </Grid>
                        }
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}
