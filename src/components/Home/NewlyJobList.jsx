import React, {useEffect, useState} from "react";
import {Card, CardActionArea, Grid, Typography,} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import JobsDataService from "../../services/jobs.service";
import TitleComponent from "../Common/TitleComponent";

const NewlyJobList = () => {
  const [newlyJobs, setNewlyJobs] = useState({});

  useEffect(() => {
    (async () => {
      await JobsDataService.get({ newly_jobs: 1 }).then((res) =>
        setNewlyJobs(res.data)
      );
    })();
  }, []);

  return (
    <Grid
      item
      xs={12}
      minHeight="120px"
      display="flex"
      py={3}
      width="100%"
      px={{ lg: "30px", xl: 0 }}
    >
      <Grid container>
        <Grid item xs={12} width="100%" display="flex">
          <TitleComponent title="newly_jobs" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} py="20px" className="interest-job-grid">
            {newlyJobs.length > 0 &&
              newlyJobs.map((newlyJob) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={newlyJob.uuid}
                  className="paper-wrapper"
                >
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: "105px",
                      borderRadius: "7px",
                      "&:hover": {
                        boxShadow: 3,
                      },
                    }}
                    className="child-paper"
                  >
                    <CardActionArea
                      sx={{ p: 3 }}
                      to={`/jobs/${newlyJob.uuid}/detail`}
                      component={RouterLink}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={400}
                        color="primary"
                        sx={{ maxWidth: "95%", textOverflow: "ellipsis" }}
                        noWrap={true}
                      >
                        {newlyJob.job_title}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize={"1rem"}
                        color="text.secondary"
                        fontWeight={400}
                        mt={1.5}
                      >
                        {newlyJob.company?.company_name}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewlyJobList;
