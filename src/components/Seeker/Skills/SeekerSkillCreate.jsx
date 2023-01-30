import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import SeekerSkillForm from "./SeekerSkillForm";

const SeekerSkillCreate = () => {

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Skills</Typography>
                <Divider/>
                <SeekerSkillForm addMore={true}/>
            </Box>
        </Paper>
    );
}

export default SeekerSkillCreate;