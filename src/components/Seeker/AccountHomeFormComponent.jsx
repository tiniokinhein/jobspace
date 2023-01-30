import React from 'react';
import {Paper, Typography} from "@mui/material";

const AccountHomeFormComponent = () => {

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <Typography>Home</Typography>
        </Paper>
    )
}

export default AccountHomeFormComponent;