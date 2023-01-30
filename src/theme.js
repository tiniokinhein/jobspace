import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderRadius: 8,
                    },
                    '.MuiFormLabel-asterisk': {
                        color: '#B71C1C'
                    }
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderRadius: 8,
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    minHeight: '40px'
                }
            }
        },
    },
    palette: {
        secondary: {
            main: '#00A0DC',
            contrastText: '#fff',
        },
        success: {
            main: '#09962F',
        },
        error: {
            main: '#B71C1C',
        },
        grey: {
            main: '#6D6969',
            contrastText: '#6D6969'
        },
        accent: {
            main: '#FF9635'
        },
        primary: {
            main: "#195DCC"
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
        button: {
            textTransform: 'none'
        }
    },
});