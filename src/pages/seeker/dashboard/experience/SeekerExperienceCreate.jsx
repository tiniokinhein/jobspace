import React, {useEffect, useState} from 'react';
import ExperienceForm from "../../../../components/Seeker/Experience/ExperienceForm";
import {Box, Divider, Paper, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

const SeekerExperienceCreate = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [single, setSingle] = useState(true);

    useEffect(() => {
        const option = query.get('current');

        if (option === '1') {
            setSingle(false);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={4} color="primary">My Experiences</Typography>
                <Divider/>
                <ExperienceForm isSingleCreate={single}/>
            </Box>
        </Paper>
    );
}

export default SeekerExperienceCreate;