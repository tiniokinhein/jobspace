import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {history} from './helpers';
import {theme} from "./theme";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Routing from "./Routing";
import SnackBar from "./components/Common/SnackBar";
import ScrollToTop from "./components/Common/ScrollToTop";
import CookieAlert from './components/Common/CookieAlert';
// import { HelmetProvider } from "react-helmet-async";

function App() {

    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routing/>
            <ScrollToTop/>
            <SnackBar/>
            <CookieAlert/>
        </ThemeProvider>
    );
}

export default App;