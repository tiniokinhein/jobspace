import React from 'react';
import {Box, Typography} from "@mui/material";

const TabWithCount = ({ children, count }) => {
    return (
        <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <Typography component="div">{children}</Typography>
            {count ? (
                <Typography
                    component="div"
                    variant="body1"
                    sx={{ marginLeft: "0.5rem" }}
                >
                    ({count})
                </Typography>
            ) : null}
        </Box>
    );
};

export default TabWithCount;