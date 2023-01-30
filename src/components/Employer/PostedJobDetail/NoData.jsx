import React from 'react';
import {Grid, Typography} from "@mui/material";

const NoData = ({title}) => {
    return (
        <Grid
            sx={{
                borderRadius: '10px',
                background: '#ffffff',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                minHeight: '146px',
                alignItems: 'center',
                justifyContent: 'flex-start',
                display: 'flex',
                px: 3,
                py: 2
            }}
            flexGrow={1}
        >
            <Typography>There is no {title}.</Typography>
        </Grid>
    )
}

export default NoData;