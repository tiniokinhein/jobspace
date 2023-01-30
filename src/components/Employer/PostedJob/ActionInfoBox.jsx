import React from 'react';
import {Avatar, Stack, Typography} from "@mui/material";

const ActionInfoBox = ({title, count, hideBorder = false}) => {

    return (
        <Stack
            direction="row"
            sx={{
                borderRight: {xs: 0, sm: !hideBorder ? '1px solid #FFFFFF' : 0},
            }}
            spacing={2}
            justifyContent={{xs: "space-between", sm: "center"}}
            alignItems="center"
            display="flex"
        >
            <Typography align="start" color="#0E0E2C" fontSize={{xs: "12px", sm: "14px"}} fontWeight={400}>{title}</Typography>
            <Avatar
                sx={{
                    mx: 1,
                    width: '22px',
                    height: '22px',
                    background: count === 0 ? '#A1A1A1' : '#FF9635'
                }}
            >
                <Typography fontSize='14px'>{count}</Typography>
            </Avatar>
        </Stack>
    );
}

export default ActionInfoBox;