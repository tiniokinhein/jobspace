import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Box, Button, Container, Divider, Grid, Typography} from "@mui/material";
import SEO from "../../../components/Common/SEO";
import ApplicantInfo from "../../../components/Employer/PostedJobDetail/ApplicantInfo";
import {helper} from "../../../helpers";
import {useDispatch, useSelector} from "react-redux";
import {applicantActions} from "../../../store";
import {setProgress} from "../../../store/slices/progress";

const ApplicantProfile = () => {

    const dispatch = useDispatch();
    const {applicantId} = useParams();
    const [loading, setLoading] = useState(true);
    const {info: applicantInfo} = useSelector(state => state.applicants);

    const fetchInit = useCallback(() => {
        setProgress(50);
        dispatch(applicantActions.getInfo(applicantId)).then(() => {
            setProgress(100);
            setLoading(false);
        });
        // eslint-disable-next-line
    }, [dispatch])

    useEffect(() => {
        if (applicantId) {
            fetchInit();
        }
        // eslint-disable-next-line
    }, [fetchInit])

    return (
        <Container maxWidth="xl">
            <SEO title="Applicant Profile"/>
            <Box sx={{padding: {lg: '0px 30px', xl: 0}}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                mt: 3,
                                background: 'white',
                                borderRadius: '10px',
                                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography
                                    variant="h5"
                                    py={3}
                                    px={4}
                                    color="primary"
                                >
                                    Applicant's Profile
                                </Typography>
                                <Divider/>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid item xs={12} md={8} sx={{mt: 4}}>
                                        <Grid container justifyContent="center">
                                            <Grid item xs={12}>
                                                {(!loading && Object.keys(applicantInfo).length > 0) &&
                                                    <ApplicantInfo applicantInfo={applicantInfo} square={true}/>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} md={8} sx={{my: 3}} alignItems="flex-start"
                                          justifyContent="center" display="flex">
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            sx={{
                                                width: '200px',
                                                height: '54px'
                                            }}
                                            onClick={() => helper.handleBackClick()}
                                        >
                                            Back
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default ApplicantProfile;