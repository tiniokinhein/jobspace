import React from 'react';
import {Grid, Skeleton, Typography} from "@mui/material";

const JPLoader = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
            sx={{px: 4, py: 3}}
        >
            <Grid container item xs={12} md={8} sx={{py: 1}}>

                <Grid item sm={12}>
                    <Typography component="div" variant="h3">
                        <Skeleton width="50%"/>
                    </Typography>
                </Grid>

                <Grid item sm={12}>
                    <Typography component="div" variant="h3">
                        <Skeleton width="50%"/>
                    </Typography>
                </Grid>

                <Grid item sm={12}>
                    <Typography component="div" variant="h3">
                        <Skeleton width="50%"/>
                    </Typography>
                </Grid>

                <Grid item sm={12}>
                    <Typography component="div" variant="h3">
                        <Skeleton width="50%"/>
                    </Typography>
                </Grid>

                <Grid item sm={12}>
                    <Typography component="div" variant="h3">
                        <Skeleton width="50%"/>
                    </Typography>
                </Grid>

                <Grid item sm={12} sx={{py: 1}}>
                    <Skeleton variant="square" height={30} width={100}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default JPLoader;