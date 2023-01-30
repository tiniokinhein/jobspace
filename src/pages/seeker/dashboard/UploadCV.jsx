import React, {Fragment} from 'react';
import {Box, Divider, Typography} from "@mui/material";
import UploadCvForm from "../../../components/Seeker/UploadCvForm";
import InterestJobs from "../../../components/Seeker/InterestJobs";
import SEO from "../../../components/Common/SEO";

const UploadCV = () => {

    return (
        <Fragment>
            <SEO title="Upload CV"/>
            <Box
                sx={{
                    borderRadius: '10px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white'
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h5" py={3} px={4} color="primary">Uploaded My CV</Typography>
                    <Divider/>
                    <UploadCvForm/>
                </Box>
            </Box>

            <InterestJobs/>
        </Fragment>
    );
}

export default UploadCV;