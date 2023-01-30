import React, { Fragment, useCallback, useEffect, useState } from "react";
import SEO from "../../../components/Common/SEO";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { setProgress } from "../../../store/slices/progress";
import { jobsActions } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import JobDescription from "../../../components/JobDetail/JobDescription";
import { helper } from "../../../helpers";

const JobPostDetail = () => {
  const dispatch = useDispatch();
  const { jobPostId } = useParams();
  const [loading, setLoading] = useState(false);
  const { job } = useSelector((state) => state.jobs);

  const fetchJobPost = useCallback(() => {
    dispatch(setProgress(50));
    if (jobPostId) {
      dispatch(jobsActions.getDataByUuid(jobPostId)).then((res) => {
        dispatch(setProgress(100));
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    fetchJobPost();
  }, [fetchJobPost]);

  return (
    <Fragment>
      {!loading && (
        <Box
          sx={{
            background: "white",
            borderRadius: "10px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SEO title="Post Job" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                py: 3,
                px: 4,
              }}
            >
              <Typography variant="h5" color="primary">
                Job Post Detail
              </Typography>
              <Button
                variant="text"
                startIcon={<BorderColorIcon />}
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                }}
                component={RouterLink}
                to={`/employers/posted-jobs/${jobPostId}/edit`}
              >
                Edit
              </Button>
            </Box>
            <Divider />
            <Grid
              container
              alignItems="center"
              sx={{
                px: 4,
                py: 3,
              }}
            >
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Job Title
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.job_title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Industry
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.industry?.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Employment Type
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.job_type?.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Vacancy
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.vacancy} Post
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Qualifications
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {job.qualifications &&
                          job.qualifications.length > 0 &&
                          job.qualifications.map((qualification, index) => {
                            return (
                              <Typography
                                variant="body1"
                                component="span"
                                key={qualification.uuid}
                              >
                                {qualification?.qualification?.title}
                                {job.qualifications.length !== index + 1 &&
                                  ", "}
                              </Typography>
                            );
                          })}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Experience
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.experience_length?.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Job Category
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.job_category?.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Job Role
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.job_role?.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Open To
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.gender === 3
                            ? "Male / Female"
                            : job?.gender === 2
                            ? "Female"
                            : "Male"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Job Description
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            padding: "0.2rem 0.5rem",
                            margin: "0 0.2rem",
                            whiteSpace: "wrap",
                            background: "#F1F1F1",
                            border: "1px solid #E1E1E1",
                            borderRadius: "4px",
                          }}
                        >
                          <JobDescription description={job?.job_description} />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Job Specification (Job Requirements)
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            padding: "0.2rem 0.5rem",
                            margin: "0 0.2rem",
                            whiteSpace: "wrap",
                            background: "#F1F1F1",
                            border: "1px solid #E1E1E1",
                            borderRadius: "4px",
                          }}
                        >
                          <JobDescription
                            description={job?.job_specification}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Work Location
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job.township?.title && `${job.township?.title}`}
                          {job.region?.title && `, ${job.region?.title}`}
                          {job.country?.title && `, ${job.country?.title}`}
                          {job.address && `, ${job.address}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Salary
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job.salary_type === 1 && "Negotiate"}
                          {job.salary_type === 2 && "Confidential"}
                          {job.salary_type === 3 &&
                            `${helper.nFormat(job.min_salary)} ${
                              helper.nFormat(job.max_salary) &&
                              ` - ${helper.nFormat(job.max_salary)}`
                            } ${job.currency?.name}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Offer
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.job_post_offers &&
                            (job?.job_post_offers).length > 0 &&
                            (job?.job_post_offers).map(
                              (jobPostOffer, index) => {
                                return (
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    key={jobPostOffer.uuid}
                                  >
                                    {jobPostOffer?.offer?.title}
                                    {job.job_post_offers.length !== index + 1 &&
                                      ", "}
                                  </Typography>
                                );
                              }
                            )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Additional Questions
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job.job_post_additional_questions &&
                          job.job_post_additional_questions.length > 0
                            ? job.job_post_additional_questions.map(
                                (additionalQuestion, index) => {
                                  return (
                                    <Typography
                                      variant="body1"
                                      component="span"
                                      key={additionalQuestion.uuid}
                                    >
                                      {additionalQuestion?.question}
                                      {job.job_post_additional_questions
                                        .length !==
                                        index + 1 && ", "}
                                    </Typography>
                                  );
                                }
                              )
                            : "---"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography variant="body1" fontWeight={500}>
                          Publish Date
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5}>
                        <Typography variant="body1" component="span">
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          {job?.posted_date ? job?.posted_date : "---"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default JobPostDetail;