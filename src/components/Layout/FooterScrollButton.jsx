import React from 'react';
import {Button, Grid} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollButton = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', marginBottom: {xs: '8px', sm: '0px'} }}>
            <Button varient="outlined"
                    sx={{
                        border: ' 1px solid #FFFFFF',
                        borderRadius: '5px',
                        color: '#FFFFFF',
                        maxWidth: '38px',
                        maxHeight: '38px',
                        minWidth: '38px',
                        minHeight: '38px',
                        bottom:{xs:'0px', sm:'6px'},
                        position: {xs: 'static', sm: 'absolute'},
                        zIndex: '12'
                    }}
                    onClick={scrollToTop}>
                <KeyboardArrowUpIcon/>
            </Button>
        </Grid>
    );
}

export default ScrollButton;
