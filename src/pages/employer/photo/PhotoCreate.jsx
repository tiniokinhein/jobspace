import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import SEO from "../../../components/Common/SEO";
import PhotoForm from "../../../components/Employer/PhotoForm";

const PhotoCreate = () => {
    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <SEO title="Company Photos"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={4} color="primary">Photos</Typography>
                <Divider/>
                <PhotoForm/>
            </Box>
        </Box>
    );
}

export default PhotoCreate;