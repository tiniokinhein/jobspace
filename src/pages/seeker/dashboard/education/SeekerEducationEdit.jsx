import React from 'react';
import {Box, Divider, Typography, Paper} from "@mui/material";
import EducationEditForm from "../../../../components/Seeker/Education/EducationEditForm";

const SeekerEducationEdit = () => {
    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Education</Typography>
                <Divider/>
                <EducationEditForm/>
            </Box>
        </Paper>
    )
}

export default SeekerEducationEdit