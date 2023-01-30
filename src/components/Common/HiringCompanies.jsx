import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TitleComponent from "./TitleComponent";
import { Link as RouterLink } from "react-router-dom";
import TopHiringCompanyService from "../../services/top.hiring.companies";

const HiringCompanies = () => {
  const url = process.env.REACT_APP_URL;
  const [loading, setLoading] = useState(true);
  const [topHiringCompanies, setTopHiringCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      await TopHiringCompanyService.all().then((r) => {
          setTopHiringCompanies(r.data);
          setLoading(false);
      });
    })();
  }, []);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
    1450: { items: 5 },
  };

  const renderNextButton = ({ isDisabled }) => {
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
        <ArrowForwardIosIcon />
      </IconButton>
    );
  };

  const renderPrevButton = ({ isDisabled }) => {
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
        <ArrowBackIosNewIcon />
      </IconButton>
    );
  };

  const Image = React.memo(({ src }) => {
    return (
      <Avatar
        sx={{
          background: "#FFFFFF",
          width: "80px",
          height: "80px",
          borderRadius: "4px",
        }}
        variant="square"
        src={`${url}/storage/logo/${src}`}
      />
    );
  });

  return (
    <Paper
      sx={{
        px: "40px",
        pt: "33px",
        minHeight: "394px",
        borderRadius: "10px",
        boxShadow: "0px 9px 15px 1px rgba(0,0,0,0.1)",
      }}
      elevation={0}
    >
      <Grid
        container
        direction="column"
        justifyContent="start"
        display="flex"
        alignItems="space-between"
        spacing={3}
      >
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <TitleComponent title="top_hiring_companies" disableP={true} />
            <Link
              to="/companies"
              underline="hover"
              component={RouterLink}
              align="right"
              color="inherit"
            >
              Show All
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} style={{ maxWidth: "100%" }}>
          {(!loading && topHiringCompanies.length > 0) && (
            <AliceCarousel
              mouseTracking
              disableDotsControls
              responsive={responsive}
              keyboardNavigation={true}
              controlsStrategy="alternate"
              renderPrevButton={renderPrevButton}
              renderNextButton={renderNextButton}
            >
              {topHiringCompanies.map((topHiringCompany) => (
                <div key={topHiringCompany.uuid} style={{ padding: "5px" }}>
                  <Paper
                    key={topHiringCompany.uuid}
                    variant="outlined"
                    className="item"
                    sx={{
                      minHeight: "300px",
                      maxHeight: "300px",
                      display: "flex",
                      height: "100%",
                      border: "0.5px solid #EBEBEB",
                      borderBottom: "solid #00A0DC 4px",
                      borderRadius: "7px",
                    }}
                  >
                    <Stack
                      flexGrow={1}
                      alignItems="center"
                      display="flex"
                      justifyContent="space-between"
                      spacing={2}
                      padding="10px"
                    >
                      <Box
                        alignItems="center"
                        display="flex"
                        justifyItems="center"
                        sx={{
                          width: "80px",
                          maxHeight: "80px",
                        }}
                      >
                          <Image src={topHiringCompany.logo}/>
                      </Box>
                      <Typography
                        fontWeight={300}
                        align="center"
                        fontSize="16px"
                      >
                        {topHiringCompany.company_name ?? null}
                      </Typography>
                      <Typography
                        fontWeight={300}
                        align="center"
                        fontSize="15px"
                        color="text.secondary"
                      >
                        ({topHiringCompany.region?.title})
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        component={RouterLink}
                        to={`/companies/${topHiringCompany.uuid}/details`}
                        size="small"
                        sx={{ borderRadius: "7px" }}
                      >
                        {topHiringCompany.job_count ?? 0} Opening
                      </Button>
                    </Stack>
                  </Paper>
                </div>
              ))}
            </AliceCarousel>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HiringCompanies;
