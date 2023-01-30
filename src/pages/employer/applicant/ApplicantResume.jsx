import React, {useCallback, useEffect, useState} from 'react';
import SEO from "../../../components/Common/SEO";
import {Avatar, Box, Button, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import PdfViewer from "../../../components/Common/PdfViewer";
import DocViewer from "../../../components/Common/DocViewer";
import {useDispatch, useSelector} from "react-redux";
import {applicantActions} from "../../../store";
import {useParams} from "react-router-dom";
import {helper, history} from "../../../helpers";
import Cookie from "js-cookie";
import PrintIcon from '@mui/icons-material/Print';

function ApplicantResume() {

    const dispatch = useDispatch();
    const {applicantId} = useParams();
    const [path, setPath] = useState(null);
    const {resume} = useSelector((state) => state.applicants);

    const fetchResume = useCallback(() => {
        if (applicantId) {
            dispatch(applicantActions.getResume(applicantId)).then(res => {
                if (res.payload.data?.path) {
                    setPath(`${process.env.REACT_APP_API_URL}/job-seeker/resume/file/${res.payload.data?.path}`);
                }
            });
        } else {
            history.navigate('/404')
        }
    }, [applicantId, dispatch]);

    useEffect(() => {
        fetchResume();
    }, [fetchResume]);

    const downloadFile = () => {
        dispatch(applicantActions.getResume(applicantId)).then(res => {
            if (res.payload.data?.path) {
                fetch(`${process.env.REACT_APP_API_URL}/job-seeker/resume/file/${res.payload.data?.path}`,
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
                    a.download = res.payload.data?.path;
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
                                                {(Object.keys(resume).length > 0 && path) &&
                                                resume?.file_type === 'pdf' ? <PdfViewer path={path}/> :
                                                    (resume?.file_type === 'doc' || resume?.file_type === 'docx') ?
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

export default ApplicantResume