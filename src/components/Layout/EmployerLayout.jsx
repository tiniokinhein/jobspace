import React from 'react'
import {Outlet} from "react-router-dom";
import {Box, Stack, Container, Grid} from '@mui/material';
import EmployerSideMenu from "../Employer/EmployerSideMenu";

export default function EmployerLayout() {
    return (
        <Box id='app' sx={{display: 'flex', flexDirection: 'column'}}>
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth="xl">
                        <Grid container spacing={1} py={4} px={{lg: '30px', xl: 0}}>
                            <Grid item xs={12} md={3.7} lg={3.3} xl={2.7}>
                                <Stack display="flex" alignItems={{xs: 'center', md: 'start'}}>
                                    <Box
                                        sx={{
                                            top: 110,
                                            position: 'sticky',
                                            width: {xs: "100%", md: "95%"}
                                        }}
                                    >
                                        <EmployerSideMenu/>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={8.3} lg={8.7} xl={9.3}>
                                <Outlet/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}
