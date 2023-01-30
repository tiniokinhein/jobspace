import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import SeekerJobAlertForm from "../../../components/Seeker/SeekerJobAlertForm";
import SEO from "../../../components/Common/SEO";

const JobAlert = () => {

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <SEO title="Job Alert"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">Manage Job Alerts</Typography>
                <Divider/>
                <SeekerJobAlertForm/>
            </Box>
        </Paper>
    );
}

export default JobAlert;