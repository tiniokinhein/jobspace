import React from "react";
import {Box, Divider, Grid, Typography, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import LeftMenu from "../../../components/FormLayout/LeftMenu";
import {AuthFormLayout} from "../../../components/FormLayout/AuthFormLayout";
import EmployerSignInForm from "../../../components/FormLayout/EmployerSignInForm";
import {RoundedFormLayout} from "../../../components/FormLayout/RoundedFormLayout";

const title = "Create, Build, Share & Find Better Candidates";

const EmployerSignInPage = () => {
    return (
        <AuthFormLayout>
            <LeftMenu title={title}/>

            <RoundedFormLayout>
                <Box
                    sx={{
                        width: {
                            sm: "400px",
                            md: "400px",
                            lg: "532px",
                        },
                    }}
                >
                    <Grid spacing={4} container py="50px" px={{xs: '30px', md: '0px'}}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Welcome!</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <EmployerSignInForm/>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography align='right'>
                                <Link
                                    component={RouterLink}
                                    to='/employers/forgot-password'
                                    underline='hover'
                                    color='secondary'
                                >
                                    Forgot Password
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="text.secondary" align="center">
                                Don't have an account yet ?&nbsp;&nbsp;
                                <Link
                                    to="/employers/sign-up"
                                    component={RouterLink}
                                    color="secondary"
                                    underline="none"
                                >
                                    Sign Up
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </RoundedFormLayout>
        </AuthFormLayout>
    );
};

export default EmployerSignInPage;