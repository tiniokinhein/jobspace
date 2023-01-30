import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {abilitiesActions, jobsActions} from "../../store";
import SEO from "../../components/Common/SEO";
import {Avatar, Box, Button, Divider, Grid, Typography} from "@mui/material";
import Urgent from "../../assets/images/urgent.png";
import Checkbox from "@mui/material/Checkbox";
import Highlight from "../../assets/images/highlight.png";
import TopJob from "../../assets/images/top-job.png";
import {Link as RouterLink, useParams} from "react-router-dom";
import {setMessage, setOpen} from "../../store/slices/message.slice";
import {history} from "../../helpers";

const PromoteJobPost = () => {
    const dispatch = useDispatch();
    const {jobPostId} = useParams();
    const [urgent, setUrgent] = useState(true);
    const [topJob, setTopJob] = useState(true);
    const [highlight, setHighlight] = useState(true);
    const [urgentCheck, setUrgentCheck] = useState(false);
    const [topJobCheck, setTopJobCheck] = useState(false);
    const [highlightCheck, setHighlightCheck] = useState(false);

    const fetchData = useCallback(() => {
        dispatch(abilitiesActions.getAll()).then(r => {
            if (r.payload.data?.job_post?.highlight > 0) {
                setHighlight(false);
            }

            if (r.payload.data?.job_post?.urgent > 0) {
                setUrgent(false);
            }

            if (r.payload.data?.job_post?.top > 0) {
                setTopJob(false);
            }
        });
        // eslint-disable-next-line
    }, [dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleCheckUrgent = (event) => {
        setUrgentCheck(event.target.checked);
    };
    const handleCheckHighlight = (event) => {
        setHighlightCheck(event.target.checked);
    };
    const handleCheckTopJob = (event) => {
        setTopJobCheck(event.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        let payload = {
            is_urgent: urgentCheck ? 1 : 0,
            is_highlight: highlightCheck ? 1 : 0,
            is_top: topJobCheck ? 1 : 0
        };

        if (jobPostId) {
            dispatch(jobsActions.promote({uuid: jobPostId, data: payload})).then(() => {
                dispatch(setMessage('Your application was promoted.'))
                dispatch(setOpen(true));
                history.navigate('/employers/posted-jobs')
            });
        }
    }

    return (
        <Box
            sx={{
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <SEO title="Promote Job"/>
            <Box sx={{display: 'flex', flexDirection: 'column'}} disabled component="form" onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'row',}}>
                    <Avatar sx={{bgcolor: '#D5F4CA', width: '38px', height: '38px', m: 3}}>
                        <Avatar sx={{bgcolor: '#49CA1C', width: '22px', height: '22px'}}> </Avatar>
                    </Avatar>
                    <Typography sx={{my: 'auto', px: 1, fontSize: '24px'}}>
                        Your Job Post is active.
                    </Typography>
                </Box>
                <Divider/>

                <Grid container sx={{px: 2}} align="start">
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography sx={{py: 3, px: 2, fontSize: '16px', color: '#333333'}}>
                            Now, promote it to get more applicants.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} sx={{px: 4, py: 3}} align='center'>
                        <img src={Urgent} width='70%' alt='urgent'/>
                        <Box sx={{border: '1px solid #00A0DC', borderRadius: '10px', mt: 3}}>
                            <Box sx={{px: 2}}>
                                <Typography align='right' sx={{mt: 1, color: '#FF9635'}}
                                            fontSize='14px'>Recommended</Typography>
                                <Typography align='left' sx={{fontWeight: 500, fontSize: '16px'}}>Urgent Job
                                    Post</Typography>
                            </Box>
                            <Divider sx={{width: '100%', my: 2}}/>
                            <Box sx={{px: 2}}>
                                <Typography sx={{fontSize: '14px', color: '#0E0E2C', minHeight: '63px'}} align="left">
                                    Urgent Job Post is the best way to announce you want a quick hire.
                                </Typography>
                                <Box sx={{display: 'flex', mt: 1}} justifyContent="center">
                                    <Checkbox
                                        sx={{
                                            color: "#00A0DC",
                                            '&.Mui-disabled': {
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                },
                                            },
                                        }}
                                        checked={urgentCheck}
                                        disabled={!!urgent}
                                        onChange={handleCheckUrgent}
                                        inputProps={{'aria-label': 'controlled'}}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} sx={{px: 4, py: 3}} align='center'>
                        <img src={Highlight} width='70%' alt='highlight'/>
                        <Box sx={{border: '1px solid #00A0DC', borderRadius: '10px', mt: 3}}>
                            <Box sx={{px: 2}}>
                                <Typography align='right' sx={{mt: 1, color: '#FF9635'}}
                                            fontSize='14px'>Recommended</Typography>
                                <Typography align='left' sx={{fontWeight: 500, fontSize: '16px'}}>Highlight</Typography>
                            </Box>
                            <Divider sx={{width: '100%', my: 2}}/>
                            <Box sx={{px: 2}}>
                                <Typography sx={{fontSize: '14px', minHeight: '63px'}} align="left">
                                    Highlight your job post to gain visibility and stand out from the crowd.
                                </Typography>
                                <Box sx={{display: 'flex', mt: 1}} justifyContent="center">
                                    <Checkbox
                                        sx={{
                                            color: "#00A0DC",
                                            '&.Mui-disabled': {
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                },
                                            },
                                        }}
                                        disabled={!!highlight}
                                        checked={highlightCheck}
                                        onChange={handleCheckHighlight}
                                        inputProps={{'aria-label': 'controlled'}}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} sx={{px: 4, py: 3}} align='center'>
                        <img src={TopJob} width='70%' alt='top job post'/>
                        <Box sx={{border: '1px solid #00A0DC', borderRadius: '10px', mt: 3}}>
                            <Box sx={{px: 2}}>
                                <Typography align='right' sx={{mt: 1, color: '#FF9635'}}
                                            fontSize='14px'>Recommended</Typography>
                                <Typography align='left' sx={{fontWeight: 500, fontSize: '16px'}}>Top Job
                                    Post</Typography>
                            </Box>
                            <Divider sx={{width: '100%', my: 2}}/>
                            <Box sx={{px: 2}}>
                                <Typography sx={{fontSize: '14px', minHeight: '63px'}} align="left">
                                    Show your job post on rotation at the top of pages.
                                </Typography>
                                <Box sx={{display: 'flex', mt: 1}} justifyContent="center">
                                    <Checkbox
                                        sx={{
                                            color: "#00A0DC",
                                            '&.Mui-disabled': {
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                },
                                            },
                                        }}
                                        disabled={!!topJob}
                                        checked={topJobCheck}
                                        onChange={handleCheckTopJob}
                                        // disabled={topJob === 0}
                                        inputProps={{'aria-label': 'controlled'}}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{py: 3}} align='center'>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{
                                mx: 'auto',
                                width: '170px',
                                height: '51px',
                                borderRadius: '6px',
                                color: 'white',
                                mr: 2
                            }}
                            component={RouterLink}
                            to="/employers/posted-jobs"
                        >
                            Go to posted jobs
                        </Button>
                        <Button
                            sx={{
                                mx: 'auto',
                                width: '170px',
                                height: '51px',
                                background: 'linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)',
                                borderRadius: '6px',
                                color: 'white'
                            }}
                            type="submit"
                            disabled={!!highlight && !!urgent && !!topJob}
                        >
                            Promote
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default PromoteJobPost;