import React, {useCallback, useEffect, useState} from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {seekerEducationActions} from "../../../../store";
import EducationForm from "../../../../components/Seeker/Education/EducationForm";
import EducationList from "../../../../components/Seeker/Education/EducationList";
import {setProgress} from "../../../../store/slices/progress";
import SEO from "../../../../components/Common/SEO";

const SeekerEduction = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {seeker_educations: seekerEducations} = useSelector(x => x.seeker_educations)

    const iniFetch = useCallback(() => {
        dispatch(seekerEducationActions.get()).then(r => {
            setLoading(false);
        });
    }, [dispatch])

    useEffect(() => {
        dispatch(setProgress(30));
        iniFetch()
        dispatch(setProgress(100));
        // eslint-disable-next-line
    }, [iniFetch])

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <SEO title="Job Seeker Education"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Education</Typography>
                <Divider/>

                {!loading && <>
                    {seekerEducations.length > 0 ?
                        <EducationList data={seekerEducations}/> :
                        <EducationForm isSingleCreate={false} first={true}/>}
                </>}
            </Box>
        </Paper>
    );
}

export default SeekerEduction;