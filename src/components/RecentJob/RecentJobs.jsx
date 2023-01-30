import React, { useEffect, useState } from "react";
import { Box, Button, Grid, List, ListItem, styled } from "@mui/material";
import RecentJobPaper from "./RecentJobPaper";
import { useTranslation } from "react-i18next";
import SuggestedJobsService from "../../services/suggest.job.service";
import StyledPagination from "../Common/StyledPagination";

const RelevanceBtn = styled(Button)(({ theme }) => ({
  color: "black",
  border: "1px solid #E8F0FD",
  fontWeight: 400,
  borderRadius: "7px",
  background: "#E8F0FD",
  fontSize: "14px",
  minHeight: "41px",
  "&:hover": {
    border: "none",
    background: "#E8F0FD",
    boxShadow: theme.shadows[3],
  },
  boxShadow: theme.shadows[1],
}));

const UrgentBtn = styled(Button)(({ theme }) => ({
  color: "black",
  border: "none",
  fontWeight: 400,
  borderRadius: "7px",
  backgroundColor: "#FFE4E6",
  fontSize: "14px",
  minHeight: "41px",
  "&:hover": {
    border: "none",
    background: "#FFE4E6",
    boxShadow: theme.shadows[3],
  },
  boxShadow: theme.shadows[1],
}));

const HighLightBtn = styled(Button)(({ theme }) => ({
  color: "black",
  border: "none",
  backgroundColor: "#8ED8F8",
  fontWeight: 400,
  borderRadius: "7px",
  fontSize: "14px",
  minHeight: "41px",
  "&:hover": {
    background: "#8ED8F8",
    border: "none",
    boxShadow: theme.shadows[3],
  },
  boxShadow: theme.shadows[1],
}));

const RecentJobs = () => {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [filter, setFilter] = useState(null);
  const [recentJobs, setRecentJobs] = useState({});

  useEffect(() => {
    (async () => {
      const params = requestParams(filter, pageCnt);

      await SuggestedJobsService.get(params).then((res) => {
        const limit = res.metadata.info?.limit;
        const total = res.metadata.info?.total;
        setLimit(limit);
        setRecentJobs(res.data);
        setCount(Math.ceil(total / limit));
      });
    })();
    // eslint-disable-next-line
  }, [pageCnt, filter]);

  const requestParams = (filter, pageCnt) => {
    let params = {};

    if (filter) {
      params["filter_by"] = filter;
    }

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

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          p: 4,
          borderRadius: "10px",
          border: "1px solid #EBEBEB",
          background: "white",
        }}
      >
        <Grid container display="flex">
          <Grid item xs={12}>
            <RelevanceBtn
              onClick={() => handleFilterChange("relevance")}
              value="relevance"
              sx={{
                minWidth: { xs: "auto", sm: "104px" },
                marginRight: { xs: "5px", sm: "10px" },
              }}
            >
              {t("all")}
            </RelevanceBtn>
            <UrgentBtn
              onClick={() => handleFilterChange("urgent")}
              value="urgent"
              sx={{
                minWidth: { xs: "auto", sm: "104px" },
                marginRight: { xs: "5px", sm: "10px" },
              }}
            >
              {t("urgent")}
            </UrgentBtn>
            <HighLightBtn
              variant="outlined"
              onClick={() => handleFilterChange("highlight")}
              value="highlight"
              sx={{ minWidth: { xs: "auto", sm: "104px" } }}
            >
              {t("highlight")}
            </HighLightBtn>
          </Grid>
          <Grid item xs={12}>
            {recentJobs.length > 0 && (
              <List>
                {recentJobs.map((recentJob) => (
                  <ListItem key={recentJob.uuid} sx={{ px: 0 }}>
                    <RecentJobPaper recentJob={recentJob} />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" alignItems="end">
              <StyledPagination
                count={count}
                page={pageCnt}
                handlePageChange={handlePageChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default RecentJobs;
