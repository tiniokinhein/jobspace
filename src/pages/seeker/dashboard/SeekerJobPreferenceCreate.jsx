import React from 'react';
import SEO from "../../../components/Common/SEO";
import {Box, Divider, Paper, Typography} from "@mui/material";
import JobPreferenceForm from "../../../components/Seeker/JobPreference/JobPreferenceForm";

const SeekerJobPreferenceCreate = () => {

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <SEO title="Seeker Job Preference"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">Job Preferences</Typography>
                <Divider/>
                <JobPreferenceForm/>
            </Box>
        </Paper>
    )
}

export default SeekerJobPreferenceCreate;