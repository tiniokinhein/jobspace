import React, { useEffect, useState } from "react";
import { Box, Grid, Link, Pagination, styled, Typography } from "@mui/material";
import SuggestedJobsService from "../../services/suggest.job.service";
import TitleComponent from "../Common/TitleComponent";
import { Link as RouterLink } from "react-router-dom";

const InterestJobs = () => {
  const limit = 8;
  const [count, setCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [loading, setLoading] = useState(true);
  const [suggestedJobs, setSuggestedJobs] = useState({});
  const [hidePagination, setHidePagination] = useState(true);

  useEffect(() => {
    (async () => {
      const params = requestParams(limit, pageCnt);

      SuggestedJobsService.getDataByUser(params).then((r) => {
        const data = r.data;
        const limit = r.metadata.info?.limit;
        const total = r.metadata.info?.total;

        if (total > limit) {
          setHidePagination(false);
        }

        setSuggestedJobs(data);

        setCount(Math.ceil(total / limit));

        setLoading(false);
      });
    })();
  }, [pageCnt]);

  const requestParams = (limit, pageCnt) => {
    let params = {};

    if (limit) {
      params["limit"] = limit;
    }

    if (pageCnt) {
      params["offset"] = (pageCnt - 1) * limit;
    }

    return params;
  };

  const handlePageChange = (event, value) => {
    setPageCnt(value);
  };

  return (
    <Box
      sx={{
        mt: 3,
        borderRadius: "10px",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        p: 3,
      }}
    >
      <Grid container item spacing={3}>
        <Grid item xs={12}>
          <TitleComponent title="interest_jobs" disableP={true} />
        </Grid>

        <Grid container spacing={2} item xs={12} className="interest-job-grid">
          {!loading &&
            suggestedJobs.map((suggestedJob) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={suggestedJob.uuid}
                  className="interest-job-card"
                >
                  <Box
                    borderRadius="5px"
                    border="1px solid #DADADA"
                    padding={3}
                    minHeight="105px"
                    alignItems="center"
                    display="flex"
                  >
                    <Box sx={{ width: "100%" }}>
                      <Link
                        underline="hover"
                        to={`/jobs/${suggestedJob.uuid}/detail`}
                        component={RouterLink}
                      >
                        <Typography
                          fontSize="20px"
                          component="div"
                          fontWeight={500}
                          color="primary"
                          marginBottom={1}
                          sx={{ textOverflow: "ellipsis", maxWidth: "95%" }}
                          noWrap={true}
                        >
                          {suggestedJob.job_title}
                        </Typography>
                      </Link>

                      <Typography
                        fontSize="18px"
                        component="div"
                        fontWeight={300}
                        color="#585858"
                      >
                        {suggestedJob.company_name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
        </Grid>

        {!hidePagination && (
          <Grid item xs={12}>
            <Box justifyItems="right" display="flex" justifyContent="right">
              <StyledPagination
                count={count}
                page={pageCnt}
                variant="outlined"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default InterestJobs;

const StyledPagination = styled(Pagination)(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      borderColor: "#E0E0E0",
      margin: "10px",
    },
  },
}));