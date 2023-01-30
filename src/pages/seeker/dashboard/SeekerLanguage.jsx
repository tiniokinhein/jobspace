import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {seekerLanguageActions} from "../../../store";
import SeekerLanguageForm from "../../../components/Seeker/Languages/SeekerLanguageForm";
import SeekerLanguageList from "../../../components/Seeker/Languages/SeekerLanguageList";
import {setProgress} from "../../../store/slices/progress";
import SEO from "../../../components/Common/SEO";

const SeekerLanguage = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {seeker_languages} = useSelector((state) => state.seeker_languages);

    const retrieveLangSkills = useCallback(() => {
        dispatch(setProgress(30))
        dispatch(seekerLanguageActions.get());
        setLoading(false);
        dispatch(setProgress(100))
    }, [dispatch])

    useEffect(() => {
        retrieveLangSkills()
    }, [retrieveLangSkills])

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <SEO title="Seeker Language Skills"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Languages</Typography>
                <Divider/>

                {!loading && <Fragment>
                    {seeker_languages.length > 0 ?
                        <SeekerLanguageList data={seeker_languages}/> :
                        <SeekerLanguageForm addMore={false}/>
                    }
                </Fragment>}
            </Box>
        </Paper>
    )
}

export default SeekerLanguage;