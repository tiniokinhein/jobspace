import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import ProfileFormComponent from '../../../components/Seeker/ProfileFormComponent';

const SeekerProfileCreate = () => {

    return (
        <Box>
            <Paper
                sx={{
                    borderRadius: '10px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h5" py={3} px={4} color="primary">My Profile</Typography>
                    <Divider/>
                    <ProfileFormComponent/>
                </Box>
            </Paper>
        </Box>
    )
}

export default SeekerProfileCreate;