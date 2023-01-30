import React from 'react';
import {Box, CircularProgress, Grid} from "@mui/material";

const Loader = () => {
    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sx={{
                    width: '100%',
                    minHeight: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                }}>
                    <CircularProgress color="secondary" size={300} thickness={1}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Loader;