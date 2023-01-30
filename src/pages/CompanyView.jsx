import React, { useCallback, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid, Paper,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useNavigate, useParams } from "react-router-dom";
import GetNotificationFooter from "../components/GetNotificationFooter";
import { useDispatch, useSelector } from "react-redux";
import { companiesActions, userActions } from "../store";
import CompanyHome from "../components/Company/CompanyHome";
import CompanyJob from "../components/Company/CompanyJob";
import CompanyImage from "../components/Company/CompanyImage";
import CompanyVideo from "../components/Company/CompanyVideo";
import CompanyPromotion from "../components/Company/CompanyPromotion";
import FindAnotherCompany from "../components/Seeker/FindAnotherCompany";
import { setProgress } from "../store/slices/progress";
import ClickAwayService from "../services/click.away.service";
import SEO from "../components/Common/SEO";
import BG from '../assets/images/default-company-bg.png'
import DFlogo from '../assets/images/default-company-logo.jpg'

const CompanyView = () => {
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { companies } = useSelector((x) => x.companies);

  const [follow, setFollow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const initFetch = useCallback(() => {
    dispatch(companiesActions.getByUuid(params.companyId)).then(() => setLoading(false));
  }, [dispatch, params.companyId]);

  useEffect(() => {
    dispatch(setProgress(50));
    initFetch();
    if (companies?.is_followed) {
      setFollow(true);
    } else {
      setFollow(false);
    }

    let hashVal = window.location.hash;

    if (hashVal) {
      hashVal = hashVal.substring(1);
      if (hashVal.toLowerCase() === "jobs") {
        setValue("Jobs");
      }
    }
    dispatch(setProgress(100));
    // eslint-disable-next-line
  }, [companies.is_followed, initFetch]);

  const [value, setValue] = React.useState("Home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    scrollToTop();
  };

  const changeTab = (value) => {
    setValue(value);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: "250",
      behavior: "smooth",
    });
  };

  const handleFollow = () => {
    if (isLoggedIn) {
      const data = [];
      data["company_uuid"] = params.companyId;
      dispatch(userActions.followCompany(data)).then(() => setFollow(!follow));
    } else {
      navigate("/seekers/sign-in");
    }
  };

  const handleUnFollow = () => {
    if (isLoggedIn) {
      const data = [];
      data["company_uuid"] = params.companyId;
      dispatch(userActions.unFollowCompany(data)).then(()=> setFollow(!follow));
    } else {
      navigate("/seekers/sign-in");
    }
  };

  const handleClickAway = (url) => {
    if (url) {
      ClickAwayService.get(params.companyId).then(() => {
        window.open(url, "_blank");
      });
    }
  };

  return (
    <Grid container>
      <SEO title={companies?.company_name} />
      {companies.banner && (
        <Grid
          item
          xs={12}
          justifyContent="flex-start"
          alignItems="flex-end"
          display="flex"
          sx={{
            height: companies.banner ? "363px" : "auto",
          }}
        >
          <Box width="100%" zIndex={1} position="absolute">
            <Card square elevation={0}>
              <CardMedia
                component="img"
                height="361px"
                width="100%"
                image={companies.banner?.includes('.jpg') ? companies.banner : BG}
                loading="lazy"
              />
            </Card>
          </Box>
        </Grid>
      )}

      <Box
        sx={{
          height: "240px",
          maxHeight: "240px",
          width: "100%",
          background: {
            xs: "linear-gradient(90.48deg, #2D5DD4 0%, #21277F 99.91%)",
            md: "linear-gradient(90.48deg, #2D5DD4 0%, #21277F 99.91%)",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Grid
            container
            sx={{
              padding: {
                lg: "0px 30px",
                xl: 0,
              },
              height: "100%",
            }}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Grid item container xs={12} md={12} spacing={2}>
              <Grid xs={5} sm={3} md={2} item>
                <Box
                  sx={{
                    maxWidth: "159px",
                    maxHeight: "159px",
                  }}
                >
                  <Card
                    sx={{
                      padding: 1,
                      maxWidth: "159px",
                      maxHeight: "159px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        background: "#FFFFFF",
                        width: { xs: "120px", sm: "140px" },
                        height: { xs: "120px", sm: "140px" },
                      }}
                      variant="square"
                      src={companies.logo?.includes('.jpg') ? companies.logo : DFlogo}
                    />
                  </Card>
                </Box>
              </Grid>

              <Grid
                item
                xs={7}
                sm={6}
                md={7}
                display="flex"
                alignItems="center"
              >
                <Stack spacing={2}>
                  <Typography
                    style={styles.companyName}
                    sx={{
                      color: { xs: "#fff", md: "#fff" },
                      mb: 1,
                      fontSize: { xs: "18px", md: "24px" },
                    }}
                  >
                    {companies.company_name ? companies.company_name : ""}
                  </Typography>

                  {(companies.township || companies.region) && (
                    <Typography
                      style={styles.companyInfo}
                      sx={{
                        color: "#FFFF",
                      }}
                    >
                      {companies.township ? companies.township.title : ""}
                      {companies.region ? ", " + companies.region.title : ""}
                    </Typography>
                  )}

                  {companies.website && (
                    <Typography
                      style={styles.companyInfo}
                      sx={{
                        color: "#FFFF",
                        display: { xs: "none", sm: "block" },
                        cursor: "pointer",
                        maxWidth: '634px',
                      }}
                      noWrap={true}
                      onClick={() => handleClickAway(companies.website)}
                    >
                      Website :&nbsp;
                      {companies.website ? companies.website : ""}
                    </Typography>
                  )}
                  <Typography
                    style={styles.companyInfo}
                    sx={{
                      color: "#FFFF",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Total Views: {companies.employee_view}
                  </Typography>
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                display="flex"
                alignItems="center"
              >
                <Stack
                  spacing={1}
                  display="flex"
                  alignItems="center"
                  width="100%"
                >
                  {follow ? (
                    <Button
                      align="center"
                      sx={{
                        background:
                          "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "400",
                        borderRadius: "10px",
                        py: 1,
                        px: 2,
                        width: "100%",
                      }}
                      size="small"
                      onClick={handleUnFollow}
                    >
                      Unfollow the Company
                    </Button>
                  ) : (
                    <Button
                      align="center"
                      sx={{
                        background:
                          "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "400",
                        borderRadius: "10px",
                        py: 1,
                        px: 2,
                        width: "100%",
                      }}
                      size="small"
                      onClick={handleFollow}
                    >
                      Follow the Company
                    </Button>
                  )}

                  <Typography
                    style={styles.text}
                    sx={{
                      display: { xs: "none", md: "block" },
                      color: "#FFF",
                      textAlign: "center",
                      py: { xs: 2, md: 0 },
                    }}
                  >
                    Get weekly updates, new jobs, and reviews
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box width="100%">
        <Container maxWidth="xl">
          <Grid
            container
            sx={{
              padding: {
                lg: "0px 30px",
                xl: 0,
              },
              height: "100%",
            }}
            alignItems="flex-start"
            justifyContent="center"
            display="flex"
          >
            <Grid item xs={12} md={9}>
              <TabContext value={value}>
                <Grid container spacing={3} sx={{ py: 2 }}>
                  <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                      >
                        <Tab
                          label={<Typography fontWeight={500}>Home</Typography>}
                          value="Home"
                        />
                        <Tab
                          label={<Typography fontWeight={500}>Jobs</Typography>}
                          value="Jobs"
                        />
                        <Tab
                          label={
                            <Typography fontWeight={500}>Photos</Typography>
                          }
                          value="Photos"
                        />
                        <Tab
                          label={
                            <Typography fontWeight={500}>Video</Typography>
                          }
                          value="Video"
                        />
                        <Tab
                          label={
                            <Typography fontWeight={500}>
                              Products & Promotions
                            </Typography>
                          }
                          value="Products & Promotions"
                        />
                      </TabList>
                    </Box>
                  </Grid>

                  <TabPanel
                    value="Home"
                    sx={{
                      pr: 0,
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    {!loading && companies.uuid && (
                      <CompanyHome company={companies} changeTab={changeTab} />
                    )}
                  </TabPanel>

                  <TabPanel
                    value="Jobs"
                    sx={{
                      pr: 0,
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    {!loading && <CompanyJob companies={companies} />}
                  </TabPanel>

                  <TabPanel
                    value="Photos"
                    sx={{
                      pr: 0,
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    {!loading && <CompanyImage companies={companies} />}
                  </TabPanel>

                  <TabPanel
                    value="Video"
                    sx={{
                      pr: 0,
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    {!loading && <CompanyVideo companies={companies} />}
                  </TabPanel>

                  <TabPanel
                    value="Products & Promotions"
                    sx={{
                      pr: 0,
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  >
                    {!loading && <CompanyPromotion companies={companies} />}
                  </TabPanel>
                </Grid>
              </TabContext>

              <Grid item xs={12}>
                <FindAnotherCompany />
              </Grid>
            </Grid>

            <Box
              component={Grid}
              item
              xs={12}
              md={3}
              display={{ sm: "none", md: "flex" }}
              sx={{ my: 3 }}
              justifyContent="flex-end"
            >
              <Paper
                sx={{ background: "#FFFF", borderRadius: "10px", width: '90%' }}
              >
                <Stack direction="column" spacing={3} sx={{ py: 3, px: 4 }}>
                  <Typography
                    sx={{ color: "#195DCC", fontWeight: "500" }}
                    style={styles.tabHeader}
                  >
                    Overview
                  </Typography>
                  <Box>
                    <Typography
                      style={styles.sideContent}
                      sx={{ fontWeight: "500" }}
                    >
                      Founded
                    </Typography>
                    <Typography style={styles.tabContent}>
                      {companies.founded_since}
                    </Typography>
                  </Box>

                  {companies.employee_count && (
                    <Box>
                      <Typography
                        style={styles.sideContent}
                        sx={{ fontWeight: "500" }}
                      >
                        Employees
                      </Typography>
                      <Typography style={styles.tabContent}>
                        {companies.employee_count?.title}
                      </Typography>
                    </Box>
                  )}

                  {companies.industry && (
                    <Box>
                      <Typography
                        style={styles.sideContent}
                        sx={{ fontWeight: "bold" }}
                      >
                        Industry
                      </Typography>
                      <Typography
                        style={{
                          ...styles.tabContent,
                        }}
                      >
                        {companies.industry?.title}
                      </Typography>
                    </Box>
                  )}

                  {companies.website && (
                    <Box>
                      <Typography
                        style={styles.sideContent}
                        sx={{ fontWeight: "bold" }}
                      >
                        Links
                      </Typography>
                      <Typography
                        style={{
                          ...styles.tabContent,
                          textDecoration: "underline",
                        }}
                        sx={{ color: "#00A0DC", cursor: "pointer" }}
                        onClick={() => handleClickAway(companies.website)}
                        noWrap={true}
                      >
                        {companies.website}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Container>
      </Box>
      <GetNotificationFooter />
    </Grid>
  );
};

export default CompanyView;

const styles = {
  companyName: {
    fontWeight: "500",
    color: "#FFFFF",
    fontStyle: "normal",
  },
  companyInfo: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#FFFFF",
  },
  package: {
    fontSize: "16px",
    fontWeight: " 300",
  },
  text: {
    fontSize: "16px",
    fontWeight: "400",
  },
  tabHeader: {
    fontSize: "20px",
    fontWeight: "500",
  },
  tabContent: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
  },
  sideContent: {
    fontSize: "14px",
    // fontWeight: 500
  },
};