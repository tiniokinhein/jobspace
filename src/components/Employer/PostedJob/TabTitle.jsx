import React from 'react';
import {Avatar, Stack, Typography} from "@mui/material";

const TabTitle = ({title, count, isDetail = false}) => {

    return (
        <Stack
            direction={'row'}
            width={'100%'}
            justifyContent="center"
            alignItems="center"
            display="flex"
        >
            <Typography sx={{fontSize: '16px', fontWeight: 500}}>{title}</Typography>
            <Avatar
                sx={{
                    ml: 1,
                    width: '22px',
                    height: '22px',
                    fontSize: '14px',
                    background: count === 0 ? '#A1A1A1' : isDetail ? '#FF9635' : '#2AA31F',
                }}
            >
                {count ?? 0}
            </Avatar>
        </Stack>
    )
}

export default TabTitle;