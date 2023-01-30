import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {seekerSkillActions} from "../../../store";
import SeekerSkillList from "../../../components/Seeker/Skills/SeekerSkillList";
import SeekerSkillForm from "../../../components/Seeker/Skills/SeekerSkillForm";
import SEO from "../../../components/Common/SEO";
import {setProgress} from "../../../store/slices/progress";

const SeekerSkill = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {seeker_skills} = useSelector((state) => state.seeker_skills);

    const retrieveSeekerSkills = useCallback(() => {
        dispatch(seekerSkillActions.get());
        setLoading(false);
    }, [dispatch])

    useEffect(() => {
        dispatch(setProgress(50));
        retrieveSeekerSkills()
        dispatch(setProgress(100));
        // eslint-disable-next-line
    }, [retrieveSeekerSkills])

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <SEO title="Job Seeker Skills"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Skills</Typography>
                <Divider/>
                {!loading && <Fragment>
                    {seeker_skills.length > 0 ?
                        <SeekerSkillList data={seeker_skills}/> :
                        <SeekerSkillForm addMore={false}/>
                    }
                </Fragment>}
            </Box>
        </Paper>
    )
}

export default SeekerSkill;