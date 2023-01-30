import React, {useCallback, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Link,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setProgress} from "../../../store/slices/progress";
import TopCompanyService from "../../../services/top.companies.service";
import SeekerDashboardDataService from "../../../services/seeker.dashboard.service";
import SEO from "../../../components/Common/SEO";
import {Link as RouterLink} from "react-router-dom";
import PercentImg from "../../../assets/images/percent-img.svg";
import CircularProfileProgress from "../../../components/CircularProfileProgress";
import {applyJobActions} from "../../../store";
import AppliedJobCard from "../../../components/Seeker/AppliedJobs/AppliedJobCard";
import ArticleSection from "../../../components/Home/ArticleSection";
import primaryStar from "../../../assets/images/primary-star.png";
import {history} from "../../../helpers";

function SeekerDashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dashboardDt, setDashboardDt] = useState({});
  const [topCompanies, setTopCompanies] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [activeJobs, setActiveJobs] = useState([]);

  const retrieveActiveJobs = useCallback(() => {
    dispatch(applyJobActions.get({ is_active: 1, limit: 4 })).then((res) =>
      setActiveJobs(res.payload)
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProgress(30));

    const fetchTopCom = async () => await TopCompanyService.all();

    const fetchData = async () => await SeekerDashboardDataService.get();

    fetchTopCom().then((r) => setTopCompanies(r.data));

    fetchData().then((r) => setDashboardDt(r.data));

    retrieveActiveJobs();

    setLoading(false);

    dispatch(setProgress(100));
    // eslint-disable-next-line
  }, []);

  const handleClickCompany = (uuid) => {
    history.navigate(`companies/${uuid}/details`);
  };

  return (
    <Grid container spacing={3}>
      <SEO title="Job Seeker Dashboard" />
      <Grid item xs={12}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ borderRadius: "10px", padding: 5 }}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} md={4} lg={4}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: "8px",
                        }}
                      >
                        <CardContent
                          sx={{
                            borderStyle: "solid",
                            background: "#D6F0FA",
                            borderColor: "#D6F0FA",
                            borderRadius: "8px 8px 0 0",
                            borderWidth: "0.5 0.5px 0 0.5px",
                          }}
                        >
                          <Typography
                            fontSize="16px"
                            fontWeight={500}
                            component="div"
                            sx={{ textAlign: "center" }}
                          >
                            Total Jobs Applied
                          </Typography>
                        </CardContent>
                        <CardContent
                          sx={{
                            borderRadius: "0 0 8px 8px",
                            borderWidth: "0 0.5px 0.5px 0.5px",
                            borderColor: "#EBEBEB",
                            borderStyle: "solid",
                          }}
                        >
                          <Typography
                            variant="h5"
                            fontWeight={500}
                            align="center"
                            py={2}
                          >
                            {!loading ? (
                              dashboardDt.applied_jobs_cnt
                            ) : (
                              <Skeleton width="50px" />
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: "8px",
                        }}
                      >
                        <CardContent
                          sx={{
                            borderStyle: "solid",
                            background: "#FFEDDC",
                            borderColor: "#FFEDDC",
                            borderRadius: "8px 8px 0 0",
                            borderWidth: "0.5 0.5px 0 0.5px",
                          }}
                        >
                          <Typography
                            variant="span"
                            fontSize="16px"
                            fontWeight={500}
                            component="div"
                            align="center"
                          >
                            Profile Views
                          </Typography>
                        </CardContent>
                        <CardContent
                          sx={{
                            borderRadius: "0 0 8px 8px",
                            borderWidth: "0 0.5px 0.5px 0.5px",
                            borderColor: "#EBEBEB",
                            borderStyle: "solid",
                          }}
                        >
                          <Typography
                            variant="h5"
                            fontWeight={500}
                            align="center"
                            py={2}
                          >
                            {!loading ? (
                              dashboardDt.view_cnt
                            ) : (
                              <Skeleton width="50px" />
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: "8px",
                        }}
                      >
                        <CardContent
                          sx={{
                            borderStyle: "solid",
                            background: "#DCE9FE",
                            borderColor: "#DCE9FE",
                            borderRadius: "8px 8px 0 0",
                            borderWidth: "0.5 0.5px 0 0.5px",
                          }}
                        >
                          <Typography
                            variant="span"
                            fontSize="16px"
                            fontWeight={500}
                            component="div"
                            align="center"
                          >
                            Job Notification
                          </Typography>
                        </CardContent>
                        <CardContent
                          sx={{
                            borderRadius: "0 0 8px 8px",
                            borderWidth: "0 0.5px 0.5px 0.5px",
                            borderColor: "#EBEBEB",
                            borderStyle: "solid",
                          }}
                        >
                          <Typography
                            variant="h5"
                            fontWeight={500}
                            align="center"
                            py={2}
                          >
                            {!loading ? (
                              dashboardDt.notification_cnt
                            ) : (
                              <Skeleton width="50px" />
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ borderRadius: "10px", padding: 5 }}>
                  <Grid container>
                    <Grid item xs={12} sm={2.5}>
                      <Stack
                        spacing={2}
                        sx={{
                          alignItems: {xs: "center", sm: "flex-start"},
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <Typography fontWeight={600}>
                          Profile Strength
                        </Typography>
                        <CircularProfileProgress
                          progress={user?.progress ?? 0}
                        />
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={7}
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: {xs: 'center', sm: 'start'} }}>
                        <Typography fontSize="14px">
                          Your profile requires some critical information which
                          will help recruiters to shortlist you
                        </Typography>
                        <Button
                          component={RouterLink}
                          to="/seekers/profile"
                          sx={{
                            background:
                              "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                            color: "white",
                            mt: 2,
                            maxWidth: {xs: "100%", sm: "35%"},
                            fontSize: "14px",
                          }}
                        >
                          Update Profile
                        </Button>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                        display: {xs: "none", sm: "flex"},
                      }}
                    >
                      <img src={PercentImg} alt="percent" />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{ borderRadius: "10px", padding: 5, minHeight: "344px" }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontWeight={500}>
                      Active Applications
                    </Typography>
                    <Link
                      component={RouterLink}
                      underline="hover"
                      to="/seekers/applied-jobs"
                      sx={{ fontSize: "14px" }}
                    >
                      Show All >>
                    </Link>
                  </Stack>
                  <Grid container spacing={2} marginTop={2}>
                    {activeJobs.length > 0 ? (
                      activeJobs.map((activeJob) => (
                        <Grid item xs={12} md={6} key={activeJob.uuid}>
                          <AppliedJobCard
                            data={activeJob}
                            forDashboard={true}
                          />
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography fontWeight={500}>
                          There is no applications.
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Box
            component={Grid}
            item
            display={{ xs: "none", md: "flex" }}
            xs={3}
            sx={{
              height: "100%",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <Paper
              elevation={2}
              sx={{ borderRadius: "10px", width: "92%", height: "100%", pt: 3 }}
            >
              <Stack
                sx={{
                  justifyContent: "space-evenly",
                  alignItems: "space-evenly",
                  display: "flex",
                  minHeight: "100%",
                }}
                direction="column"
              >
                <Stack
                  spacing={1}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography fontWeight={500}>Top Companies</Typography>
                  <img src={primaryStar} alt="primary star" width="100px" />
                </Stack>
                {topCompanies.length > 0 &&
                  !loading &&
                  topCompanies.map((company, index) => (
                    <Card
                      key={company.uuid}
                      sx={{
                        borderRadius: "0px",
                        borderBottomLeftRadius:
                          topCompanies.length !== index + 1 ? "0px" : "10px",
                        borderBottomRightRadius:
                          topCompanies.length !== index + 1 ? "0px" : "10px",
                      }}
                      elevation={0}
                    >
                      <CardActionArea
                        sx={{ minHeight: "135px" }}
                        onClick={() =>
                          handleClickCompany(company?.company?.uuid)
                        }
                      >
                        <CardContent>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ alignItems: "center", display: "flex" }}
                          >
                            <Avatar
                              alt={`${company?.name}`}
                              src={`${company?.logo}`}
                              variant="rounded"
                              sx={{ height: 70, width: 70 }}
                            />
                            <Box sx={{ maxHeight: "70px", overflow: "hidden" }}>
                              <Typography>{company?.name}</Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                      {topCompanies.length !== index + 1 ? (
                        <Divider sx={{ borderColor: "#DADADA" }} />
                      ) : null}
                    </Card>
                  ))}
              </Stack>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ borderRadius: "10px", px: 5 }}>
          <ArticleSection isShowBorder={false} isShowBtn={false} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SeekerDashboard;
