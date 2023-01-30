import React from 'react';
import {Box, Grid} from "@mui/material";
import ApplicantCard from "./ApplicantCard";

const RecentApplied = ({search}) => {

    return (
        <Box sx={{p: 3}}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6} md={4}>
                    <ApplicantCard/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RecentApplied;