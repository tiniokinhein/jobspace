import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  Link,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import SEO from "../../../components/Common/SEO";
import { whitelistActions } from "../../../store";
import { setProgress } from "../../../store/slices/progress";
import { useDispatch } from "react-redux";
import StyledPagination from "../../../components/Common/StyledPagination";
import LocationIcon from "../../../assets/icons/Location.png";
import JobTypeIcon from "../../../assets/icons/JobTypes.png";
import BasicSalaryIcon from "../../../assets/icons/BasicSalary.png";
import WhitelistJob from "../../../components/Job/WhitelistJob";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const Whitelist = () => {
  const limit = 5;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [loading, setLoading] = useState(true);
  const [whitelistChange, setWhitelistChange] = useState(false);

  const handlePageChange = (event, value) => {
    setPageCnt(value);
  };

  const retrieveJobs = useCallback(
    (pageCnt) => {
      dispatch(
        whitelistActions.all({
          limit: limit,
          offset: (pageCnt - 1) * limit,
        })
      ).then((res) => {
        const response = res.payload;

        const limit = response.metadata.info?.limit;
        const total = response.metadata.info?.total;

        setTotal(total);
        setJobs(response.data);
        setCount(Math.ceil(total / limit));

        setLoading(false);

        dispatch(setProgress(100));
      });
    },
    // eslint-disable-next-line
    [dispatch]
  );

  useEffect(() => {
    retrieveJobs(pageCnt);

    // eslint-disable-next-line
  }, [pageCnt, whitelistChange]);

  const handleApply = (uuid) => {
    navigate(`/jobs/${uuid}/detail`);
  };

  return (
    <Box>
      <SEO title="My Wishlists" />
      <Grid container>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              background: "#FFFFFF",
              boxShadow:
                "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              mx: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 2, sm: 4 },
              py: 3,
            }}
          >
            <Typography
              sx={{
                color: "#195DCC",
                fontSize: "24px",
                fontWeight: "400",
              }}
            >
              Wishlists
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          {!loading &&
            jobs.length > 0 &&
            jobs.map((job) => {
              return (
                <Paper
                  sx={{
                    m: 2,
                    borderRadius: "10px",
                    boxShadow: job.is_highlight ? 5 : 1,
                    backgroundColor: job.is_highlight ? "#8ED8F8" : "white",
                  }}
                  key={job.uuid}
                >
                  <Stack spacing={2} alignItems="flex-end">
                    {job.is_urgent &&
                      <Button
                        sx={{
                          position: "absolute",
                          display: "inline-block",
                          fontSize: "12px",
                          fontWeight: 600,
                          borderTopRightRadius: "10px",
                          borderTopLeftRadius: "0px",
                          borderBottomLeftRadius: "25px 20px",
                          borderBottomRightRadius: "0px",
                        }}
                        variant="contained"
                        color="error"
                      >
                        Urgent Hiring
                      </Button>
                    }
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ px: 3, pt: 1.5, width: "100%" }}
                    >
                      <Card sx={{ height: 90, width: 90, borderRadius: "8px" }}>
                        <CardMedia component="img" image={job.company_logo} />
                      </Card>
                      <Stack
                        direction="column"
                        sx={{
                          minHeight: 80,
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                      >
                        <Typography
                          fontWeight={600}
                          fontSize="18px"
                          color="#000"
                        >
                          <Link underline="hover" component={RouterLink} color="inherit" to={`/jobs/${job.uuid}/detail`}>
                            {job?.job_title}
                          </Link>
                        </Typography>
                        <Typography
                          fontWeight={500}
                          fontSize="14px"
                          color="#525252"
                        >
                          <Link underline="hover" component={RouterLink} color="inherit" to={`/companies/${job.company_id}/details`}>
                            {job?.company_name}
                          </Link>
                        </Typography>
                        <Typography
                          fontWeight={500}
                          fontSize="14px"
                          color="#525252"
                          align="left"
                        >
                          Posted on {job.posted_at}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{
                        px: 3,
                        pb: 3,
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                      spacing={1}
                    >
                      <Stack direction="row" spacing={1}>
                        <StyledChip
                          icon={
                            <Avatar
                              src={JobTypeIcon}
                              sx={{ height: 20, width: 20 }}
                            />
                          }
                          label={job?.job_type}
                        />

                        <StyledChip
                          icon={
                            <Avatar
                              src={BasicSalaryIcon}
                              sx={{ height: 20, width: 20 }}
                            />
                          }
                          label={job?.salary}
                        />

                        <StyledChip
                          icon={
                            <Avatar
                              src={LocationIcon}
                              sx={{ height: 20, width: 20 }}
                            />
                          }
                          label={job?.address}
                        />
                      </Stack>

                      <Stack direction="row" spacing={1}>
                        <WhitelistJob
                          jobUuid={job.uuid}
                          isChecked={job.is_whitelisted}
                          isWhitelist={true}
                          setWhiteListChange={setWhitelistChange}
                        />
                        <Button
                          sx={{
                            width: "100px",
                            minHeight: "20px",
                            height: "35px",
                            background:
                              "linear-gradient(274.94deg, #FF9635 -12.35%, #FFD15C 116.67%)",
                          }}
                          disabled={job.is_applied}
                          variant="contained"
                          onClick={() => handleApply(job.uuid)}
                          size="small"
                        >
                          {job.is_applied ? t("applied") : t("apply")}
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Paper>
              );
            })}

          {!loading && jobs.length < 1 && (
            <Paper sx={{ m: 2, borderRadius: "10px", p: 3 }}>
              <Typography>There is no whitelists.</Typography>
            </Paper>
          )}

          {!loading && total > limit && (
            <Box mt="20px" display="flex" justifyContent="center">
              <StyledPagination
                count={count}
                pageCnt={pageCnt}
                handlePageChange={handlePageChange}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const StyledChip = styled(Chip)(() => ({
  borderRadius: "8px",
  backgroundColor: "#ffdfca",
  color: "#FF9635",
  fontWeight: 500,
}));

export default Whitelist;
