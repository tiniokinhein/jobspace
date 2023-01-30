import React, {useCallback, useEffect, useState} from 'react';
import ProfileFormComponent from "../../../components/Seeker/ProfileFormComponent";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../../helpers";
import SEO from "../../../components/Common/SEO";
import { personalInfoActions } from '../../../store';
import SeekerProfileShow from '../../../components/Seeker/Profile/SeekerProfileShow';
import { Box, Divider, Grid, Paper, Skeleton, Stack, Typography, Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {Link as RouterLink} from "react-router-dom";

const SeekerProfile = () => {

    const {isLoggedIn} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) history.navigate('/')
        // eslint-disable-next-line
    }, [])

    const dispatch = useDispatch();
    const {personal_info: PersonalInfo} = useSelector((state) => state.personal_info);

    const initFetch = useCallback(() => {
        dispatch(personalInfoActions.get());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
        setLoading(false);
    }, [initFetch])

    return (
        <Box>
            <SEO title="Job Seeker Profile"/>
            <Paper
                sx={{
                    borderRadius: '10px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography variant="h5" py={3} px={{xs: 2, sm: 4}} color="primary">My Profile</Typography>
                        <Box py={3} px={4}>
                            <Button
                                variant="text"
                                startIcon={<BorderColorIcon/>}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                }}
                                component={RouterLink}
                                to="/seekers/profile/update"
                            >
                                Edit Profile
                            </Button>
                        </Box>
                    </Stack>
                    <Divider/>
                    {loading ? 
                        <Grid
                            container
                            direction='row'
                            justifyContent='start'
                            alignItems='center'
                            sx={{
                                px: 4,
                                py: 3
                            }}
                        >
                            <Grid item xs={12} md={8} lg={8} xl={8}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    pb: '10px'
                                }}
                            >
                                <Stack spacing={1} width="100%">
                                    <Skeleton width="120px"/>
                                    <Skeleton variant="rounded" width={134} height={134}/>
                                    <Skeleton width="90%"/>
                                    <Skeleton width="80%"/>
                                </Stack>
                            </Grid>
                        </Grid> : 
                        (Object.keys(PersonalInfo).length > 1 ?
                            <SeekerProfileShow/> :
                            <ProfileFormComponent/> )
                    }
                </Box>
            </Paper>
        </Box>
    );
}

export default SeekerProfile;