import React from "react";
import {Grid, Paper, styled} from "@mui/material";

const StyledPaper = styled(Paper)(({theme}) => ({
    [theme.breakpoints.up('sm')]: {
        borderRadius: '0'
    },
    [theme.breakpoints.up('md')]: {
        borderTopLeftRadius: '50px',
        borderBottomLeftRadius: '50px'
    },
}));

export const RoundedFormLayout = (props) => {
    return (
        <Grid
            item
            sm={12}
            md={7}
            justifyContent="center"
            justifyItems="center"
            alignItems="center"
        >

            <StyledPaper sx={{
                display: 'flex',
                minWidth: '100%',
                minHeight: '100vh',
                justifyContent: 'center',
                justifyItems: 'center',
                alignItems: 'center',
                maxHeight: {xs: '120vh', lg: '100vh'},
                overflowY: 'auto'
            }}>
                {props.children}
            </StyledPaper>
        </Grid>
    );
}