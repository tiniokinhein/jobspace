import React, {useEffect, useState} from 'react';
import {helper} from "../../../helpers";
import EmpPostedJobsDataService from "../../../services/emp.posted.job.service";
import {FormControl, Grid, InputAdornment, OutlinedInput, Typography} from "@mui/material";
import JobPostCard from "../../../components/Employer/PostedJob/JobPostCard";
import StyledPagination from "../../../components/Common/StyledPagination";
import SearchIcon from "@mui/icons-material/Search";
import JobPostSkeleton from "../../../components/Employer/PostedJob/JobPostSkeleton";

const DraftListing = ({setRefresh}) => {
    const [jobs, setJobs] = useState([]);
    const [limit, setLimit] = useState(10);
    const [count, setCount] = useState(0);
    const [pageCnt, setPageCnt] = useState(1);
    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    useEffect(() => {
        (async () => {
            const params = helper.postJobParams(limit, pageCnt, 2, filter);
            await EmpPostedJobsDataService.get(params).then(res => {
                const {metadata, data} = res
                const limit = metadata.info?.limit;
                const total = metadata.info?.total;

                setJobs(data);
                setLimit(limit);
                setCount(Math.ceil(total / limit));

                setLoading(false);
            })
        })()
        // eslint-disable-next-line
    }, [pageCnt, filter, shouldRefresh]);

    const handlePageChange = (event, value) => {
        setPageCnt(value);
    }

    const handleSearchChange = (e) => {
        setFilter(e.target.value)
    }

    const handleClickAction = async (status, uuid) => {
        if (status && uuid) {
            await EmpPostedJobsDataService.updatePostedJob(uuid, {status: status}).then(() => {
                setRefresh(prevState => !prevState);
                setShouldRefresh(prevState => !prevState);
            });
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} pt={4} pb={2} justifyContent="flex-end" display="flex" alignItems="center">
                <FormControl variant="outlined" size="large" color='secondary'
                             sx={{width: '40%', borderRadius: '5px', height: '43px'}}>
                    <OutlinedInput
                        id='search'
                        type='text'
                        placeholder="Search By Job Title / Categories"
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon aria-label="search" sx={{color: '#A2A2A2'}}/>
                            </InputAdornment>
                        }
                        sx={{
                            '.MuiOutlinedInput-notchedOutline': {borderColor: '#DADADA'},
                            height: '43px',
                            borderRadius: '5px',
                        }}
                        onChange={handleSearchChange}
                    />
                </FormControl>
            </Grid>

            {(!loading && jobs.length > 0) && jobs.map((item) => (
                <Grid item xs={12} key={item.uuid}>
                    <JobPostCard item={item} handleClickAction={handleClickAction}/>
                </Grid>
            ))}

            {loading && <Grid item xs={12}><JobPostSkeleton/></Grid>}

            {(!loading && jobs.length < 1) &&
                <Grid item xs={12}>
                    <Typography>There is no data.</Typography>
                </Grid>
            }

            {jobs.length > 0 &&
                <Grid item xs={12}>
                    <StyledPagination
                        count={count}
                        pageCnt={pageCnt}
                        handlePageChange={handlePageChange}
                    />
                </Grid>
            }
        </Grid>
    );
};

export default DraftListing;