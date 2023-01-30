import * as React from "react";
import { Container, Grid } from "@mui/material";
import "react-perfect-scrollbar/dist/css/styles.css";
import TopHiringBg from "../../assets/backgrounds/top_hiring_bg.png";
import "react-alice-carousel/lib/alice-carousel.css";
import Vacancies from "../Common/Vacancies";
import FirstAd from "./Ads/FirstAd";

const VacancySection = () => {
  return (
    <Grid
      item
      pt={5}
      pb="29px"
      xs={12}
      width="100%"
      backgroundColor="#F5FCFF"
      px={{ lg: "30px", xl: 0 }}
      sx={{
        backgroundImage: `url(${TopHiringBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: {
          lg: "100% 115%",
          xl: "85% 115%",
        },
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="xl">
        <Grid container width="100%" justifyContent="space-between">
          <Grid item xs={12} md={8.8} xl={9}>
            <Vacancies />
          </Grid>
          <FirstAd />
        </Grid>
      </Container>
    </Grid>
  );
};

export default VacancySection;