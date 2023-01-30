import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import RecentSearch from "../../components/FindJob/RecentSearch";
import JobFilter from "../../components/FindJob/JobFilter";
import JobPost from "../../components/FindJob/JobPost";
import { useDispatch, useSelector } from "react-redux";
import JobSearchBar from "../../components/FindJob/JobSearchBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jobCategoryService from "../../services/job.category.service";
import SeekerSideMenu from "../../components/Seeker/SeekerSideMenu";
import { setProgress } from "../../store/slices/progress";
import IndustryDataService from "../../services/industry.service";
import { overseasJobsActions } from "../../store";
import SEO from "../../components/Common/SEO";
import StyledPagination from "../../components/Common/StyledPagination";

export default function OverseasJobs() {
  const limit = 10;
  const dispatch = useDispatch();
  const location = useLocation();
  const { jobTitle } = useParams();
  const navigate = useNavigate();
  const { jobCategoryId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [count, setCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [sorting, setSorting] = useState(1);
  const [selectedCat, setSelectedCat] = useState([]);
  const [selectedInd, setSelectedInd] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchVal, setSearchVal] = useState(
    jobTitle !== "latest-jobs" ? jobTitle : null
  );
  const [countryVal, setCountryVal] = useState(null);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handlePageChange = (event, value) => {
    setPageCnt(value);
  };

  const requestParams = (
    sorting,
    limit,
    pageCnt,
    searchVal,
    divisionVal,
    selectedCat,
    selectedInd,
    catId = null,
    indId = null
  ) => {
    let params = {};

    if (sorting) {
      switch (parseInt(sorting)) {
        case 1:
          params["sort_by"] = "latest";
          break;
        case 2:
          params["sort_by"] = "urgent";
          break;
        case 3:
          params["sort_by"] = "highlight";
          break;
        default:
          params["sort_by"] = "latest";
          break;
      }
    }

    if (limit) {
      params["limit"] = limit;
    }

    if (pageCnt) {
      params["page"] = pageCnt;
    }

    if (searchVal) {
      params["search"] = searchVal;
    }

    if (query.get("similar") && !searchVal) {
      params["search"] = query.get("similar");
    }

    if (divisionVal) {
      params["country_id"] = divisionVal?.uuid ?? null;
    }

    if (selectedCat.length > 0 || catId) {
      params["category_id"] =
        selectedCat.length > 0 ? selectedCat[0].uuid : catId;
    }

    if (selectedInd.length > 0 || indId) {
      params["industry_id"] =
        selectedInd.length > 0 ? selectedInd[0].uuid : indId;
    }

    params["is_oversea"] = 1;

    return params;
  };

  const retrieveJobs = useCallback(
    (
      sorting,
      limit,
      pageCnt,
      searchVal,
      countryVal,
      selectedCat,
      selectedInd,
      catId = null,
      indId = null
    ) => {
      const params = requestParams(
        sorting,
        limit,
        pageCnt,
        searchVal,
        countryVal,
        selectedCat,
        selectedInd,
        catId,
        indId
      );

      dispatch(overseasJobsActions.getAll(params)).then(res => {
        const response = res.payload;

        const limit = response.metadata.info?.limit;
        const total = response.metadata.info?.total;

        setJobs(response.data);

        setCount(Math.ceil(total / limit));

        setLoading(false);

        dispatch(setProgress(100));
      });
    },
      // eslint-disable-next-line
      [dispatch]
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchVal) {
      navigate(`/overseas-jobs/${searchVal}`, { replace: true });
    } else {
      navigate(`/overseas-jobs`, { replace: true });
    }

    retrieveJobs(
      sorting,
      limit,
      pageCnt,
      searchVal,
      countryVal,
      selectedCat,
      selectedInd
    );
  };

  const handleDivisionValChange = (value) => {
    setCountryVal(value);
  };

  // Near Me Config
  // const {coords, isGeolocationAvailable, isGeolocationEnabled} = useGeolocated({
  //     positionOptions: {
  //         enableHighAccuracy: false,
  //     },
  //     userDecisionTimeout: 5000,
  // });

  // const handleJobsNear = () => {
  //     if (isGeolocationAvailable) {
  //         if (!isGeolocationEnabled) {
  //             alert('Geolocation is not enabled');
  //         } else {
  //             console.log(coords)
  //         }
  //     } else {
  //         alert('Your browser does not support Geolocation');
  //     }
  // }

  const handleSortingChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value);
  };

  const changeItem = (item, type) => {
    let filter = [item];

    if (type === 1) {
      setSelectedInd(filter);
      setCheckedItems(() => [...filter, ...selectedCat]);
    } else {
      setSelectedCat(filter);
      setCheckedItems(() => [...selectedInd, ...filter]);
    }

    if (jobCategoryId) {
      navigate(`/find-jobs`, { replace: true });
    }
  };

  const handleCheckedListEmpty = () => {
    setSelectedInd([]);
    setSelectedCat([]);
    setCheckedItems([]);
    navigate("/find-jobs", { replace: true });
  };

  useEffect(() => {
    dispatch(setProgress(30));

    const query = new URLSearchParams(location.search);

    retrieveJobs(
      sorting,
      limit,
      pageCnt,
      searchVal,
      countryVal,
      selectedCat,
      selectedInd,
      query.get("catId"),
      query.get("indId")
    );

    // eslint-disable-next-line
  }, [sorting, checkedItems, pageCnt]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    if (query.get("catId")) {
      retrieveCat(query.get("catId"));
    }

    if (query.get("indId")) {
      retrieveInd(query.get("indId"));
    }

    // eslint-disable-next-line
  }, []);

  const retrieveCat = async (catId) => {
    await jobCategoryService.getByUuid(catId).then((r) => {
      setSelectedCat([r.data]);
      setCheckedItems([r.data]);
    });
  };

  const retrieveInd = async (indId) => {
    await IndustryDataService.getByUuid(indId).then((r) => {
      setSelectedInd([r.data]);
      setCheckedItems([r.data]);
    });
  };

  return (
    <Grid container>
      <SEO title="Find Jobs" />
      <JobSearchBar
        handleSearch={handleSearch}
        setSearchVal={setSearchVal}
        handleDivisionValChange={handleDivisionValChange}
        isOverSea={true}
      />

      <Grid item xs={12}>
        <Container maxWidth="xl">
          <Box px={{ lg: "30px", xl: 0 }}>
            <Grid container paddingY="36px">
              <Grid item xs={12} sm={12} md={2.7} lg={3.4} xl={2.7}>
                <Box
                  sx={{
                    top: 180,
                    position: "sticky",
                    width: "95%",
                  }}
                >
                  {isLoggedIn && <SeekerSideMenu isJobPostSide={true} />}
                  <RecentSearch />
                  <JobFilter changeItem={changeItem} checked={checkedItems} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={9.3} lg={8.6} xl={9.3}>
                <Box
                  sx={{ display: "flex", my: 1 }}
                  justifyContent="space-between"
                >
                  <Box>
                    {selectedInd.map((item) => (
                      <Chip
                        key={item.uuid}
                        sx={{
                          borderRadius: "20px",
                          backgroundColor: "#DAE5F7",
                          ml: 1,
                        }}
                        label={item.title}
                      />
                    ))}

                    {selectedCat.map((item) => (
                      <Chip
                        key={item.uuid}
                        sx={{
                          borderRadius: "20px",
                          backgroundColor: "#DAE5F7",
                          ml: 1,
                        }}
                        label={item.title}
                      />
                    ))}

                    {(selectedInd.length > 0 || selectedCat.length > 0) && (
                      <Button
                        sx={{
                          fontSize: "12px",
                          color: "#00A0DC",
                          borderRadius: "20px",
                          ml: "3px",
                        }}
                        onClick={handleCheckedListEmpty}
                      >
                        Clear All
                      </Button>
                    )}
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle2">Sort by:</Typography>
                      <FormControl size="small">
                        <Select
                          value={sorting}
                          sx={{
                            color: "#195DCC",
                            ".MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            ".MuiOutlinedInput-input": {
                              paddingLeft: 0,
                            },
                          }}
                          MenuProps={{ disableScrollLock: true }}
                          onChange={handleSortingChange}
                        >
                          <MenuItem value={1}>Latest</MenuItem>
                          <MenuItem value={2}>Urgent</MenuItem>
                          <MenuItem value={3}>Highlight</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Box>
                </Box>

                <JobPost data={jobs} loading={loading} />

                {jobs.length > 0 && (
                  <Box mt="20px" display="flex" justifyContent="right">
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
        </Container>
      </Grid>
    </Grid>
  );
}
