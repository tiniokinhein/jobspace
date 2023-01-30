import React, {useCallback, useEffect, useState} from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {jobPreferenceActions} from "../../../store";
import JobPreferenceShow from "../../../components/Seeker/JobPreference/JobPreferenceShow";
import JobPreferenceForm from "../../../components/Seeker/JobPreference/JobPreferenceForm";
import JPLoader from "../../../components/Seeker/JobPreference/JPLoader";
import {setProgress} from "../../../store/slices/progress";
import SEO from "../../../components/Common/SEO";

const SeekerJobPreference = () => {
    const [loading, setLoading] = useState(true);
    const {job_preference: jobPreference} = useSelector(x => x.job_preference);

    const dispatch = useDispatch();

    const jobPreFetch = useCallback(() => {
        dispatch(jobPreferenceActions.get());
    }, [dispatch])

    useEffect(() => {
        dispatch(setProgress(30))
        jobPreFetch();
        setLoading(false);
        dispatch(setProgress(100))
        // eslint-disable-next-line
    }, [jobPreFetch])

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <SEO title="Seeker Job Preference"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">Job Preferences</Typography>
                <Divider/>

                {!loading ?
                    (Object.keys(jobPreference).length > 0 ? <JobPreferenceShow data={jobPreference}/> :
                        <JobPreferenceForm/>) : <JPLoader/>
                }
            </Box>
        </Paper>
    )
}

export default SeekerJobPreference;