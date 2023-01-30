import * as React from "react";
import { useEffect, useState } from "react";
import { Container, Grid, Stack } from "@mui/material";
import SecondAd from "./Ads/SecondAd";
import RecentAppliedList from "../RecentApplied/RecentAppliedList";
import AdDataService from "../../services/ad.service";
import ThirdAd from "./Ads/ThirdAd";

const RecentAppliedSection = () => {
  const [secondAd, setSecondAd] = useState({});
  const [thirdAd, setThirdAd] = useState({});

  useEffect(() => {
    (async () => {
      await AdDataService.get("/second-ad").then((r) => {
        const data = r.data;
        setSecondAd(data);
      });

      await AdDataService.get("/third-ad").then((r) => {
        const data = r.data;
        setThirdAd(data);
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
        <Grid container>
          <Grid item xs={12} md={8.8} xl={9}>
            <Grid container>
              <RecentAppliedList />
            </Grid>
          </Grid>

          {Object.keys(secondAd).length > 0 ||
          Object.keys(thirdAd).length > 0 ? (
            <Grid
              item
              md={3}
              xl={3}
              width="100%"
              justifyContent="flex-end"
              display={{ xs: "none", md: "flex" }}
            >
              <Stack spacing={2}>
                <SecondAd data={secondAd} />
                <ThirdAd data={thirdAd} />
              </Stack>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Grid>
  );
};


export default RecentAppliedSection;