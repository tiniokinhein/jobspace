import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SimilarJobDataService from "../../services/similar.jobs.service";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const SimilarJobs = ({ uuid, title }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    (async () => {
      if (uuid) {
        await SimilarJobDataService.getByUuid(uuid, { limit: 4, page: 1 }).then(
          (r) => {
            if (r?.metadata?.info?.total > 4) {
              setShowMore(true);
            }
            setSimilarJobs(r?.data);
            setLoading(false);
          }
        );
      }
    })();
  }, [uuid]);

  const handleShowMore = () => {
    navigate(`/find-jobs?similar=${title}`);
  };

  const url = process.env.REACT_APP_API_URL + "/companies";

  return (
    <Fragment>
      {Object.keys(similarJobs).length > 0 && (
        <Grid item xs={12} sm={6} md={12}>
          <Box
            sx={{
              minWidth: "100%",
              maxWidth: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              Similar Jobs
            </Typography>

            {!loading && (
              <Stack spacing={1}>
                {similarJobs.map((similarJob) => {
                  return (
                    <Paper
                      elevation={2}
                      sx={{ my: 1, py: 3, borderRadius: "10px" }}
                      key={similarJob.uuid}
                    >
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems="center"
                        alignContent={"center"}
                        sx={{ px: "14px" }}
                      >
                        <Box>
                          {similarJob.company?.logo && (
                            <Avatar
                              alt={similarJob.company?.company_name}
                              src={`${url}/logo/${
                                similarJob.company?.logo ?? null
                              }`}
                              sx={{ width: 56, height: 56 }}
                            />
                          )}
                        </Box>

                        <Stack direction="column" spacing={0.5}>
                          <Typography
                            sx={{
                              color: "#195DCC",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            <Link
                              component={RouterLink}
                              to={`/jobs/${similarJob.uuid}/detail`}
                              underline="hover"
                            >
                              {similarJob.job_title ?? "---"}
                            </Link>
                          </Typography>
                          <Typography
                            sx={{
                              color: "#585858",
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          >
                            {similarJob.company?.company_name ?? "---"}
                          </Typography>
                          <Typography
                            sx={{
                              pt: 1,
                              color: "#585858",
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                          >
                            {similarJob.company?.region?.title ?? null}&nbsp;
                            {similarJob.job_type
                              ? `(${similarJob.job_type.title})`
                              : null}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  );
                })}

                {showMore && (
                  <Box
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        px: 3,
                        right: "10px",
                        background:
                          "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                        borderRadius: "10px",
                        width: "70%",
                      }}
                      onClick={handleShowMore}
                    >
                      See More Jobs
                    </Button>
                  </Box>
                )}
              </Stack>
            )}
          </Box>
        </Grid>
      )}
    </Fragment>
  );
};

export default SimilarJobs;
