import React from 'react';
import {Box} from "@mui/material";

const BlockQuote = ({ children }) => {

    return (
        <Box
            sx={{
                borderRadius: "10px",
                border: '1px solid',
                borderLeft: "8px solid",
                borderColor: "#FFDC48",
                backgroundColor: "#FFF9EB",
                paddingLeft: 3,
                minHeight: "72px",
                alignItems: 'center',
                display: 'flex'
            }}
        >
            {children}
        </Box>
    );
}

export default BlockQuote;