import React, {useCallback, useEffect, useState} from "react";
import {Box, Grid, IconButton, InputBase, Paper, Stack, Typography,} from "@mui/material";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import {styled} from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReportIcon from "@mui/icons-material/Report";
import ActiveJobList from "../../../components/Seeker/AppliedJobs/ActiveJobList";
import AppliedJobList from "../../../components/Seeker/AppliedJobs/AppliedJobList";
import SortIcon from "../../../assets/icons/sort.svg";
import InterestJobs from "../../../components/Seeker/InterestJobs";
import SEO from "../../../components/Common/SEO";
import TabWithCount from "../../../components/Tab/TabWithCount";
import {useDispatch} from "react-redux";
import {applyJobActions} from "../../../store";

const ReportTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#00A0DC",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#00A0DC",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: "12px",
  },
}));

function AppliedJobs() {
  const dispatch = useDispatch();

  const [value, setValue] = useState("1");

  const [activeJobCounts, setActiveJobCounts] = useState(0);
  const [appliedJobCounts, setAppliedJobCounts] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Search
  const [activeSearch, setActiveSearch] = useState(null);
  const [appliedSearch, setAppliedSearch] = useState(null);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [isAppliedSearch, setIsAppliedSearch] = useState(false);

  // Sort
  const [isActiveSort, setIsActiveSort] = useState(false);
  const [isAppliedSort, setIsAppliedSort] = useState(false);
  const [activeSort, setActiveSort] = useState("asc");
  const [appliedSort, setAppliedSort] = useState("asc");

  const retrieveActiveJobs = useCallback(() => {
    dispatch(applyJobActions.getActiveJobs()).then((r) => {
      setActiveJobCounts(r.payload.length);
    });
  }, [dispatch]);

  const retrieveAppliedJobs = useCallback(() => {
    dispatch(applyJobActions.get()).then((r) => {
      setAppliedJobCounts(r.payload.length);
    });
  }, [dispatch]);

  useEffect(() => {
    retrieveActiveJobs();
    retrieveAppliedJobs();
  }, [retrieveActiveJobs, retrieveAppliedJobs]);

  const onSearch = (e) => {
    if (value === "1") {
      if (e.target.value) {
        setIsActiveSearch(true);
        setActiveSearch(e.target.value);
      } else {
        setIsActiveSearch(false);
        setActiveSearch(null);
      }
    } else {
      if (e.target.value) {
        setIsAppliedSearch(true);
        setAppliedSearch(e.target.value);
      } else {
        setIsAppliedSearch(false);
        setAppliedSearch(null);
      }
    }
  };

  const handleSort = () => {
    if (value === "1") {
      setIsActiveSort(true);
      setActiveSort((prevState) => (prevState === "desc" ? "asc" : "desc"));
    } else {
      setIsAppliedSort(true);
      setAppliedSort((prevState) => (prevState === "desc" ? "asc" : "desc"));
    }
  };

  return (
    <Box>
      <SEO title="Job Seeker's Applied Jobs" />
      <TabContext value={value}>
        <Box
          sx={{
            borderRadius: "10px",
            marginBottom: "2rem",
            background: "#fff",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container alignItems="centers">
            <Grid
              item
              xs={12}
              md={12}
              sx={{ borderBottom: "1px solid #C4C4C4" }}
            >
              <Typography
                py={3}
                px={{ xs: 2, sm: 4 }}
                sx={{
                  color: "#195DCC",
                  fontSize: "24px",
                  fontWeight: "400",
                }}
              >
                Applied Jobs
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                justifyContent={{ xs: "center", sm: "space-between" }}
                alignItems={{ xs: "start", sm: "center" }}
                px={3}
                py={2}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <TabList
                    onChange={handleChange}
                    aria-label="API tabs"
                    TabIndicatorProps={{ style: { background: "#FF9635" } }}
                    textColor="inherit"
                  >
                    <Tab
                      label={
                        <TabWithCount count={activeJobCounts}>
                          Active Applications
                        </TabWithCount>
                      }
                      value="1"
                    />
                    <Tab
                      label={
                        <TabWithCount count={appliedJobCounts}>
                          All Applications
                        </TabWithCount>
                      }
                      value="2"
                    />
                  </TabList>
                  <ReportTooltip
                    title="Your application history for the past 6 months only is displayed"
                    placement="bottom-start"
                    arrow
                  >
                    <ReportIcon
                      color="primary"
                      sx={{
                        fontSize: "22px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    />
                  </ReportTooltip>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box alignItems="center" display="flex">
                    <img src={SortIcon} alt="sort" />
                    <IconButton
                      type="button"
                      aria-label="sort"
                      onClick={handleSort}
                    >
                      <FilterListIcon
                        fontSize="inherit"
                        sx={{ color: "#A1A1A1" }}
                      />
                    </IconButton>
                  </Box>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      minWidth: { xs: 200, sm: 250 },
                      border: "1px solid #DADADA",
                      boxShadow: "none",
                      borderRadius: "5px",
                      borderColor: "#DADADA",
                      height: "43px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search By Keywords"
                      inputProps={{
                        "aria-label": "search",
                        style: {
                          borderRadius: "5px",
                        },
                      }}
                      onChange={onSearch}
                    />
                    <IconButton aria-label="search">
                      <SearchIcon sx={{ fontSize: "20px", color: "#C7C4C4" }} />
                    </IconButton>
                  </Paper>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            background: "#FFFFFF",
            borderRadius: "10px",
            marginBottom: "1rem",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TabPanel value="1" sx={{ padding: 0 }}>
            <ActiveJobList
              isSearch={isActiveSearch}
              search={activeSearch}
              isSort={isActiveSort}
              sortBy={activeSort}
            />
          </TabPanel>

          <TabPanel value="2" sx={{ padding: 0 }}>
            <AppliedJobList
              isSearch={isAppliedSearch}
              search={appliedSearch}
              isSort={isAppliedSort}
              sortBy={appliedSort}
            />
          </TabPanel>
        </Box>

        <InterestJobs />
      </TabContext>
    </Box>
  );
}

export default AppliedJobs;