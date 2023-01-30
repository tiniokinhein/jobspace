import React, {useCallback, useEffect, useState} from "react";
import {Button, Container, Grid, Paper, Stack, Typography,} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {useNavigate, useParams} from "react-router-dom";
import JobsDataService from "../../services/jobs.service";
import {history} from "../../helpers";
import JobInfo from "../../components/JobDetail/JobInfo";
import JobDescription from "../../components/JobDetail/JobDescription";
import CompanyInfo from "../../components/JobDetail/CompanyInfo";
import JobPostShare from "../../components/FindJob/JobPostShare";
import Notice from "../../components/JobDetail/Notice";
import SimilarJobs from "../../components/JobDetail/SimilarJobs";
import {useDispatch, useSelector} from "react-redux";
import TopAd from "../../components/JobDetail/TopAd";
import CompanyHeader from "../../components/JobDetail/CompanyHeader";
import WhitelistJob from "../../components/Job/WhitelistJob";
import {authActions} from "../../store";
import JobApplyDialog from "../../components/Common/JobApplyDialog";
import {useTranslation} from "react-i18next";
import IndustryList from "../../components/Home/IndustryList";
import { setProgress } from "../../store/slices/progress";
import SEO from "../../components/Common/SEO";

export default function JobDetails() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobDetail, setJobDetail] = useState({});
  const [warn, setWarn] = useState(false);
  const [open, setOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const retrieveResume = useCallback(() => {
    if (isLoggedIn) {
      dispatch(authActions.getUser()).then(res => {
        if (!res.payload.data?.job_seeker) {
          setWarn(true);
          setOpen(true);
          setIsProfile(true);
        } else if (res.payload.data?.progress <= 60) {
          setWarn(true);
          setOpen(true);
        }

        if (!res.payload) {
          setWarn(true);
          setOpen(true);
        }
      });
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProgress(0));
    retrieveResume();
    dispatch(setProgress(30));
    (async () => {
      await JobsDataService.getByUuid(params.jobId)
        .then((r) => {
          setJobDetail(r.data);
        })
        .catch((e) => {
          if (e.response.status === 404) history.navigate("/404");
        });
    })().then(() => dispatch(setProgress(100)));
    // eslint-disable-next-line
  }, [params.jobId]);

  const handleApply = (uuid) => {
    if (warn) {
      setOpen(true);
    } else {
      if (isLoggedIn) {
        navigate(`/jobs/${uuid}/apply`);
      } else {
        navigate("/seekers/sign-in");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <SEO 
        title={jobDetail.job_title} 
        description={jobDetail.job_description}
      />
      <TopAd />

      <CompanyHeader jobDetail={jobDetail} />

      <Grid item xs={12} py="26px">
        <Container maxWidth="xl">
          <Grid
            container
            px={{ lg: "30px", xl: 0 }}
            sx={{ justifyContent: "space-between" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={9.1}
              paddingRight={{ xs: 0, md: "14px" }}
            >
              <Paper
                sx={{
                  borderRadius: "10px",
                  px: { xs: "10px", md: 4 },
                  py: 4,
                }}
                elevation={2}
              >
                <Grid container spacing={3}>
                  <Grid item xs={8} sm={8}>
                    <Stack
                      spacing={1}
                      sx={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Typography fontSize="24px" fontWeight={600}>
                        {jobDetail.job_title ?? "---"}
                      </Typography>

                      <Typography
                        fontSize="13px"
                        fontWeight={500}
                        color="secondary"
                      >
                        {jobDetail.company?.company_name ?? "---"}
                      </Typography>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <RemoveRedEyeIcon color="primary" fontSize="12px" />
                          &nbsp;
                          <Typography
                            fontSize="14px"
                            color="#A1A1A1"
                            fontWeight={400}
                          >
                            Total Views&nbsp;:&nbsp;
                            <span>{jobDetail.reads ?? 0}</span>
                          </Typography>
                        </Stack>
                      </Stack>

                      {jobDetail.is_expire && (
                        <Typography
                          component="span"
                          fontSize="14px"
                          color="error"
                          fontWeight={500}
                        >
                          This job is no longer available.
                        </Typography>
                      )}

                      {jobDetail.is_expire}
                    </Stack>
                  </Grid>

                  <Grid item xs={4} sm={4}>
                    <Grid container sx={{ minHeight: "60px" }} spacing={2}>
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={12}
                        lg={4}
                        alignItems="flex-start"
                        justifyContent="flex-end"
                      >
                        <Stack
                          direction="row"
                          display="flex"
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <WhitelistJob
                            jobUuid={jobDetail.uuid}
                            isChecked={jobDetail.is_whitelisted}
                          />
                          <JobPostShare title={jobDetail.job_title} />
                        </Stack>
                      </Grid>

                      <Grid
                        item
                        xs={8}
                        sm={8}
                        md={12}
                        lg={8}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            px: 3,
                            right: "10px",
                            background: jobDetail.is_expire ? "white" : "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                            borderRadius: "10px",
                            height: "52px",
                          }}
                          onClick={() => handleApply(jobDetail.uuid)}
                          disabled={warn || jobDetail.is_applied || jobDetail.is_expire}
                        >
                          {jobDetail.is_applied ? t("applied") : t("apply")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} />
                </Grid>

                <Grid container>
                  <Grid item xs={12}>
                    <JobInfo data={jobDetail} />
                  </Grid>

                  <Grid item xs={12}>
                    <JobDescription
                      description={jobDetail.job_description}
                      title="Job Description"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <JobDescription
                      description={jobDetail.job_specification}
                      title="Job Specification (Job Requirements)"
                    />
                  </Grid>

                  {jobDetail?.job_post_offers &&
                    (jobDetail?.job_post_offers).length > 0 && (
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            py: 2,
                            fontSize: "18px",
                            fontWeight: 500,
                            color: "#333333",
                            textDecoration: "underline",
                          }}
                        >
                          Offer
                        </Typography>
                        <Typography>
                          {jobDetail?.job_post_offers &&
                            (jobDetail?.job_post_offers).length > 0 &&
                            (jobDetail?.job_post_offers).map(
                              (jobPostOffer, index) => {
                                return (
                                  <Typography
                                    fontSize="14px"
                                    component="span"
                                    key={jobPostOffer.uuid}
                                  >
                                    {jobPostOffer?.offer?.title}
                                    {jobDetail.job_post_offers.length !==
                                      index + 1 && ", "}
                                  </Typography>
                                );
                              }
                            )}
                        </Typography>
                      </Grid>
                    )}

                  {jobDetail.offer && (
                    <Grid item xs={12}>
                      <Typography fontSize="16px" fontWeight={500}>
                        We Can Offer
                      </Typography>
                      <Typography fontSize="14px">{jobDetail.offer}</Typography>
                    </Grid>
                  )}

                  {jobDetail.company && (
                    <Grid item xs={12}>
                      <CompanyInfo data={jobDetail.company} />
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={2.8}
              alignItems="flex-start"
              justifyContent="flex-end"
              display="flex"
            >
              <Grid
                container
                alignItems={{ xs: "start", md: "flex-end" }}
                justifyContent="flex-end"
                display="flex"
                spacing={3}
              >
                <Notice warn={warn} />

                <SimilarJobs
                  uuid={jobDetail.uuid}
                  title={jobDetail.job_title}
                />
                <Grid item xs={12} sm={6} md={12}>
                  <IndustryList />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <JobApplyDialog
        open={open}
        handleClose={handleClose}
        isProfile={isProfile}
      />
    </Grid>
  );
}
