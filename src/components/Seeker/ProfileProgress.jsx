import React from 'react';
import {Stack, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const ProfileProgress = ({name, progress, isComplete}) => {

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" display="flex" width="100%">
            <Stack direction="row" spacing={1} alignItems="center">
                {isComplete ?
                    <CheckCircleIcon sx={{color: "#00A0DC"}}/> :
                    <RadioButtonUncheckedIcon sx={{color: "#C4C4C4"}}/>
                }
                <Typography fontSize="13px" fontWeight="300">{name}</Typography>
            </Stack>
            <Typography fontSize="13px" fontWeight="300">{progress}%</Typography>
        </Stack>
    )
}

export default ProfileProgress;