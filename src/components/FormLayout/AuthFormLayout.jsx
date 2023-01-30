import React from 'react';
import {Box, Grid} from "@mui/material";
import SignInBg from "../../assets/images/signin-bg.png";

export const AuthFormLayout = (props) => {
    return (
        <Box sx={{
            flexGrow: 1,
            maxHeight: '100vh',
            minHeight: '100vh',
            backgroundImage: `url(${SignInBg})`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed",
            backgroundSize: "100% 100%",
        }}>
            <Grid container spacing={0}>
                {props.children}
            </Grid>
        </Box>
    );
};