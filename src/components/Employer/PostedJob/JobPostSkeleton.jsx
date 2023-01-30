import React from 'react';
import {Card, CardActions, CardContent, Grid, Skeleton, Stack, Typography} from "@mui/material";

const JobPostSkeleton = () => {

    return (
        <Card
            variant="outlined"
            sx={{
                border: '1px solid #EBEBEB',
                borderRadius: '7px'
            }}
        >
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center"
                           display="flex">
                        <Typography fontSize="18px" fontWeight={400} width="30%" maxWidth="30%">
                            <Skeleton/>
                        </Typography>
                    </Stack>

                    <Typography fontSize="16px" fontWeight={400}>
                        <Skeleton width="20%"/>
                    </Typography>

                    <Typography fontSize="13px" color="#A1A1A1" fontWeight={400}>
                        <Skeleton width="20%"/>
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        display="flex"
                        alignItems="center"
                        pt={1}
                    >
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="15%"/>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="15%"/>
                    </Stack>
                </Stack>
            </CardContent>

            <CardActions
                sx={{
                    height: '45px',
                    background: '#EBEBEB',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    display="flex"
                    width="100%"
                >
                    <Grid item xs={2}>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="20%"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="20%"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="20%"/>

                    </Grid>
                    <Grid item xs={2}>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="20%"/>

                    </Grid>
                    <Grid item xs={2}>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="20%"/>

                    </Grid>
                    <Grid item xs={2}>
                        <Skeleton variant="text" sx={{fontSize: '1rem'}} width="20%"/>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default JobPostSkeleton;