import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import RecentJobTitle from "../RecentJob/RecentJobTitle";
import SecondAd from "./Ads/SecondAd";
import RecentJobs from "../RecentJob/RecentJobs";
import AdDataService from "../../services/ad.service";

const RecentJobSection = () => {
  const [thirdAd, setThirdAd] = useState({});
  const [secondAd, setSecondAd] = useState({});
  const [sixAd, setSixAd] = useState({});

  useEffect(() => {
    (async () => {
      await AdDataService.get("/second-ad").then((res) => {
        setSecondAd(res.data);
      });

      await AdDataService.get("/third-ad").then((res) => {
        setThirdAd(res.data);
      });

      await AdDataService.get("/sixth-ad").then((res) => {
        setSixAd(res.data);
      });
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      item
      pt={5}
      pb="29px"
      xs={12}
      width="100%"
      backgroundColor="#F5FCFF"
      px={{ lg: "30px", xl: 0 }}
    >
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={8.8} xl={9}>
            <RecentJobTitle />
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid container spacing={1} justifyContent="space-between">
              <Grid item xs={12} md={8.8} xl={9}>
                <RecentJobs />
              </Grid>

              {Object.keys(secondAd).length > 0 ||
              Object.keys(thirdAd).length > 0 ? (
                <Box
                  item
                  md={3}
                  xl={3}
                  width="100%"
                  justifyContent="flex-end"
                  display={{ xs: "none", md: "flex" }}
                  paddingTop={{ xs: 2, md: 0 }}
                  component={Grid}
                >
                  <Stack
                    spacing={2}
                    width="100%"
                    alignItems="flex-end"
                  >
                    <SecondAd data={secondAd} />

                    <SecondAd data={thirdAd} />

                    <SecondAd data={sixAd} />
                  </Stack>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default RecentJobSection;