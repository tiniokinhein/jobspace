import React from 'react';
import {Box, Container} from "@mui/material";
import NotFoundBackground from "../../assets/backgrounds/Not_Found.svg"
import SEO from '../../components/Common/SEO';

const NotFound = () => {
    return (
        <Container maxWidth="xl">
            <SEO title='404' />
            <Box minHeight="60vh" maxHeight="75vh" alignItems="center" justifyContent="center" display="flex">
                <img src={NotFoundBackground} width="20%" alt="not found"/>
            </Box>
        </Container>
    )
}

export default NotFound;