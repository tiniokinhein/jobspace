import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Container, Grid, InputAdornment, TextField} from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import {useTranslation} from "react-i18next";
import RegionDataService from "../../services/regions.service";
import TownshipDataService from "../../services/townships.service";
import SearchBg from "../../assets/backgrounds/search-bg.png";
import SearchBox from "../Common/SearchBox";
import CountryDataService from "../../services/country.service";

const JobSearchBar = ({handleSearch, setSearchVal, handleDivisionValChange, isOverSea = false}) => {

    const {t} = useTranslation();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        (async () => {
            if (isOverSea) {
                await CountryDataService.get({is_oversea: 1}).then(r => setLocations(r.data))
            } else {
                await RegionDataService.all().then(r => {
                    const regions = r.data;

                    TownshipDataService.all().then(r => {
                        const data = r.data;
                        setLocations([...regions, ...data])
                    })
                })
            }
        })()
        // eslint-disable-next-line
    }, []);

    return (
        <Box
            component={Grid}
            item
            xs={12}
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
                    onSubmit={handleSearch}
                >
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: '100px',
                            borderRadius: '10px',
                            padding: {xs: '20px', md: 0},
                            marginY: {xs: '10px', md: 0},
                            background: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Grid container spacing={2} sx={{px: 3}} justifyContent="space-between">
                            <Grid item xs={12} sm={12} md={5.2} lg={5.2} xl={5.2}>
                                <SearchBox setSearch={setSearchVal} showIcon={true}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={5.2} lg={5.2} xl={5.2}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={locations}
                                    sx={{borderColor: 'white'}}
                                    getOptionLabel={option => option.title ? option.title : ''}
                                    isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                    renderInput={(params) =>
                                        <TextField
                                            fullWidth
                                            {...params}
                                            placeholder={isOverSea ? 'Country' : t('division_or_town')}
                                            InputProps={{
                                                ...params.InputProps,
                                                startAdornment: <InputAdornment position="start"><AdjustIcon
                                                    color="secondary"/></InputAdornment>, style: {
                                                    borderRadius: '7px', borderColor: '#EBEBEB'
                                                }
                                            }}
                                            sx={{
                                                fontSize: '16px'
                                            }}
                                        />}
                                    onChange={(event, value) => handleDivisionValChange(value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            sx={{
                                                background: 'linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)',
                                                borderRadius: '7px',
                                                color: 'white',
                                                minHeight: {
                                                    md: '55px', lg: '55px'
                                                },
                                                height: '50px',
                                                fontSize: '16px'
                                            }}
                                        >
                                            {t('find_jobs')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default JobSearchBar;