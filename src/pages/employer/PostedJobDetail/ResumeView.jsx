import React, {useCallback, useEffect, useState} from 'react';
import SEO from "../../../components/Common/SEO";
import {Avatar, Box, Button, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import PdfViewer from "../../../components/Common/PdfViewer";
import DocViewer from "../../../components/Common/DocViewer";
import {useDispatch, useSelector} from "react-redux";
import {resumeActions} from "../../../store";
import {useParams} from "react-router-dom";
import {helper, history} from "../../../helpers";
import Cookie from "js-cookie";
import PrintIcon from '@mui/icons-material/Print';

function ResumeView() {

    const dispatch = useDispatch();
    const {jobPostId, applicantId} = useParams();
    const [path, setPath] = useState(null);
    const [loading, setLoading] = useState(true);
    const {applicantResume} = useSelector((state) => state.resume);

    const fetchResume = useCallback(() => {
        if (jobPostId && applicantId) {
            dispatch(resumeActions.getApplicantResume({pId: jobPostId, uId: applicantId})).then(res => {
                if (res.payload.path) {
                    setPath(`${process.env.REACT_APP_API_URL}/job-seeker/resume/file/${res.payload.path}`);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
        } else {
            history.navigate('/404')
        }
        // eslint-disable-next-line
    }, [applicantId]);

    useEffect(() => {
        fetchResume();
    }, [fetchResume]);

    const downloadFile = () => {
        dispatch(resumeActions.getApplicantResume({pId: jobPostId, uId: applicantId})).then(res => {
            if (res.payload?.path) {
                fetch(`${process.env.REACT_APP_API_URL}/job-seeker/resume/file/${res.payload.path}`,
                    {
                        method: "get",
                        headers: {
                            "Content-Type": "application/json",
                            'X-XSRF-TOKEN': decodeURIComponent(Cookie.get('XSRF-TOKEN')),
                        },
                    }).then(response => response.blob()).then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = res.payload?.path;
                    a.click();
                })
            }
        });
    }

    return (
        <Container maxWidth="xl">
            <SEO title="ApplicantList Profile"/>
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
                                <Box sx={{display: 'flex', flexDirection: 'row',}}>
                                    <Avatar sx={{bgcolor: '#D5F4CA', width: '30px', height: '30px', m: 2}}>
                                        <Avatar sx={{bgcolor: '#49CA1C', width: '22px', height: '22px'}}> </Avatar>
                                    </Avatar>
                                    <Typography sx={{my: 'auto'}} variant="h6" color="primary">
                                        See CV
                                    </Typography>
                                </Box>
                                <Divider/>

                                <Grid container>
                                    <Grid item xs={12}>
                                        <Grid container justifyContent="center">
                                            <Grid item xs={12}>
                                                {(!loading && Object.keys(applicantResume).length > 0) &&
                                                    applicantResume?.file_type === 'pdf' ? <PdfViewer path={path}/> :
                                                        (applicantResume?.file_type === 'doc' || applicantResume?.file_type === 'docx') ?
                                                        <DocViewer path={path}/> : null
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sx={{py: 2}}>
                                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
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

                                            <Button
                                                variant="contained"
                                                sx={{
                                                    width: '200px',
                                                    height: '54px',
                                                    background: 'linear-gradient(274.94deg, #0C81AC -12.35%, #00A0DC 114.64%)'
                                                }}
                                                onClick={downloadFile}
                                                startIcon={<PrintIcon/>}
                                            >
                                                Download CV
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default ResumeView