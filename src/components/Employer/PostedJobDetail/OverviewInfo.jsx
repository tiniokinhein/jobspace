import React from 'react';
import {Box, FormControl, Grid, InputAdornment, Link, OutlinedInput, Stack, Typography} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

const OverviewInfo = ({overview, handleSearchChange}) => {

    return (
        <Box
            sx={{
                my: 2,
                borderRadius: '10px',
                background: '#ffffff',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
            }}
            flexGrow={1}
        >
            <Grid container sx={{p: 3}}>
                <Grid item xs={12} md={7}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <Typography fontSize="18px" fontWeight={400}>
                                <Link underline="always">
                                    {overview?.job_title}
                                </Link>
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <Box sx={{
                                    background: '#FFF0E3',
                                    border: '1px solid #FF9635',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '31px',
                                    px: 2,
                                    minWidth: '150px'
                                }}>
                                    <Visibility sx={{
                                        mr: 1,
                                        background: '#FF9635',
                                        color: '#FFFFFF',
                                        fontSize: '14px'
                                    }}/>
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 400
                                        }}
                                        component="span"
                                    >
                                        {overview?.view_count ?? 0} views
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    background: '#E7FEED',
                                    border: '1px solid #09962F',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 'auto',
                                    minWidth: '200px',
                                }}>
                                    <Visibility sx={{
                                        mr: 1,
                                        background: '#FF9635',
                                        color: '#FFFFFF',
                                        fontSize: '14px'
                                    }}/>
                                    <Typography sx={{fontSize: '14px', fontWeight: 400}}>
                                        {overview?.analysis?.applied ?? 0} Total Applications
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Typography fontSize="13px" color="#A1A1A1">
                            Posted: {overview.posted_date} {overview.time && `(${overview.time})`}
                            {overview.expired_date && ` | Expired: ${overview.expired_date}`}
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                        <FormControl variant="outlined" size="large" color='secondary'
                                     sx={{width: {sm: '100%', md: '65%'}, borderRadius: '5px', height: '43px'}}>
                            <OutlinedInput
                                id='search'
                                type='text'
                                placeholder="Search By Keywords"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SearchIcon aria-label="search" sx={{color: '#A2A2A2'}}/>
                                    </InputAdornment>
                                }
                                sx={{
                                    '.MuiOutlinedInput-notchedOutline': {borderColor: '#DADADA'},
                                    height: '43px',
                                    borderRadius: '5px',
                                }}
                                onChange={handleSearchChange}
                            />
                        </FormControl>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OverviewInfo;