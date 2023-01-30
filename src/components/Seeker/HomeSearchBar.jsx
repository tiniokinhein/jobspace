import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Container, Grid, InputAdornment, TextField} from "@mui/material";
import SearchBg from "../../assets/backgrounds/search-bg.png";
import SearchIcon from "@mui/icons-material/Search";
import AdjustIcon from "@mui/icons-material/Adjust";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import RegionDataService from "../../services/regions.service";
import TownshipDataService from "../../services/townships.service";
import {useGeolocated} from "react-geolocated";

const HomeSearchBar = () => {

    const {t} = useTranslation();

    const {jobTitle} = useParams();

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        retrieveLoc()
    }, []);

    const retrieveLoc = () => {
        RegionDataService.all().then(r => {
            const {data: regions} = r.data;

            TownshipDataService.all().then(r => {
                const data = r.data;
                setLocations([...data, ...regions])
            })
        })
    }

    // Near Me Config
    const {coords, isGeolocationAvailable, isGeolocationEnabled} = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    const handleJobsNear = () => {
        if (isGeolocationAvailable) {
            if (!isGeolocationEnabled) {
                alert('Geolocation is not enabled');
            } else {
                console.log(coords)
            }
        } else {
            alert('Your browser does not support Geolocation');
        }
    }

    const handleSubmit = () => {

    }

    return (
        <Box component={Grid} item xs={12}
             sx={{
                 backgroundImage: `url(${SearchBg})`,
                 backgroundPosition: "center",
                 backgroundSize: '100% 100%',
                 backgroundRepeat: "no-repeat",
                 position: 'sticky',
                 top: 0,
                 zIndex: 5,
                 width: '100%',
                 paddingY: {
                     sm: '20px', md: 0
                 }
             }}
        >
            <Container maxWidth="xl">
                <Box
                    px={{lg: '30px', xl: 0}}
                    component="form"
                    noValidate
                    alignItems="center"
                    display="flex"
                    width="100%"
                    minHeight="140px"
                    onSubmit={handleSubmit}
                >
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: '100px',
                            borderRadius: '10px',
                            padding: {sm: '20px', md: 0},
                            background: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Grid container spacing={2} width="95%">
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4.5}>
                                <TextField
                                    fullWidth
                                    placeholder={t('search_plh')}
                                    id="search"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><SearchIcon
                                            color="secondary"/></InputAdornment>, style: {
                                            borderRadius: '5px', borderColor: '#EBEBEB'
                                        }
                                    }}
                                    name="search"
                                    // onChange={handleSearchValChange}
                                    defaultValue={jobTitle !== "latest-jobs" ? jobTitle : null}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4.5}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={locations}
                                    getOptionLabel={option => option.title ? option.title : ''}
                                    isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                    renderInput={(params) =>
                                        <TextField
                                            fullWidth
                                            {...params}
                                            placeholder={t('division_or_town')}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: <InputAdornment position="start"><AdjustIcon
                                                    color="secondary"/></InputAdornment>, style: {
                                                    borderRadius: '5px', borderColor: '#EBEBEB'
                                                }
                                            }}
                                            sx={{
                                                fontSize: '16px'
                                            }}
                                        />}
                                    // onChange={(event, value) => handleDivisionValChange(value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            sx={{
                                                background: 'linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)',
                                                borderRadius: ' 5px',
                                                color: 'white',
                                                minHeight: {
                                                    md: 'auto', lg: '55px'
                                                },
                                                height: '50px',
                                                fontSize: '16px'
                                            }}
                                        >
                                            {/* Find Jobs */}
                                            {t('find_jobs')}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <Button
                                            fullWidth
                                            sx={{
                                                background: 'transparent',
                                                border: ' 1px solid #00A0DC',
                                                borderRadius: '5px',
                                                color: 'black',
                                                minHeight: {
                                                    md: 'auto', lg: '55px'
                                                },
                                                height: '50px',
                                                mb: 0,
                                                fontSize: '16px'
                                            }}
                                            variant="outlined"
                                            startIcon={<LocationOnIcon color="secondary" fontSize="1.5rem"/>}
                                            onClick={handleJobsNear}
                                        >
                                            Jobs Near Me
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default HomeSearchBar;