import React from "react";
import {Stack, Typography} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const UrgentIcon = ({isUrgent}) => {
    return (
        <>
            {isUrgent ?
                <Stack direction="row"
                       alignItems="center">
                    <AccessTimeIcon color="error"
                                    sx={{fontSize: '1rem'}}/>&nbsp;
                    <Typography
                        variant="caption"
                        display="block"
                        color="error"
                        noWrap
                        alignItems="center">Urgently
                        Hiring
                    </Typography>
                </Stack> : null}
        </>
    );
}

export default UrgentIcon;