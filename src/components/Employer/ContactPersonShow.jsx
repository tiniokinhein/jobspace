import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

const ContactPersonShow = ({data}) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Grid container spacing={2} sx={{px: 4, py: 3}}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={4} sm={2.5}>
                            <Typography variant="body1" fontWeight={500}>Name</Typography>
                        </Grid>
                        <Grid item xs={0.5}>
                            <Typography>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>{data?.name ?? '---'}</Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={4} sm={2.5}>
                            <Typography variant="body1" fontWeight={500}>Email</Typography>
                        </Grid>
                        <Grid item xs={0.5}>
                            <Typography>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            {data?.email ?? '---'}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={4} sm={2.5}>
                            <Typography variant="body1" fontWeight={500}>Mobile No.</Typography>
                        </Grid>
                        <Grid item xs={0.5}>
                            <Typography>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            {data?.mobile_no ?? '---'}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={4} sm={2.5}>
                            <Typography variant="body1" fontWeight={500}>Position</Typography>
                        </Grid>
                        <Grid item xs={0.5}>
                            <Typography>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            {data?.employer_position?.title ?? '---'}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ContactPersonShow;