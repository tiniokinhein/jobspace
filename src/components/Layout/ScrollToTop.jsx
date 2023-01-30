import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 500) {
            setVisible(true)
        }
        else if (scrolled <= 500) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Fab
            style={{ display: visible ? 'block' : 'none', color: '#00A0DC', bottom: '20px', right: '30px', position: 'fixed', zIndex: '99', width: '50px', height: '50px' }}
            onClick={scrollToTop}>
            <NavigationIcon
            />
        </Fab>
    );
}

export default ScrollButton;
