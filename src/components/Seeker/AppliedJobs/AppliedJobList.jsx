import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {applyJobActions} from "../../../store";
import {useDispatch} from "react-redux";
import AppliedJobCard from "./AppliedJobCard";
import LoadingJobCard from "./LoadingJobCard";
import orderBy from "lodash/orderBy";

const AppliedJobList = ({isSearch, search, isSort, sortBy}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const retrieveAppliedJobs = useCallback(() => {
        dispatch(applyJobActions.get()).then(r => {
            setAppliedJobs(r.payload)
            setLoading(false);
        });
    }, [dispatch])

    useEffect(() => {
        retrieveAppliedJobs();
    }, [retrieveAppliedJobs])

    useEffect(() => {

        if (isSearch && search) {
            let query = search.toLowerCase();

            let filter = appliedJobs.filter(item => (
                item.job_title.toLowerCase().indexOf(query) >= 0 ||
                item.company_name.toLowerCase().indexOf(query) >= 0)
            );

            if (isSort && filter) {
                filter = orderBy(filter, 'job_title', sortBy);
            }

            if (filter) {
                setFilteredItems([...filter])
            }
        }

        if (isSort && !isSearch) {
            const sorting = orderBy(appliedJobs, 'job_title', sortBy);
            setAppliedJobs(sorting);
        }
        // eslint-disable-next-line
    }, [isSearch, search, isSort, sortBy])
    return (
        <Grid container spacing={2} alignItems="center" px={3} pb={4} pt={1}>
            {(!loading && !isSearch) &&
                appliedJobs?.map((jobs) => {
                    return (
                        <Grid item xs={12} md={6} lg={6} key={jobs.uuid}>
                            <AppliedJobCard data={jobs}/>
                        </Grid>
                    )
                })
            }

            {isSearch &&
                filteredItems.map((jobs) => {
                    return (
                        <Grid item xs={12} md={6} lg={6} key={jobs.uuid}>
                            <AppliedJobCard data={jobs}/>
                        </Grid>
                    )
                })
            }

            {loading &&
                <Grid item xs={12} md={6} lg={6}>
                    <LoadingJobCard/>
                </Grid>
            }

            {(!loading && appliedJobs.length < 1) &&
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    minHeight="208px"
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h6" fontWeight={500}>There is no Applications.</Typography>
                </Grid>
            }
        </Grid>
    )
}

export default AppliedJobList;