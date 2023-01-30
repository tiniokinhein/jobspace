import React from 'react';
import CookieConsent from "react-cookie-consent";
import { Typography, Link } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

const CookieAlert = () => {

    return (
        <CookieConsent
            location='bottom'
            buttonStyle={{
                background: '#00A0DC',
                color: 'white',
                borderRadius: '7px',
                border: 'none',
                fontFamily: 'Poppins, sans-serif'
            }}
        >
            <Typography fontSize="14px" sx={{ color: "#fff" }}>
                We use cookie to improve your experience on our websites.
                <Link 
                    component={RouterLink}
                    to="/privacy-and-policy"
                    underline='hover'
                    sx={{ pl: 1, fontWeight: 500, color: '#00A0DC' }}
                >
                    Privacy & Cookie
                </Link>
            </Typography>
        </CookieConsent>   
    )
}

export default CookieAlert;