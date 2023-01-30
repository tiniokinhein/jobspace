import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { applyJobActions } from "../../../store";
import { useDispatch } from "react-redux";
import LoadingJobCard from "./LoadingJobCard";
import AppliedJobCard from "./AppliedJobCard";
import orderBy from "lodash/orderBy";

const ActiveJobList = ({ isSearch, search, isSort, sortBy }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [activeJobs, setActiveJobs] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const retrieveActiveJobs = useCallback(() => {
    dispatch(applyJobActions.getActiveJobs()).then((r) => {
      setActiveJobs(r.payload);
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    retrieveActiveJobs();
  }, [retrieveActiveJobs]);

  useEffect(() => {
    if (isSearch && search) {
      let query = search.toLowerCase();

      let filter = activeJobs.filter(
        (item) =>
          item.job_title.toLowerCase().indexOf(query) >= 0 ||
          item.company_name.toLowerCase().indexOf(query) >= 0
      );

      if (isSort && filter) {
        filter = orderBy(filter, "job_title", sortBy);
      }

      if (filter) {
        setFilteredItems([...filter]);
      }
    }

    if (isSort && !isSearch) {
      const sorting = orderBy(activeJobs, "job_title", sortBy);

      setActiveJobs(sorting);
    }
    // eslint-disable-next-line
  }, [isSearch, search, isSort, sortBy]);
  return (
    <Grid container spacing={2} alignItems="center" px={3} pb={4} pt={1}>
      {loading && (
        <Grid item xs={12} md={6} lg={6}>
          <LoadingJobCard />
        </Grid>
      )}
      {!loading &&
        !isSearch &&
        activeJobs.map((jobs) => {
          return (
            <Grid item xs={12} md={6} lg={6} key={jobs.uuid}>
              <AppliedJobCard data={jobs} />
            </Grid>
          );
        })}

      {isSearch &&
        filteredItems.map((jobs) => {
          return (
            <Grid item xs={12} md={6} lg={6} key={jobs.uuid}>
              <AppliedJobCard data={jobs} />
            </Grid>
          );
        })}

      {/*{(!loading && activeJobs.length > 0) &&*/}
      {/*    activeJobs.map((activeJob) => {*/}
      {/*        return (*/}
      {/*            <Grid item xs={12} md={6} lg={6} key={activeJob.uuid}>*/}
      {/*                <AppliedJobCard data={activeJob}/>*/}
      {/*            </Grid>*/}
      {/*        )*/}
      {/*    })*/}
      {/*}*/}

      {!loading && activeJobs.length < 1 && (
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          minHeight="208px"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={500}>
            There is no active application.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ActiveJobList;