import React, {Fragment} from 'react'
import {Box, Button, Card, CardActions, CardContent, Grid, Link, Skeleton, Stack, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import UrgentIcon from "../RecentJob/UrgentIcon";
import PremiumIcon from "../RecentJob/PremiumIcon";
import JobPostShare from "./JobPostShare";
import {useSelector} from "react-redux";
import WhitelistJob from "../Job/WhitelistJob";
import {useTranslation} from "react-i18next";
import RobotImg from '../../assets/images/robot.png';
import VacancyIcon from "../../assets/icons/Vacancy.png";
import ExperienceIcon from "../../assets/icons/ExperienceorMyExperiences.png";
import BasicSalaryIcon from "../../assets/icons/BasicSalary.png";
import LocationIcon from "../../assets/icons/Location.png";
import {helper} from "../../helpers";

const JobPost = ({data, loading}) => {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const {isLoggedIn} = useSelector((state => state.auth));
    const {isEmpLoggedIn} = useSelector((state) => state.empAuth);

    const handleApply = (uuid) => {
        navigate(`/jobs/${uuid}/detail`)
    }

    return (
        <Fragment>
            {loading &&
                <Card
                    elevation={1}
                    sx={{
                        m: 2,
                        background: '#FFFFFF',
                        borderRadius: '10px',
                    }}
                >
                    <CardContent sx={{px: 4, py: 3}}>
                        <Skeleton animation="wave" width="30%"/>
                        <Skeleton animation="wave" width="15%"/>
                        <Skeleton animation="wave" width="50%"/>
                    </CardContent>

                    <CardActions disableSpacing sx={{px: 4, background: '#F7F5F5'}}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            justifyItems="center"
                            alignItems="center"
                            width="100%"
                        >
                            <Skeleton animation="wave" width="20%"/>
                        </Stack>
                    </CardActions>
                </Card>
            }

            {
                !loading && data.length > 0 ?
                    data.map((item) => (
                        <Card
                            key={item.uuid}
                            elevation={1}
                            sx={{
                                m: 2,
                                background: '#FFFFFF',
                                borderRadius: '10px',
                                boxShadow: item.is_highlight ? 5 : 1,
                            }}
                        >
                            <CardContent
                                sx={{
                                    px: 4,
                                    py: 3,
                                    backgroundColor: item.is_highlight ? '#8ED8F8' : 'white',
                                }}
                            >
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    justifyItems="center"
                                    alignItems="center"
                                >
                                    <Stack direction="row" spacing={2}>
                                        <Typography align="left" fontSize="18px" color="secondary" variant="span"
                                                    fontWeight={500}>
                                            <Link component={RouterLink} to={`/jobs/${item.uuid}/detail`}
                                                  underline="hover">
                                                {item.job_title ?? null}
                                            </Link>
                                        </Typography>
                                        <UrgentIcon isUrgent={item.is_urgent ?? false}/>
                                    </Stack>

                                    <PremiumIcon isPremium={item.is_premium ?? false}/>
                                </Stack>

                                <Box>
                                    <Typography fontSize="14px" fontWeight={500}>
                                        <Link to={item.company?.uuid ? `/companies/${item.company?.uuid}/details` : '#'}
                                              component={RouterLink} underline="hover" color="inherit">
                                            {item.company?.company_name}
                                        </Link>
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={10} gap={4} mt={2} alignItems="center">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6} md={3.5} display="flex" alignItems="start">
                                            <Box display="flex" alignItems="start">
                                                <Box marginTop="2px">
                                                    <img src={LocationIcon} alt="industry" width="20" height="20"/>
                                                </Box>
                                                <Box marginLeft={1}>
                                                    {item.country?.title === 'Myanmar' ?
                                                        <Typography fontSize="14px" color="#525252">
                                                            {`${item.region?.title} | ${item.township?.title}`}
                                                        </Typography> : <Typography fontSize="14px" color="#525252">
                                                            {`${item.country?.title}`}
                                                        </Typography>}

                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={6} md={3} display="flex" alignItems="start">
                                            <Box display="flex" alignItems="start">
                                                <Box marginTop="3px">
                                                    <img src={ExperienceIcon} alt="industry" width="20" height="20"/>
                                                </Box>
                                                <Box marginLeft={1}>
                                                    <Typography variant="span" fontSize="14px" color="#525252">
                                                        {item.experience_length?.title}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={6} md={3.5} display="flex" alignItems="start">
                                            <Box display="flex" alignItems="start">
                                                <Box marginTop="2px">
                                                    <img src={BasicSalaryIcon} alt="industry" width="20" height="20"/>
                                                </Box>
                                                <Box marginLeft={1}>
                                                    {
                                                        isLoggedIn || isEmpLoggedIn ?
                                                            (item.salary_type === 1 ?
                                                                <Typography variant="span" fontSize="14px"
                                                                            color="#525252">Negotiate</Typography> :
                                                                (item.salary_type === 2 ?
                                                                    <Typography variant="span" fontSize="14px"
                                                                                color="#525252">Confidential</Typography> :
                                                                    <Typography variant="span" fontSize="14px"
                                                                                color="#525252"
                                                                                sx={{lineBreak: 'anywhere'}}>
                                                                        {helper.nFormat(item.min_salary ?? '')}&nbsp;-&nbsp;{helper.nFormat(item.max_salary ?? '')}
                                                                        &nbsp;{item.currency?.name}
                                                                    </Typography>)) :
                                                            <Typography variant="span" fontSize="14px" color="#525252">
                                                                <Link underline='always' component={RouterLink}
                                                                      to="/seekers/sign-in">
                                                                    Login to View
                                                                </Link>
                                                            </Typography>
                                                    }
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={6} md={2} display="flex" alignItems="start">
                                            <Box display="flex" alignItems="start">
                                                <Box marginTop="3px">
                                                    <img src={VacancyIcon} alt="industry" width="20" height="20"/>
                                                </Box>
                                                <Box marginLeft={1}>
                                                    <Typography variant="span" fontSize="14px" color="#525252">
                                                        {item.vacancy} {item.vacancy === 1 ? 'Post' : 'Posts'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </CardContent>

                            <CardActions disableSpacing sx={{
                                px: {xs: 2, md: 4},
                                background: item.is_highlight ? '#85CCEB' : '#F7F5F5',
                            }}>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    justifyItems="center"
                                    alignItems="center"
                                    width="100%"
                                >
                                    <Typography
                                        sx={{fontSize: '14px', color: '#585858', width: '100%'}}>
                                        Posted {item.time}
                                    </Typography>
                                    <Stack direction="row" gap={3}>
                                        <WhitelistJob jobUuid={item.uuid} isChecked={item.is_whitelisted}/>
                                        <JobPostShare/>
                                        <Button
                                            disabled={item.is_applied}
                                            size="small"
                                            sx={{
                                                ml: 1,
                                                color: '#FFF',
                                                width: '110px',
                                                height: '36px',
                                                borderRadius: '7px',
                                                background: 'linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)',
                                            }}
                                            onClick={() => handleApply(item.uuid)}
                                        >
                                            {item.is_applied ? t('applied') : t('apply')}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </CardActions>
                        </Card>
                    )) : !loading &&
                    <Stack height="100%" sx={{alignItems: 'center', justifyContent: 'top', display: 'flex'}}
                           spacing={2}>
                        <img src={RobotImg} alt='not found' width="10%"/>
                        <Typography
                            fontSize="16px"
                            fontWeight={500}
                            align="center"
                            color="#585858"
                        >
                            We couldn't find any jobs matching your search .
                        </Typography>
                    </Stack>
            }
        </Fragment>
    );
}

export default JobPost;