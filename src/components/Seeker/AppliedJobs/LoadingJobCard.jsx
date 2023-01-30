import React from 'react'
import {Box, Divider, Skeleton, Stack, Typography} from "@mui/material";

const LoadingJobCard = () => {

    return (
        <Box
            sx={{
                borderRadius: '5px',
                border: "0.5px solid #C4C4C4",
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                minHeight: '208px',
            }}
        >
            <Stack direction="column" spacing={1} width="90%">
                <Stack direction={{xs: 'column-reverse', sm: 'row'}}
                       justifyContent={{xs: "center", sm: "space-between"}}>
                    <Stack direction="column" spacing={2} alignItems="start" justifyContent="center">
                        <Typography sx={{fontSize: '16px'}}><Skeleton width="100px"/></Typography>
                        <Typography sx={{fontSize: '13px'}}><Skeleton width="120px"/></Typography>
                        <Divider fullwidth="true" flexItem/>
                        <Typography sx={{fontSize: '12px'}}><Skeleton width="100px"/></Typography>
                        <Typography sx={{fontSize: '12px'}}><Skeleton width="100px"/></Typography>
                    </Stack>

                    <Stack display="flex" justifyContent="center" alignItems="center">
                        <Skeleton variant="circular" width={80} height={80}/>
                    </Stack>
                </Stack>

                <Typography fontSize="11px"><Skeleton width="30%"/></Typography>
            </Stack>
        </Box>
    )
}

export default LoadingJobCard;