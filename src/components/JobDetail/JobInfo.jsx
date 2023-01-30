import React from 'react';
import {Grid, Link, Paper, Stack, Typography} from "@mui/material";
import BasicSalaryIcon from "../../assets/icons/BasicSalary.png";
import LocationIcon from "../../assets/icons/Location.png";
import IndustryIcon from "../../assets/icons/Industry.png";
import JobTypeIcon from "../../assets/icons/JobTypes.png";
import GenderIcon from "../../assets/icons/gender.png";
import QualificationIcon from "../../assets/icons/QualificationorMyEducations.png";
import VacancyIcon from "../../assets/icons/Vacancy.png";
import ExperienceIcon from "../../assets/icons/ExperienceorMyExperiences.png";
import {styled} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {helper} from "../../helpers";

const JobInfo = ({data}) => {

    const {isLoggedIn} = useSelector((state) => state.auth);
    const {isEmpLoggedIn} = useSelector((state) => state.empAuth);

    return (<Paper
            variant="outlined"
            sx={{
                mt: 2, borderRadius: '7px', borderColor: "#ECECEC", paddingX: {xs: "16px", md: "39px"}, paddingY: "25px"
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2}>
                            <img src={BasicSalaryIcon} alt="gender" width="25" height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Basic Salary</StyledLabel>
                                {isLoggedIn || isEmpLoggedIn ? <>
                                    {data.salary_type === 1 ?
                                        <StyledTypography>Negotiate</StyledTypography> : (data.salary_type === 2 ?
                                            <StyledTypography>Confidential</StyledTypography> : <StyledTypography>
                                                {helper.nFormat(data.min_salary ?? '')}&nbsp;-&nbsp;{helper.nFormat(data.max_salary ?? '')}
                                                &nbsp;{data.currency?.name}
                                            </StyledTypography>)}
                                </> : <StyledTypography>
                                    <Link underline='always' component={RouterLink} to="/seekers/sign-in">Login to
                                        View</Link>
                                </StyledTypography>}
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="start">
                            <img src={IndustryIcon} alt="industry" width="25" height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Industry</StyledLabel>
                                <StyledTypography>{data.industry?.title}</StyledTypography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{mt: {xs: 2, sm: 0}}} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="start">
                            <img src={GenderIcon} alt="gender" width="25" height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Gender</StyledLabel>
                                <StyledTypography>
                                    {data.gender === 1 ? 'Male' : data.gender === 2 ? 'Female' : data.gender === 3 ? 'Male/Female' : '---'}
                                </StyledTypography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{mt: {xs: 2, sm: 0}}} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="start">
                            <img src={VacancyIcon} alt="Vacancy" width="25" height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Vacancy</StyledLabel>
                                <StyledTypography>{data.vacancy}&nbsp;Posts</StyledTypography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{mt: {xs: 2, sm: 0}}} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="start">
                            <img src={LocationIcon} alt="location" width="25" height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Location</StyledLabel>
                                {data.country?.title === 'Myanmar' ? <StyledTypography>{data.region?.title}&nbsp;|&nbsp;{data.township?.title}
                                </StyledTypography> : <StyledTypography>
                                    {data.country?.title}
                                </StyledTypography>}

                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{mt: {xs: 2, sm: 0}}} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="start">
                            <img src={JobTypeIcon} alt="job type" width="25" height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Job Types</StyledLabel>
                                <StyledTypography>
                                    {data.job_type?.title}
                                </StyledTypography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{mt: {xs: 2, sm: 0}}} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="start">
                            <img src={QualificationIcon} alt="qualification" width="25"
                                 height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Qualification</StyledLabel>
                                {data.qualifications?.map((item, index) => (<StyledTypography
                                        key={index}>{item.qualification?.title}</StyledTypography>))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{mt: {xs: 2, sm: 0}}} align='start'>
                    <Stack spacing={4}>
                        <Stack direction="row" spacing={2} alignItems="start">
                            <img src={ExperienceIcon} alt="Experience" width="25" height="25"/>
                            <Stack direction="column">
                                <StyledLabel>Experience</StyledLabel>
                                <StyledTypography>{data.experience_length?.title}</StyledTypography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>)
}

export default JobInfo;

const StyledLabel = styled(Typography)(() => ({
    color: "#A1A1A1", fontSize: "14px", fontWeight: 400,
}));

const StyledTypography = styled(Typography)(() => ({
    color: "#333333", fontSize: "13px", fontWeight: 400,
}));