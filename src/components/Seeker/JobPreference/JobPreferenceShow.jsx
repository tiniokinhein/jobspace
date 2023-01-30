import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { helper } from "../../../helpers";

const JobPreferenceShow = ({ data }) => {
  return (
    <Fragment>
      {Object.keys(data).length > 0 && (
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
        >
          <Grid container item xs={12} md={8} sx={{ py: 1 }} spacing={4}>
            <Grid item sm={4} md={4} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                Preferred Industries
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                :
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{py: 1}}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
              >
                {data?.preferred_industries &&
                (data?.preferred_industries).length > 0
                  ? data.preferred_industries.map((item, index) => {
                      if (index + 1 === data.preferred_industries.length) {
                        return item.title;
                      } else {
                        return item.title + ", ";
                      }
                    })
                  : "---"}
              </Typography>
            </Grid>

            <Grid item sm={4} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                Preferred Categories
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={6} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
              >
                {data?.preferred_job_categories &&
                (data?.preferred_job_categories).length > 0
                  ? data.preferred_job_categories.map((item, index) => {
                      if (index + 1 === data.preferred_job_categories.length) {
                        return item.title;
                      } else {
                        return item.title + ", ";
                      }
                    })
                  : "---"}
              </Typography>
            </Grid>

            <Grid item sm={4} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                Preferred Job Title
              </Typography>
            </Grid>
            <Grid item sm={1} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={6} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
              >
                {data.job_title}
              </Typography>
            </Grid>

            <Grid item sm={4} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                Employment Type
              </Typography>
            </Grid>
            <Grid item sm={1} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={6} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
              >
                {data?.job_type?.title}
              </Typography>
            </Grid>

            <Grid item sm={4} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                Expected Salary
              </Typography>
            </Grid>
            <Grid item sm={1} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
              >
                :
              </Typography>
            </Grid>
            <Grid item sm={6} sx={{ py: 1 }}>
              <Typography
                sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
              >
                {helper.nFormat(data?.salary ?? "")}&nbsp;{data?.currency?.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8}>
            <Button
              variant="text"
              startIcon={<BorderColorIcon />}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
              }}
              component={RouterLink}
              to="/seekers/job-preferences/create"
            >
              Edit Job Preferences
            </Button>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default JobPreferenceShow;