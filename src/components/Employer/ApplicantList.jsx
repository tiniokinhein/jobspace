import React, {useCallback, useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import ApplicantCard from "./ApplicantCard";
import {helper} from "../../helpers";
import {applicantActions} from "../../store";
import {setProgress} from "../../store/slices/progress";
import {useDispatch, useSelector} from "react-redux";
import StyledPagination from "../Common/StyledPagination";

const ApplicantList = ({search, setTotal}) => {

    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(9);
    const [pageCnt, setPageCnt] = useState(1);
    const [loading, setLoading] = useState(true);
    const {all: applicants} = useSelector(state => state.applicants)

    const fetchApplicants = useCallback((limit, pageCnt, search) => {
        const params = helper.postJobParams(limit, pageCnt, null, null, search);
        dispatch(applicantActions.getAll(params)).then(res => {
            const {metadata} = res.payload;
            const limit = metadata.info?.limit;
            const total = metadata.info?.total;
            setLimit(limit);
            setTotal(total);
            setCount(Math.ceil(total / limit));
        });
        // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
        dispatch(setProgress(30));
        fetchApplicants(limit, pageCnt, search);
        setLoading(false);
        dispatch(setProgress(100));
        // eslint-disable-next-line
    }, [fetchApplicants, pageCnt, search]);

    const handlePageChange = (event, value) => {
        setPageCnt(value);
    }

    return (
        <Box padding={3}>
            <Grid container spacing={2} alignItems="center">
                {(!loading && applicants.length > 0) &&
                    applicants.map(applicant => (
                        <Grid item xs={12} sm={6} md={4} key={applicant.user_id}>
                            <ApplicantCard applicant={applicant}/>
                        </Grid>
                    ))
                }

                <Grid item xs={12}>
                    <StyledPagination
                        count={count}
                        pageCnt={pageCnt}
                        handlePageChange={handlePageChange}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ApplicantList;