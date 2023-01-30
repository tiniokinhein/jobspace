import React from 'react';
import {Divider, Typography, Box, Paper} from "@mui/material";
import ExperienceEditForm from "../../../../components/Seeker/Experience/ExperienceEditForm";

const SeekerExperienceEdit = () => {

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Experiences</Typography>
                <Divider/>
                <ExperienceEditForm/>
            </Box>
        </Paper>
    )
}

export default SeekerExperienceEdit;