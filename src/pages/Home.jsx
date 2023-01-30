import React, { Fragment } from "react";
import { Box, Container, Grid } from "@mui/material";
import bg from "../assets/backgrounds/vector.png";
import SearchSection from "../components/Home/SearchSection";
import JobCategoryCardList from "../components/Home/JobCategoryCardList";
import TopCompaniesCardList from "../components/Home/TopCompaniesCardList";
import RecentJobSection from "../components/Home/RecentJobSection";
import OrbitAnimation from "../components/Home/OrbitAnimation";
import SlideShowAd from "../components/Home/SlideShowAd";
import DownloadOurApp from "../components/Home/DownloadOurApp";
import BannerAd from "../components/Home/Ads/BannerAd";
import { useSelector } from "react-redux";
import SEO from "../components/Common/SEO";
import VacancySection from "../components/Home/VacancySection";
import ApplicationList from "../components/Home/ApplicationList";
import RecentAppliedSection from "../components/Home/RecentAppliedSection";
import MessengerChat from "../components/MessengerChat";
import NewlyJobList from "../components/Home/NewlyJobList";
import ArticleSection from "../components/Home/ArticleSection";
import TopIndustriesList from "../components/Home/TopIndustriesList";
import SubscriptionAdCard from "../components/Home/SubscriptionAdCard";
import GetNotificationFooter from "../components/GetNotificationFooter";
import TopHiringCompanySection from "../components/Home/TopHiringCompanySection";

function Home() {

  const { isEmpLoggedIn } = useSelector((state) => state.empAuth);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      backgroundColor="white"
    >
      <SEO />
      <MessengerChat />
      <Grid
        item
        xs={12}
        container
        sx={{
          zIndex: 3,
          position: "relative",
          backgroundSize: "100% auto",
          backgroundClip: "content-box",
          backgroundOrigin: "content-box",
        }}
      >
        <Grid
          item
          container
          xs={12}
          sx={{
            position: "relative",
            background: "rgba(33, 37, 41, 0.6)",
            height: {
              xs: "400px",
              sm: "396px",
              md: "450px",
              lg: "607px",
              xl: "646px",
            },
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              zIndex: -1,
            }}
          >
            <SlideShowAd />
          </Grid>
          <Grid
            container
            item
            xs={12}
            zIndex={9}
            position="absolute"
            padding={0}
            height={{
              xs: "400px",
              sm: "400px",
              md: "400px",
              lg: "559px",
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Container maxWidth="xl" sx={{ paddingRight: "0px !important" }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                paddingLeft={{ lg: "30px", xl: 0 }}
              >
                <Grid item xs={12} md={7} lg={7}>
                  <SearchSection />
                </Grid>
                <OrbitAnimation />
              </Grid>
            </Container>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{
            marginTop: {
              xs: "-35px",
              sm: "-61px",
              md: "-81px",
              lg: "-114px",
              xl: "-150px",
            },
            position: "relative",
            backgroundSize: "100% auto",
            backgroundClip: "content-box",
            backgroundImage: `url(${bg})`,
            backgroundOrigin: "content-box",
            height: "100%",
            width: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid container width="100%">
            <Grid item xs={12} sx={{ marginTop: "100px" }}>
              <Grid container>
                {isEmpLoggedIn ? <ApplicationList /> : <JobCategoryCardList />}
                <DownloadOurApp />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {!isEmpLoggedIn && (
        <Grid item xs={12}>
          <Grid container>
            <TopCompaniesCardList />
            <TopHiringCompanySection />
            <RecentJobSection />
          </Grid>
        </Grid>
      )}

      {isEmpLoggedIn && (
        <Container maxWidth="xl">
          <Box paddingY={4}>
            <BannerAd />
          </Box>
        </Container>
      )}

      {isEmpLoggedIn && (
        <Fragment>
          <VacancySection />
          <RecentAppliedSection />
        </Fragment>
      )}

      <Container maxWidth="xl">
        {!isEmpLoggedIn && (
          <Grid container sx={{ background: "white" }}>
            <NewlyJobList />
            <TopIndustriesList />
            <BannerAd />
          </Grid>
        )}

        <SubscriptionAdCard />
        <ArticleSection isShowBorder={false} isShowBtn={false} />
      </Container>

      <GetNotificationFooter />
    </Grid>
  );
}

export default Home;
