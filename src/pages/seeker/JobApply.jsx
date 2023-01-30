import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import JobsDataService from "../../services/jobs.service";
import { useDispatch } from "react-redux";
import CompanyCard from "../../components/ApplyJob/CompanyCard";
import SeekerInfoCard from "../../components/ApplyJob/SeekerInfoCard";
import JobInfo from "../../components/ApplyJob/JobInfo";
import ApplyJobSuccess from "./dashboard/ApplyJobSuccess";
import { history } from "../../helpers";
import JobApplyDialog from "../../components/Common/JobApplyDialog";
import { setProgress } from "../../store/slices/progress";
import { authActions } from "../../store";

const JobApply = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isApplied, setIsApplied] = useState(false);

  const [warn, setWarn] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    dispatch(authActions.getUser()).then((res) => {
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
    // eslint-disable-next-line
  }, [dispatch]);

  const [jobDetail, setJobDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      dispatch(setProgress(50));
      await JobsDataService.getByUuid(params.jobId)
        .then((r) => {
          setJobDetail(r.data);
          setIsApplied(r.data.is_applied);
          setLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 404) history.navigate("/404");
        });
    })();

    dispatch(setProgress(100));
    // eslint-disable-next-line
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = (value) => {
    setIsApplied(value);
  };

  return (
    <Container maxWidth="xl">
      <Box padding={{ lg: "0px 30px", xl: 0 }}>
        {isApplied ? (
          <ApplyJobSuccess jobDetail={jobDetail} />
        ) : (
          !loading && (
            <Grid container px={{ lg: "30px", xl: 0 }} py={3}>
              <Grid item xs={12} sm={12} md={3}>
                <CompanyCard jobDetail={jobDetail} loading={loading} />
              </Grid>

              <Grid container item xs={12} md={9} pl={{ sm: 0, md: "26px" }}>
                <Grid item xs={12} sm={12} pt={{ xs: "26px", md: 0 }}>
                  <SeekerInfoCard />
                </Grid>
                {!warn && (
                  <Grid item xs={12} sm={12}>
                    <JobInfo
                      uuid={jobDetail.uuid}
                      handleApply={handleApply}
                      additionalQuestions={
                        jobDetail?.job_post_additional_questions ?? []
                      }
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )
        )}
        <JobApplyDialog
          open={open}
          handleClose={handleClose}
          isProfile={isProfile}
        />
      </Box>
    </Container>
  );
};

export default JobApply