import React, {useEffect, useState} from "react";
import {Box, Button, CardMedia, Grid, IconButton, Link, Paper, Stack, Typography,} from "@mui/material";
import TitleComponent from "./TitleComponent";
import VacancyDataService from "../../services/vacancy.service";
import {Link as RouterLink} from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        (async () => {
            await VacancyDataService.get().then((r) => {
                setVacancies(r.data);
            });
        })();
    }, []);

    const renderNextButton = ({isDisabled}) => {
        return (
            <IconButton
                color="secondary"
                aria-label="next button"
                sx={{
                    top: 130,
                    right: -15,
                    boxShadow: 2,
                    position: "absolute",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: "white",
                    },
                    "&:disabled": {
                        backgroundColor: "white",
                    },
                }}
                disabled={isDisabled}
            >
                <ArrowForwardIosIcon/>
            </IconButton>
        );
    };

    const renderPrevButton = ({isDisabled}) => {
        return (
            <IconButton
                color="secondary"
                aria-label="prev button"
                sx={{
                    top: 130,
                    left: -15,
                    boxShadow: 2,
                    position: "absolute",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: "white",
                    },
                    "&:disabled": {
                        backgroundColor: "white",
                    },
                }}
                disabled={isDisabled}
            >
                <ArrowBackIosNewIcon/>
            </IconButton>
        );
    };

    const responsive = {
        0: {items: 1},
        568: {items: 2},
        1024: {items: 4},
        1450: {items: 5},
    };

    return (
        <Paper
            sx={{
                px: "40px",
                py: "33px",
                minHeight: "394px",
                borderRadius: "10px",
                boxShadow: "0px 9px 15px 1px rgba(0,0,0,0.1)",
            }}
            elevation={0}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                display="flex"
                alignItems="stretch"
                spacing={3}
            >
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between">
                        <TitleComponent title="My Vacancies"/>
                        <Typography variant="body2">
                            <Link
                                component={RouterLink}
                                to="/employers/posted-jobs#all-listing"
                                underline="hover"
                                align="right"
                                color="inherit"
                            >
                                Show All
                            </Link>
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} style={{maxWidth: "100%"}}>
                    {vacancies.length > 0 && (
                        <AliceCarousel
                            mouseTracking
                            disableDotsControls
                            responsive={responsive}
                            keyboardNavigation={true}
                            controlsStrategy="alternate"
                            renderPrevButton={renderPrevButton}
                            renderNextButton={renderNextButton}
                        >
                            {vacancies.map((vacancy) => (
                                <div key={vacancy.uuid} style={{padding: "5px"}}>
                                    <Link
                                        underline="none" component={RouterLink}
                                        to={`/employers/posted-jobs/${vacancy.uuid}/detail`}>

                                        <Paper
                                            variant="outlined"
                                            className="item"
                                            sx={{
                                                minHeight: "300px",
                                                display: "flex",
                                                height: "100%",
                                                border: "1px solid rgba(235, 235, 235, 1)",
                                                borderBottom: "solid #00A0DC 4px",
                                                borderRadius: "5px",
                                                minWidth: {
                                                    xs: "220px",
                                                    md: "190px",
                                                    xl: "220px",
                                                },
                                            }}
                                        >
                                            <Stack
                                                flexGrow={1}
                                                alignItems="center"
                                                display="flex"
                                                justifyContent="center"
                                                spacing={2}
                                                padding="10px"
                                            >
                                                <Box
                                                    alignItems="center"
                                                    display="flex"
                                                    justifyItems="center"
                                                    sx={{
                                                        width: "80px",
                                                        height: "80px",
                                                        overflow: "hidden",
                                                        borderRadius: "2px",
                                                    }}
                                                >
                                                    <CardMedia
                                                        component="img"
                                                        sx={{width: "100%", height: "100%"}}
                                                        image={`${process.env.REACT_APP_URL}/storage/logo/${vacancy.logo}`}
                                                        alt={vacancy.company_name}
                                                    />
                                                </Box>
                                                <Typography
                                                    fontWeight={300}
                                                    align="center"
                                                    fontSize="16px"
                                                    sx={{
                                                        maxWidth: '90%',
                                                        maxHeight: '70px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    {vacancy.job_title}
                                                </Typography>
                                                <Typography
                                                    fontWeight={300}
                                                    align="center"
                                                    fontSize="15px"
                                                    sx={{color: "#00A0DC"}}
                                                >
                                                    {vacancy.company_name}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    disableElevation
                                                    sx={{
                                                        color: "#689C03",
                                                        borderRadius: "20px",
                                                        backgroundColor: "#F5FFE2",
                                                        "&:hover": {
                                                            backgroundColor: "#689C03",
                                                            color: "#fff",
                                                        },
                                                        width: "85px",
                                                        fontSize: "12px",
                                                    }}
                                                    size="small"
                                                    type="button"
                                                >
                                                    {vacancy.job_type}
                                                </Button>
                                            </Stack>
                                        </Paper>
                                    </Link>
                                </div>
                            ))}
                        </AliceCarousel>
                    )}
                    {vacancies.length < 1 && (
                        <Typography variant="h6">There is no data.</Typography>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Vacancies;
