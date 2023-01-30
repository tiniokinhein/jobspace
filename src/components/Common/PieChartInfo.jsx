import React from 'react';
import {Box, Stack, Typography} from "@mui/material";

const PieChartInfo = ({analysis}) => {

    return (
        <Box>
            <Stack spacing={2}>
                <Stack direction="row" spacing={{xs: 1.5, sm: 0}}>
                    <Stack direction="row" spacing={2} width="50%" alignItems="center">
                        <Box
                            sx={{
                                width: {xs: '41px', sm: '70px'},
                                height: '27px',
                                background: '#FF9635',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography align="center">{analysis?.candidate}</Typography>
                        </Box>
                        <Typography fontSize="14px">Candidates</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} width="50%" alignItems="center">
                        <Box
                            sx={{
                                width: {xs: '41px', sm: '70px'},
                                height: '27px',
                                background: '#B0F330',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography align="center">{analysis?.shortlists}</Typography>
                        </Box>
                        <Typography fontSize="14px">Shortlisted</Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={{xs: 1.5, sm: 0}}>
                    <Stack direction="row" spacing={2} width="50%" alignItems="center">
                        <Box
                            sx={{
                                width: {xs: '41px', sm: '70px'},
                                height: '27px',
                                background: '#00A0DC',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography align="center">{analysis?.prescreens}</Typography>
                        </Box>
                        <Typography fontSize="14px">Prescreen</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} width="50%" alignItems="center">
                        <Box
                            sx={{
                                width: {xs: '41px', sm: '70px'},
                                height: '27px',
                                ml: {xs: 0.8, sm: 0},
                                background: '#92E3A9',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography align="center">{analysis?.interviews}</Typography>
                        </Box>
                        <Typography fontSize="14px">Interview</Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={{xs: 1.5, sm: 0}}>
                    <Stack direction="row" spacing={2} width="50%" alignItems="center">
                        <Box
                            sx={{
                                width: {xs: '41px', sm: '70px'},
                                height: '27px',
                                background: '#EF5DA8',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography align="center">{analysis?.considering}</Typography>
                        </Box>
                        <Typography fontSize="14px">Considering</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} width="50%" alignItems="center">
                        <Box
                            sx={{
                                width: {xs: '41px', sm: '70px'},
                                height: '27px',
                                background: '#FF0000',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography align="center">{analysis?.hired}</Typography>
                        </Box>
                        <Typography fontSize="14px">Hired</Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={{xs: 1.5, sm: 0}}>
                    <Stack direction="row" spacing={2} width="50%" alignItems="center">
                        <Box
                            sx={{
                                width: {xs: '41px', sm: '70px'},
                                height: '27px',
                                background: '#FFE15A',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography align="center">{analysis?.not_suitable}</Typography>
                        </Box>
                        <Typography fontSize="14px">Not Suitable</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default PieChartInfo;