import React, { useCallback, useEffect } from "react";
import { Avatar, Box, Grid, Link, Stack, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import UserAppliedChart from "../../Common/UserAppliedChart";
import JobDescription from "../../JobDetail/JobDescription";
import JobInfoPieChart from "../../Common/JobInfoPieChart";
import PieChartInfo from "../../Common/PieChartInfo";
import { useDispatch, useSelector } from "react-redux";
import { recruitmentActions } from "../../../store";

const Overview = ({ overview }) => {
  const dispatch = useDispatch();
  const { analysis } = useSelector((state) => state.recruitment);

  const fetchAnalysis = useCallback(() => {
    dispatch(recruitmentActions.getAnalysis(overview.uuid));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    fetchAnalysis();
  }, [fetchAnalysis]);

  return (
    <Box
      sx={{
        my: 2,
        borderRadius: "10px",
        background: "#ffffff",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      flexGrow={1}
    >
      <Grid container sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={1.5} item xs={12}>
          <Grid item xs={12} sm={5}>
            <Typography
              width={{ xs: "100%" }}
              fontSize="18px"
              fontWeight={400}
              sx={{ wordWrap: "break-word" }}
            >
              <Link underline="always">{overview?.job_title}</Link>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            display="flex"
            justifyContent="start"
            alignItems="start"
          >
            <Box
              sx={{
                background: "#FFF0E3",
                border: "1px solid #FF9635",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                height: "31px",
                minWidth: "120px",
                mr: 1,
              }}
            >
              <Visibility
                sx={{
                  mr: 1,
                  background: "#FF9635",
                  color: "#FFFFFF",
                  fontSize: "14px",
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: 400,
                }}
                component="span"
              >
                {overview?.view_count ?? 0} views
              </Typography>
            </Box>

            <Box
              sx={{
                background: "#E7FEED",
                border: "1px solid #09962F",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "auto",
                height: "31px",
                minWidth: "185px",
              }}
            >
              <Visibility
                sx={{
                  mr: 1,
                  background: "#FF9635",
                  color: "#FFFFFF",
                  fontSize: "14px",
                }}
              />
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "14px" }, fontWeight: 400 }}
              >
                {overview?.analysis?.applied ?? 0} Total Applications
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Typography fontSize="13px" color="#A1A1A1" sx={{ mr: 1 }}>
              Posted: {overview.posted_date}{" "}
              {overview.time && `(${overview.time}) |`}
            </Typography>
            <Typography fontSize="13px" color="#A1A1A1">
              {overview.expired_date && `Expired: ${overview.expired_date}`}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            pt: 5,
          }}
        >
          <Box
            sx={{
              width: "187px",
              height: "56px",
              borderRadius: "5px",
              border: "1px solid #FF9635",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography align="center" fontWeight={500}>
              Total Applications
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            paddingTop: 4,
          }}
        >
          <UserAppliedChart data={overview.chart ?? []} />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ p: { xs: 2, sm: 3 } }}
        spacing={{ xs: 2, md: 2 }}
        display="flex"
        flexDirection={{ xs: "column-reverse", sm: "row" }}
      >
        <Grid item xs={12} md={6} xl={7}>
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              minHeight: "678px",
              borderRadius: "10px",
              border: "1px solid #EBEBEB",
            }}
          >
            <Stack spacing={2}>
              <Stack spacing={2}>
                <Typography
                  color="primary"
                  width={{ xs: "100%" }}
                  sx={{
                    textDecoration: "underline",
                    fontSize: "18px",
                    fontWeight: 500,
                    wordWrap: "break-word",
                  }}
                >
                  {overview.job_title}
                </Typography>
                <Stack direction="row">
                  <Typography fontSize="16px" width="50%">
                    Location
                  </Typography>
                  <Typography fontSize="16px" width="50%">
                    {overview.region ?? "---"}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography fontSize="16px" width="50%">
                    Employment Type
                  </Typography>
                  <Typography fontSize="16px" width="50%">
                    {overview.employment_type ?? "---"}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography fontSize="16px" width="50%">
                    Minimum Qualification
                  </Typography>
                  <Typography fontSize="16px" width="50%">
                    {overview.qualifications ?? "---"}
                  </Typography>
                </Stack>
              </Stack>
              <JobDescription
                description={overview.job_description}
                title="Job Description"
              />
              <JobDescription
                description={overview.job_specification}
                title="Job Specification (Job Requirements)"
              />
              <Stack>
                <Typography
                  sx={{
                    py: 2,
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "#333333",
                    textDecoration: "underline",
                  }}
                >
                  What Else Can We Offer
                </Typography>

                <Typography>{overview?.jobPostOffers ?? "---"}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} xl={5}>
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid #EBEBEB",
              p: { xs: 2, sm: 3 },
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography fontSize="16px">
                  This chart indicates the total applications split into their
                  various statuses.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  fontSize="16px"
                  textAlign="center"
                  sx={{ display: { xs: "block", sm: "none" } }}
                >
                  Total Applies:&nbsp;{overview?.analysis?.applied}
                </Typography>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} display="flex" flexDirection="row">
                  <JobInfoPieChart data={analysis} />
                  <Avatar
                    sx={{
                      width: 106,
                      height: 106,
                      backgroundColor: "#FFE15A",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography
                        component="span"
                        align="center"
                        color="#000000"
                      >
                        Total
                        <br />
                        Applies:
                      </Typography>
                      <Typography
                        component="span"
                        align="center"
                        color="#000000"
                        fontWeight={700}
                        fontSize="18px"
                      >
                        {overview?.analysis?.applied}
                      </Typography>
                    </Stack>
                  </Avatar>
                </Grid>
                <Grid item xs={12}>
                  <PieChartInfo analysis={analysis} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;