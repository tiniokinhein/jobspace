import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import {useDispatch, useSelector} from "react-redux";
import {jobPreferenceActions, latestExperienceActions, resumeActions, SeekerProfileActions} from '../../../store';
import StringAvatar from "../../../components/Common/StringAvatar";
import Resume from '../../../assets/images/resume_icon.svg'
import UploadImg from '../../../assets/images/upload.svg'
import Link from "@mui/material/Link";
import {Link as BrowserLink} from 'react-router-dom'
import Skeleton from "@mui/material/Skeleton";
import {setProgress} from "../../../store/slices/progress";
import SEO from "../../../components/Common/SEO";
import Cookie from "js-cookie";
import {helper} from "../../../helpers";

const SeekerHome = () => {

    const dispatch = useDispatch();
    const {job_preference} = useSelector(x => x.job_preference);
    const {latest_experience} = useSelector((state) => state.latest_experience);
    const {resume} = useSelector((state) => state.resume);
    const {user} = useSelector(x => x.auth);
    const [loading, setLoading] = useState(true);
    const url = process.env.REACT_APP_API_URL;

    const initFetch = useCallback(() => {
        dispatch(SeekerProfileActions.get());
        dispatch(jobPreferenceActions.get());
        dispatch(latestExperienceActions.get());
        dispatch(resumeActions.get());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setProgress(30))
        initFetch();
        setLoading(false);
        dispatch(setProgress(100))
        // eslint-disable-next-line
    }, [initFetch]);

    const downloadFile = (fileName, uploadedFileName) => {
        if (fileName) {
            fetch(`${url}/job-seeker/resume/file/${fileName}`,
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
                a.download = uploadedFileName;
                a.click();
            })
        }
    }
    return (
        <>
            {!loading ?
                <Fragment>
                    <SEO title="Account Home"/>
                    <Box sx={{
                        background: '#FFFFFF',
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                    }}>
                        <Box borderBottom={'1px solid #E8E8E8'} sx={{pt: {md: 4, sx: 3}, pb: 3, px: 2}}>
                            <Grid container spacing={2} alignItems={'center'}>
                                <Grid item xs={12} md={2}>
                                    <Box sx={{py: 0, display: 'flex', justifyContent: 'center'}}>
                                        <Avatar sx={{
                                            width: '82px', height: '82px', border: ' 1px solid #C4C4C4'
                                        }}>
                                            {user.job_seeker ?
                                                <Avatar alt={user.job_seeker?.full_name}
                                                        src={`${process.env.REACT_APP_URL}/storage/profiles/${user.job_seeker?.profile_img}`}
                                                        sx={{height: 80, width: 80, borderRadius: '50%'}}/> :
                                                <StringAvatar name={user.job_seeker?.full_name} width={80} height={80}/>}
                                        </Avatar>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box>
                                        <Typography fontWeight={500}
                                                    sx={{
                                                        textAlign: 'start',
                                                        color: '#000000',
                                                        fontSize: '18px',
                                                        pt: 1
                                                    }}>
                                            {user ? user.job_seeker?.full_name : '---'}
                                        </Typography>
                                        {(latest_experience?.job_title && latest_experience?.company_name) &&
                                        <Typography fontWeight={400}
                                                    sx={{
                                                        textAlign: 'start',
                                                        color: '#767676',
                                                        fontSize: '15px',
                                                        pt: 1
                                                    }}>
                                            {latest_experience?.job_title + ' : ' + latest_experience?.company_name}
                                        </Typography>
                                        }
                                    </Box>
                                </Grid>
                                {user.total_exp &&
                                <Grid item xs={12} md={3}>
                                    <Box>
                                        <Typography fontWeight={400} fontSize={'15px'} sx={{color: '#767676'}}>
                                            Experience
                                        </Typography>
                                        <Typography fontWeight={400} fontSize={'15px'} sx={{color: '#333333'}}>
                                            {user.total_exp}
                                        </Typography>
                                    </Box>
                                </Grid>
                                }

                                {(latest_experience.is_present && latest_experience?.notice_period) &&
                                    <Grid item xs={12} md={3}>
                                        <Box>
                                            <Typography fontWeight={400} fontSize={'15px'} sx={{color: '#767676'}}>
                                                Notice
                                            </Typography>
                                            <Typography fontWeight={400} fontSize={'15px'} sx={{color: '#333333'}}>
                                                {latest_experience?.notice_period?.title}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                }
                            </Grid>
                        </Box>

                        {Object.keys(resume).lenght > 0 &&
                            <Box sx={{borderBottom: '1px solid #E8E8E8', py: 3, px: 4}}>
                                <Container>
                                    <Typography sx={{fontSize: '20px', fontWeight: 500}}>
                                        Resume
                                    </Typography>
                                    <Grid container={true} spacing={1} sx={{py: 1}}>
                                        <Grid item xs={12} md={5} alignItems={'center'}>
                                            <Grid container>
                                                <Grid item xs={2} sm={1}>
                                                    <img src={Resume} alt={'resume'} width={'23px'}/>
                                                </Grid>
                                                <Grid item xs={8} sm={8}>
                                                    <Typography sx={{fontSize: '14 px', fontWeight: 400, color: '#585858'}}>
                                                        {resume.uploaded_file_name ?? '---'}
                                                    </Typography>
                                                    <Box display={'flex'}>
                                                        <Button
                                                            onClick={() => downloadFile(resume.file_name,resume.uploaded_file_name)}>Download</Button>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={2} sm={3}>
                                                    <Box>
                                                        <label htmlFor="icon-button-file">
                                                            <Link component={BrowserLink} to={"/seekers/upload-cv"}>
                                                                <IconButton color="primary" variant='outlined'
                                                                            aria-label="upload picture" component="span"
                                                                            sx={{my: "auto"}}>
                                                                    <img src={UploadImg} alt={'upload'}/>
                                                                </IconButton>
                                                            </Link>
                                                        </label>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Box>
                        }

                        <Box sx={{pt: 3, px: 4}}>
                            <Container>
                                <Typography sx={{fontSize: '20px', fontWeight: 500}}>
                                    Job Preference
                                </Typography>
                                <Grid container spacing={1} sx={{py: 3}}>
                                    <Grid item sm={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Industry :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={7} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                            {
                                                job_preference.preferred_industries &&
                                                job_preference.preferred_industries.length > 0 ?
                                                    job_preference.preferred_industries.map((item, index) => {
                                                        if (index + 1 === job_preference.preferred_industries.length) {
                                                            return item?.title
                                                        } else {
                                                            return item?.title + ', '
                                                        }
                                                    }) : '---'
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Job Title :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={7} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                            {/* Full time */}
                                            {job_preference && job_preference.job_title ? job_preference.job_title : '---'}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Job Type :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={7} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                            {job_preference && job_preference.job_type ? job_preference.job_type?.title : '---'}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Job Category :
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={7} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                            {
                                                job_preference.preferred_job_categories &&
                                                job_preference.preferred_job_categories.length > 0 ?
                                                    job_preference.preferred_job_categories.map((item, index) => {
                                                        if (index + 1 === job_preference.preferred_job_categories.length) {
                                                            return item.title
                                                        } else {
                                                            return item.title + ', '
                                                        }
                                                    }) : '---'
                                            }
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Expected Salary:
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={7} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                            {/* 150,000 */}
                                            {job_preference && job_preference.salary ? helper.nFormat(job_preference.salary ?? '') : '---'}&nbsp;
                                            {job_preference ? job_preference.currency?.name : '---'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                    </Box>

                    {
                        (user.job_seeker_experiences &&
                            user.job_seeker_experiences.length > 0) ?
                            <Box sx={{
                                background: '#FFFFFF', my: 2, py: 2, px: {xs: 0, md: 4},
                                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                            }}>
                                <Container>
                                    <Box sx={{mx: {xs: 0, md: 0}, py: 3}}>
                                        <Typography sx={{fontSize: '20px', fontWeight: 500}}>
                                            Working Experience
                                        </Typography>
                                        <List
                                            component="nav"
                                            aria-labelledby="nested-list-subheader"
                                        >
                                            {
                                                user.job_seeker_experiences.map((item) => (
                                                    <ListItem key={item.uuid} sx={{py: 3, px: 0}}>
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={12} md={4}>
                                                                <Box display={'flex'}>
                                                                    <ListItemAvatar
                                                                        sx={{
                                                                            color: '#C4C4C4',
                                                                            minWidth: '25px'
                                                                        }}>
                                                                        <CircleIcon fontSize={'inherit'}/>
                                                                    </ListItemAvatar>
                                                                    <Typography
                                                                        sx={{
                                                                            color: '#C4C4C4',
                                                                            fontSize: '16px',
                                                                            fontWeight: 500
                                                                        }}>
                                                                        {item.start_date_dec}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            color: '#C4C4C4',
                                                                            mx: 1,
                                                                        }}
                                                                        component={'span'}> - </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            color: '#C4C4C4',
                                                                            fontSize: '16px',
                                                                            fontWeight: 500
                                                                        }}
                                                                    >
                                                                        {item.is_present === 1 ? 'Present' : item.end_date_dec}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item xs={12} md={8}>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '16px',
                                                                        fontWeight: 500,
                                                                        color: '#585858'
                                                                    }}>
                                                                    {item.job_title}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '16px',
                                                                        fontWeight: 500,
                                                                        color: '#A1A1A1'
                                                                    }}>
                                                                    {item.company_name}
                                                                </Typography>

                                                                <Grid container sx={{mt: 1}}>
                                                                    <Grid item xs={4}>
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: '14px',
                                                                                fontWeight: 400,
                                                                                color: '#A1A1A1'
                                                                            }}>
                                                                            Industry:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        <Typography sx={{
                                                                            mx: 1,
                                                                            fontSize: '14px',
                                                                            fontWeight: 400,
                                                                            color: '#333333'
                                                                        }}>
                                                                            {item.industry?.title}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container sx={{mt: 1}}>
                                                                    <Grid item xs={4}>
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: '14px',
                                                                                fontWeight: 400,
                                                                                color: '#A1A1A1'
                                                                            }}>
                                                                            Role:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        <Typography sx={{
                                                                            mx: 1,
                                                                            fontSize: '14px',
                                                                            fontWeight: 400,
                                                                            color: '#333333'
                                                                        }}>
                                                                            {item.job_role?.title}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid container sx={{mt: 1}}>
                                                                    <Grid item xs={4}>
                                                                        <Typography
                                                                            sx={{
                                                                                fontSize: '14px',
                                                                                fontWeight: 400,
                                                                                color: '#A1A1A1'
                                                                            }}>
                                                                            Monthly Salary:
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={7}>
                                                                        <Typography sx={{
                                                                            px: 1,
                                                                            fontSize: '14px',
                                                                            fontWeight: 400,
                                                                            color: '#333333'
                                                                        }}>
                                                                            {helper.nFormat(item.salary ?? '')} {item.currency?.name}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>

                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                        fontWeight: 400,
                                                                        color: '#000000',
                                                                        my: 1
                                                                    }}>
                                                                    {item.description}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                    </Box>
                                </Container>
                            </Box>
                            : null
                    }

                    {user.job_seeker_educations &&
                    user.job_seeker_educations.length > 0 ?
                        <Box sx={{
                            background: '#FFFFFF', my: 2, py: 2, px: {xs: 0, md: 4},
                            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                        }}>
                            <Container>
                                <Box sx={{mx: {xs: 0, md: 0}, py: 3}}>
                                    <Typography sx={{fontSize: '20px', fontWeight: 500, pb: 2}}>
                                        Educational Details
                                    </Typography>
                                    {
                                        user.job_seeker_educations &&
                                        user.job_seeker_educations.length > 0 ?
                                            user.job_seeker_educations.map((item) => (
                                                <Grid container key={item.uuid}>
                                                    <Grid item xs={12} md={4}>
                                                        <Box display={'flex'}>
                                                            <ListItemAvatar
                                                                sx={{color: '#C4C4C4', mt: 0.8, minWidth: '25px'}}>
                                                                <CircleIcon fontSize={'inherit'}/>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                sx={{
                                                                    color: '#C4C4C4',
                                                                    fontSize: '16px',
                                                                    fontWeight: 500
                                                                }}
                                                                primary={item.graduation_date}/>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={12} md={7} sx={{mx: 1}}>
                                                        <Typography
                                                            sx={{fontSize: '16px', fontWeight: 500, color: '#585858'}}>
                                                            {item.qualification?.title}
                                                        </Typography>
                                                        <Typography
                                                            sx={{fontSize: '16px', fontWeight: 500, color: '#A1A1A1'}}>
                                                            {item.school_name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            ))
                                            : '---'
                                    }
                                </Box>
                            </Container>
                        </Box>
                        : ''
                    }

                    <Box sx={{
                        background: '#FFFFFF', my: 2, py: 2, px: {xs: 0, md: 4},
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                    }}>

                        <Box sx={{mx: {xs: 0, md: 0}, py: 3}} borderBottom={'1px solid #E8E8E8'}>
                            <Container>
                                <Typography sx={{fontSize: '20px', fontWeight: 500}}>
                                    Personal Details
                                </Typography>

                                <Grid container spacing={1} sx={{py: 2}}>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Gender
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                            {/* {personalDetails.gender} */}
                                            {user.job_seeker?.gender === 1 ? 'Male' : 'Female'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Marital Status
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                            {user.job_seeker?.marital === 1 ? 'Single' : 'Married'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            NRC
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        {user.job_seeker ?
                                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                                {user?.job_seeker.nrc}
                                            </Typography>
                                            : '---'
                                        }
                                    </Grid>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Email Address
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        {user.job_seeker ?
                                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                                {user?.job_seeker?.email ?? user.email}
                                            </Typography>
                                            : '---'}
                                    </Grid>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Permanent Address
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        {user.job_seeker ?
                                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                                {user.job_seeker.street ? user.job_seeker.street + ' ,' : null }
                                                {user.job_seeker.township?.title ? user.job_seeker.township?.title + ' ,': null}
                                                {user.job_seeker.region?.title}
                                            </Typography>
                                            : '---'
                                        }
                                    </Grid>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Date of Birth
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        {user.job_seeker ?
                                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                                {user.job_seeker.dob}
                                            </Typography>
                                            :
                                            '---'}
                                    </Grid>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Nationality
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        {user.job_seeker ?
                                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                                {user.job_seeker.nationality?.title}
                                            </Typography>
                                            :
                                            '---'
                                        }
                                    </Grid>
                                    <Grid item xs={4} md={5} sx={{py: 1}}>
                                        <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                            Short bio
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} md={7} sx={{py: 1}}>
                                        {user.job_seeker ?
                                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                                {user.job_seeker.short_bio}
                                            </Typography>
                                            :
                                            '---'
                                        }
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>

                        {user.job_seeker_skills &&
                        user.job_seeker_skills.length > 0 ?
                            <Box borderBottom={'1px solid #E8E8E8'}>

                                <Container sx={{py: 3}} >
                                    <Typography sx={{fontSize: '20px', fontWeight: 500}}>
                                        Skills
                                    </Typography>
                                    <Grid container sx={{py: 2}}>
                                        <Grid container item xs={12} md={12} sx={{py: 1}}>
                                            <Grid item xs={12} md={6}>
                                                <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                                    Skill
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                                    Proficiency
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {
                                            user.job_seeker_skills &&
                                            user.job_seeker_skills.length > 0 ?
                                                user.job_seeker_skills.map((item) => (
                                                    <Fragment key={item.uuid}>
                                                        <Grid container item xs={12} md={12} sx={{py: 1}}>
                                                            <Grid item xs={12} md={6}>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '15px',
                                                                        fontWeight: '400',
                                                                        color: '#585858'
                                                                    }}>
                                                                    {item.skill?.title}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '15px',
                                                                        fontWeight: '400',
                                                                        color: '#585858'
                                                                    }}>
                                                                    {item.proficiency?.title}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Fragment>
                                                ))
                                                :
                                                '---'
                                        }
                                    </Grid>
                                </Container>
                            </Box>
                            : ''
                        }
                        <Container sx={{py: 3}}>
                            <Typography sx={{fontSize: '20px', fontWeight: 500}}>
                                Languages Known
                            </Typography>
                            <Grid container sx={{py: 2}}>
                                <Grid container item xs={12} md={6} sx={{py: 1}}>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                            Language
                                            <Typography component={"span"} sx={{color: '#B71C1C'}}>
                                                *
                                            </Typography>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                            Proficiency
                                            <Typography component={"span"} sx={{color: '#B71C1C'}}>
                                                *
                                            </Typography>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} md={6} spacing={1} sx={{py: 1}}>
                                    <Grid item xs={4} md={4}>
                                        <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                            Read
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                            Write
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                            Speak
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {
                                    user.job_seeker_language_skills &&
                                    user.job_seeker_language_skills.length > 0 ?
                                        user.job_seeker_language_skills.map((item) => (
                                            <Fragment key={item.uuid}>
                                                <Grid container item xs={12} md={6} sx={{py: 1}}>
                                                    <Grid item xs={12} md={6}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '15px',
                                                                fontWeight: '400',
                                                                color: '#585858'
                                                            }}>
                                                            {item.job_language?.title} {item.is_primary === 1 ? "(Primary)" : ''}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '15px',
                                                                fontWeight: '400',
                                                                color: '#585858'
                                                            }}>
                                                            {item.proficiency?.title}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item container xs={12} md={6} spacing={1} sx={{py: 1}}>
                                                    <Grid item xs={4} md={4}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '15px',
                                                                fontWeight: '400',
                                                                color: '#585858'
                                                            }}>
                                                            {item.is_read === 1 ? 'Yes' : 'No'}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} md={4}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '15px',
                                                                fontWeight: '400',
                                                                color: '#585858'
                                                            }}>
                                                            {item.is_write === 1 ? 'Yes' : 'No'}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} md={4}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '15px',
                                                                fontWeight: '400',
                                                                color: '#585858'
                                                            }}>
                                                            {item.is_speak === 1 ? 'Yes' : 'No'}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ))
                                        :
                                        '---'
                                }
                            </Grid>
                        </Container>
                    </Box>
                </Fragment>
                :
                <Box>
                    <Skeleton variant="rounded" animation="wave" height={580} sx={{my: 2}}/>
                    <Skeleton variant="rounded" animation="wave" height={320}/>
                </Box>
            }
        </>
    )
}

export default SeekerHome