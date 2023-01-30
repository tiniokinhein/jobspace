import React from "react";
import SEO from "../../../components/Common/SEO";
import {Box, Divider, Typography} from "@mui/material";
import VideoForm from "../../../components/Employer/VideoForm";

const VideoCreate = () => {
    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <SEO title="Company Videos"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={4} color="primary">Videos</Typography>
                <Divider/>
                <VideoForm/>
            </Box>
        </Box>
    )
}

export default VideoCreate;