import React from 'react'
import {Grid, Link, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import TitleComponent from "../Common/TitleComponent";

const RecentJobTitle = () => {

    return (
        <Grid item xs={12} pb="30px">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <TitleComponent title="Recent People Applied"/>
                <Typography>
                    <Link component={RouterLink} to='/employers/posted-jobs#public'
                          underline="hover" color="inherit">Show All</Link>
                </Typography>
            </Stack>
        </Grid>
    )
};
export default RecentJobTitle;