import React from "react";
import { Parser } from 'html-to-react';
import {Box, Typography} from "@mui/material";

const JobDescription = ({description, title}) => {
    return (
        <Box>
            {title &&
                <Typography
                    sx={{
                        py: 2,
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#333333',
                        textDecoration: 'underline'
                    }}
                >
                    {title}
                </Typography>
            }
            <Box sx={{ fontSize: '14px' }}>{Parser().parse(description)}</Box>
        </Box>
    )
}

export default JobDescription;