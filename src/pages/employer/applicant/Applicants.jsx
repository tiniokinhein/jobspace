import React, {useState} from 'react';
import {Box, Grid, IconButton, InputBase, Paper, Stack, Typography} from "@mui/material";
import SEO from "../../../components/Common/SEO";
import SearchIcon from "@mui/icons-material/Search";
import ApplicantList from "../../../components/Employer/ApplicantList";

const Applicants = () => {
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState(null);

    const onSearch = (e) => {
        setSearch(e.target.value)
    };

    return (
        <Box>
            <SEO title="ApplicantList"/>
            <Box
                sx={{
                    borderRadius: '10px',
                    marginBottom: '1.5rem',
                    background: '#fff',
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)"
                }}
            >
                <Grid container alignItems="centers">
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                            borderBottom: '1px solid #C4C4C4'
                        }}
                    >
                        <Typography py={3} px={5} sx={{
                            color: '#195DCC',
                            fontSize: '24px',
                            fontWeight: '400',
                        }}>Applicants ( {total} )</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Stack
                            direction={{xs: "column-reverse", sm: "row"}}
                            justifyContent={{xs: "center", sm: "flex-end"}}
                            alignItems={{xs: "start", sm: "center"}}
                            px={3} py={2}
                        >
                            <Paper
                                component="form"
                                sx={{
                                    p: '2px 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    minWidth: 250,
                                    border: '1px solid #DADADA',
                                    boxShadow: 'none',
                                    borderRadius: '5px',
                                    borderColor: '#DADADA',
                                    height: '43px'
                                }}
                            >
                                <InputBase
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="Search By Keywords"
                                    inputProps={{
                                        'aria-label': 'search',
                                        style: {
                                            borderRadius: '5px'
                                        }
                                    }}
                                    onChange={onSearch}
                                />
                                <IconButton aria-label="search">
                                    <SearchIcon sx={{fontSize: '20px', color: '#C7C4C4'}}/>
                                </IconButton>
                            </Paper>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <ApplicantList search={search} setTotal={setTotal}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

export default Applicants;