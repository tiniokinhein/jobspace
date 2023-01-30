import * as React from "react";
import { Container, Grid } from "@mui/material";
import "react-perfect-scrollbar/dist/css/styles.css";
import TopHiringBg from "../../assets/backgrounds/top_hiring_bg.png";
import "react-alice-carousel/lib/alice-carousel.css";
import HiringCompanies from "../Common/HiringCompanies";
import FirstAd from "./Ads/FirstAd";

const TopHiringCompanySection = () => {
  return (
    <Grid
      item
      pt={3}
      pb={5}
      xs={12}
      width="100%"
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
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item xs={12} md={8.8} xl={9}>
            <HiringCompanies />
          </Grid>
          <FirstAd />
        </Grid>
      </Container>
    </Grid>
  );
};

export default TopHiringCompanySection;