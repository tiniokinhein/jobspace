import React from "react";
import {Box, Divider, Grid, Typography,} from "@mui/material";
import SEO from "../../components/Common/SEO";
import ContactPersonForm from "../../components/Employer/ContactPersonForm";

function ContactPersonEdit() {
    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <SEO title="Contact Person"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" sx={{py: 3, px: 4}} color="primary">Contact Person Edit</Typography>
                <Divider/>
                <Grid container>
                    <Grid item xs={12}><ContactPersonForm/></Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default ContactPersonEdit;
