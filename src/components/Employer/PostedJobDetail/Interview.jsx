import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {recruitmentActions} from "../../../store";
import {helper} from "../../../helpers";
import {useParams} from "react-router-dom";
import {setProgress} from "../../../store/slices/progress";
import ApplicantInfoDataService from "../../../services/applicant.info.service";
import ApplicantSideMenu from "./ApplicantSideMenu";
import OverviewInfo from "./OverviewInfo";
import ApplicantInfo from "./ApplicantInfo";
import NoData from "./NoData";

const Interview = ({overview}) => {

    const dispatch = useDispatch();
    const {postedJobId} = useParams();
    const [uId, setUid] = useState(null);
    const [count, setCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pageCnt, setPageCnt] = useState(1);
    const [search, setSearch] = useState(null);
    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cvLoading, setCvLoading] = useState(true);
    const [applicantInfo, setApplicantInfo] = useState({});
    const {interviews} = useSelector((state) => state.recruitment)
    const [checkedApplicants, setCheckedApplicants] = useState([]);
    const [needToUpdate, setNeedToUpdate] = useState(false);
    const fetchInterviews = useCallback((limit, pageCnt, filter, search, needToUpdate) => {
        const params = helper.postJobParams(limit, pageCnt, 2, filter, search);
        dispatch(recruitmentActions.getInterviews({uuid: postedJobId, params: params})).then(res => {
            const {metadata, data} = res.payload;
            const limit = metadata.info?.limit;
            const total = metadata.info?.total;
            setLimit(limit);
            setCount(Math.ceil(total / limit));

            if (data.length > 0) {
                setUid((data[0]).user_id);
            } else {
                setCvLoading(false);
            }

            if (needToUpdate) {
                if (data.length < 1) {
                    setApplicantInfo({});
                }

                setNeedToUpdate(false);
                setCheckedApplicants([]);
            }
        });
        // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
        if (uId) {
            (async () => {
                await ApplicantInfoDataService.getApplicantInfoByUid(postedJobId, uId).then((res) => {
                    setApplicantInfo(res.data);
                    setCvLoading(false);
                });
            })();
        }
        // eslint-disable-next-line
    }, [uId])

    useEffect(() => {
        dispatch(setProgress(30));
        fetchInterviews(limit, pageCnt, filter, search, needToUpdate)
        dispatch(setProgress(100));
        setLoading(false);
        // eslint-disable-next-line
    }, [fetchInterviews, pageCnt, search, filter, needToUpdate]);

    const handlePageChange = (event, value) => {
        setPageCnt(value);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)

        if (event.target.value) {
            setPageCnt(1)
        }
    }

    const handleApplicantClick = (uId) => {
        if (uId) setUid(uId);
    }

    const handleParentCheck = (event) => {
        if (event.target.checked) {
            setCheckedApplicants(helper.pluck(interviews, 'user_id'))
        } else {
            setCheckedApplicants([])
        }
    }

    const handleChildCheck = (event, uId) => {
        if (event.target.checked) {
            let data = [...checkedApplicants, uId]
            setCheckedApplicants(data);
        } else {
            const data = [...checkedApplicants];
            const part = data.filter((value) => value === uId);
            if (part.length > 0) {
                const index = data.indexOf(part[0]);
                if (index > -1) {
                    data.splice(index, 1);
                    setCheckedApplicants(data);
                }
            }
        }
    }

    return (
        <Fragment>
            <OverviewInfo overview={overview} handleSearchChange={handleSearchChange}/>

            <Box
                sx={{
                    my: 2,
                    borderRadius: '10px',
                    background: '#ffffff',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                }}
                flexGrow={1}
            >
                <Grid container sx={{p: 3}} justifyContent="space-between">
                    <Grid item xs={12} md={3.5}>
                        <ApplicantSideMenu
                            props={{
                                applicants: interviews,
                                checkedList: checkedApplicants,
                                handleApplicantClick: handleApplicantClick,
                                handleParentCheck: handleParentCheck,
                                handleChildCheck: handleChildCheck,
                                title: 'Interview',
                                hideInterview: true,
                                jobPostId: postedJobId,
                                setNeedToUpdate: setNeedToUpdate,
                                count: count,
                                pageCnt: pageCnt,
                                handlePageChange: handlePageChange,
                                setFilter: setFilter
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={8.3}>
                        {!cvLoading && !loading ?
                            (Object.keys(applicantInfo).length > 0 ?
                                <ApplicantInfo applicantInfo={applicantInfo}/> :
                                <NoData title="interview data"/>) : null
                        }
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}

export default Interview;