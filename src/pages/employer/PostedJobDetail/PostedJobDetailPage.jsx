import React, {useEffect, useState} from 'react'
import {Container, Grid} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import {TabPanel} from "@mui/lab";
import EmpPostedJobsDataService from "../../../services/emp.posted.job.service";
import {useParams} from "react-router-dom";
import {history} from "../../../helpers";
import Overview from "../../../components/Employer/PostedJobDetail/Overview";
import DetailTab from "../../../components/Employer/PostedJobDetail/DetailTab";
import Applicants from "../../../components/Employer/PostedJobDetail/Applicants";
import Candidates from "../../../components/Employer/PostedJobDetail/Candidates";
import Considering from "../../../components/Employer/PostedJobDetail/Considering";
import Prescreen from "../../../components/Employer/PostedJobDetail/Prescreen";
import Shortlisted from "../../../components/Employer/PostedJobDetail/Shortlisted";
import Interview from "../../../components/Employer/PostedJobDetail/Interview";
import Hired from "../../../components/Employer/PostedJobDetail/Hired";
import NotSuitable from "../../../components/Employer/PostedJobDetail/NotSuitable";

const PostedJobDetailPage = () => {

    const {postedJobId} = useParams();
    const [overview, setOverview] = useState({});
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('overview');

    const tabs = [
        'overview', 'applicants', 'candidates', 'prescreen',
        'considering', 'shortlisted', 'interview', 'hired', 'not-suitable'
    ];

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        history.navigate(`${window.location.pathname}#${newValue}`);
    };

    useEffect(() => {
        (async () => {
            if (postedJobId) {
                await EmpPostedJobsDataService.getByUuid(postedJobId).then(r => {
                    setOverview(r.data);
                    setLoading(false);
                });
            } else {
                history.navigate('/404');
            }
        })();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let hashVal = window.location.hash;

        if (hashVal) {
            hashVal = hashVal.substring(1);
            if (tabs.includes(hashVal.toLowerCase())) {
                setValue(hashVal.toLowerCase());
            }
        }
        // eslint-disable-next-line
    }, []);

    return (
        <TabContext value={value}>

            <DetailTab uuid={postedJobId} handleTabChange={handleTabChange}/>

            <Container maxWidth="xl">
                <TabPanel value="overview" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Overview overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="applicants" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Applicants overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="candidates" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Candidates overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="prescreen" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Prescreen overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="considering" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Considering overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="shortlisted" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Shortlisted overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="interview" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Interview overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="hired" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <Hired overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value="not-suitable" sx={{p: 0}}>
                    <Grid container>
                        <Grid item xs={12} sx={{padding: {lg: '0px 30px', xl: 0}}}>
                            {(!loading && Object.keys(overview).length > 0) && <NotSuitable overview={overview}/>}
                        </Grid>
                    </Grid>
                </TabPanel>
            </Container>
        </TabContext>
    );
}

export default PostedJobDetailPage;