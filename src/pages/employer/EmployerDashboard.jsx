import React, { useCallback, useEffect, useState } from "react";
import VisitorChart from "./dashboard/VisitorChart";
import SEO from "../../components/Common/SEO";
import {
  Box,
  Divider,
  Grid,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";
import EmployerAnalysisDataService from "../../services/employer.analysis.service";

const EmployerDashboard = () => {
  const [analysis, setAnalysis] = useState([]);

  const fetchInit = useCallback(async () => {
    await EmployerAnalysisDataService.get().then((res) =>
      setAnalysis(res.data)
    );
  }, []);

  useEffect(() => {
    fetchInit();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            background: "white",
            borderRadius: "10px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SEO title="Company Videos" />
          <Typography variant="h5" py={3} px={4} color="primary">
            Dashboard
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={{xs: 1.5, sm: 3}}>
          <Grid item xs={3}>
            <StyledBox>
              <Typography fontSize="18px" color="primary" component="span">
                {analysis?.analysis?.job_post_count ?? 0}
              </Typography>
              <Typography
                color="#333333"
                fontSize={{xs: "12px", sm: "14px"}}
                component="span"
                paddingTop={1.5}
                textAlign="center"
              >
                Total Job Posts
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={3}>
            <StyledBox>
              <Typography fontSize="18px" color="primary" component="span">
                {analysis?.analysis?.total_page_view ?? 0}
              </Typography>
              <Typography
                color="#333333"
                fontSize={{xs: "12px", sm: "14px"}}
                component="span"
                paddingTop={1.5}
                textAlign="center"
              >
                Total Page Views
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={3}>
            <StyledBox>
              <Typography fontSize="18px" color="primary" component="span">
                {analysis?.analysis?.follower_count ?? 0}
              </Typography>
              <Typography
                color="#333333"
                fontSize={{xs: "12px", sm: "14px"}}
                component="span"
                paddingTop={1.5}
                textAlign="center"
              >
                New Followers
              </Typography>
            </StyledBox>
          </Grid>
          <Grid item xs={3}>
            <StyledBox>
              <Typography fontSize="18px" color="primary" component="span">
                {analysis?.analysis?.click_away_count ?? 0}
              </Typography>
              <Typography
                color="#333333"
                fontSize={{xs: "12px", sm: "14px"}}
                component="span"
                paddingTop={1.5}
                textAlign="center"
              >
                Button Clicks
              </Typography>
            </StyledBox>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} width="100%">
        <Box
          sx={{
            background: "white",
            borderRadius: "10px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ p: 2 }} flexGrow={1}>
            <Typography fontSize="18px" fontWeight={500}>
              Daily Visitor Metrics
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ height: "500px", p: 4 }}>
            <VisitorChart data={analysis?.visitor_chart ?? []} />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} width="100%">
        <Box
          sx={{
            background: "white",
            borderRadius: "10px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
            minHeight: "200px",
          }}
        >
          <Box sx={{ p: 2 }} flexGrow={1}>
            <Typography fontSize="16px" fontWeight={500}>
              Top Job Category
            </Typography>
          </Box>
          <Divider />

          <Grid container sx={{ px: 2, py: 4 }} spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} md={4}>
                  <Typography fontWeight={500} fontSize={{xs: "13px", sm: "16px"}}>
                    Job Category
                  </Typography>
                </Grid>
                <Grid item xs={3} md={1}>
                  <Typography fontWeight={500} align="right" fontSize={{xs: "13px", sm: "16px"}}>
                    Job Posts
                  </Typography>
                </Grid>
                <Grid item xs={5} md={6}>
                  <Typography fontWeight={500} fontSize={{xs: "13px", sm: "16px"}}>
                    % of Job Categories
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1.5}>
                {Object.keys(analysis).length > 0 &&
                  analysis.job_category_chart &&
                  analysis.job_category_chart.map((jobCategory) => (
                    <Grid item xs={12} key={jobCategory.title}>
                      <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                          <Typography fontSize={{xs: "12px", sm: "16px"}}>
                            {jobCategory.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} md={1}>
                          <Typography fontSize={{xs: "12px", sm: "16px"}} align="right">
                            {jobCategory.count}
                          </Typography>
                        </Grid>
                        <Grid item xs={5} md={6}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "50%", mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={jobCategory.percentage}
                                sx={{
                                  height: 15,
                                  "&.MuiLinearProgress-colorPrimary": {
                                    background: "#e1e5ea",
                                  },
                                  ".MuiLinearProgress-bar": {
                                    backgroundColor: "#5A6778",
                                  },
                                }}
                              />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                              <Typography
                                fontSize={{xs: "12px", sm: "16px"}}
                                color="text.secondary"
                              >{`${jobCategory.percentage}%`}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EmployerDashboard;

const StyledBox = styled(Box)(() => ({
  background: "white",
  borderRadius: "10px",
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100px",
}));