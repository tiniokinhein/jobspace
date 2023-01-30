import React, {useCallback, useEffect, useState} from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import ExperienceForm from "../../../../components/Seeker/Experience/ExperienceForm";
import {useDispatch, useSelector} from "react-redux";
import {seekerExperienceActions} from "../../../../store";
import ExperienceList from "../../../../components/Seeker/Experience/ExperienceList";
import SEO from "../../../../components/Common/SEO";

const SeekerExperience = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {seeker_experiences: SeekerExperiences} = useSelector(x => x.seeker_experiences)

    const iniFetch = useCallback(() => {
        dispatch(seekerExperienceActions.get()).then(() => {
            setLoading(false);
        });
    }, [dispatch])

    useEffect(() => {
        iniFetch()
    }, [iniFetch])

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <SEO title="Job Seeker Experience"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Experiences</Typography>
                <Divider/>

                {!loading && <>
                    {SeekerExperiences.length > 0 ?
                        <ExperienceList data={SeekerExperiences}/> :
                        <ExperienceForm isSingleCreate={false}/>}
                </>}
            </Box>
        </Paper>
    );
}

export default SeekerExperience;
