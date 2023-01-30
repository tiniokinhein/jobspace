import React, {Fragment} from 'react';
import {Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {helper} from "../../../helpers";

const ApplicantInfo = ({applicantInfo, square = false}) => {
    return (
        <Grid
            sx={{
                background: '#ffffff',
                borderRadius: !square ? '10px' : '0px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
            }}
            flexGrow={1}
        >
            <Grid item xs={12}>
                <Grid container sx={{py: 2, px: 3}}>
                    <Grid item xs={12} md={2}>
                        <Avatar sx={{
                            width: 82,
                            height: 82,
                            border: '1px solid #C4C4C4'
                        }}>
                            <Avatar
                                alt={applicantInfo?.full_name}
                                src={`${applicantInfo?.profile_img}`}
                                sx={{
                                    height: 80,
                                    width: 80
                                }}
                            />
                        </Avatar>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography
                            fontWeight={500}
                            sx={{
                                pt: 1,
                                color: '#195DCC',
                                textAlign: 'start',
                                fontSize: '18px'
                            }}
                        >
                            {applicantInfo?.name}
                        </Typography>

                        {(applicantInfo?.experience?.job_title && applicantInfo?.experience?.company_name) &&
                            <Typography
                                fontWeight={400}
                                sx={{
                                    textAlign: 'start',
                                    color: '#767676',
                                    fontSize: '15px',
                                    pt: 1
                                }}
                            >
                                {applicantInfo?.experience?.job_title + ' : ' + applicantInfo?.experience?.company_name}
                            </Typography>
                        }
                    </Grid>

                    {applicantInfo?.experience &&
                        <Grid item xs={12} md={4}>
                            <Typography
                                fontWeight={400}
                                fontSize={'15px'}
                                sx={{
                                    pt: 1,
                                    color: '#767676',
                                }}
                            >
                                Experience
                            </Typography>
                            <Typography
                                fontWeight={400}
                                fontSize={'15px'}
                                sx={{
                                    color: '#333333',
                                    pt: 1
                                }}
                            >
                                {applicantInfo?.experience?.experiences}
                            </Typography>
                        </Grid>
                    }

                    {applicantInfo?.experience?.notice &&
                        <Grid item xs={12} md={2}>
                            <Box>
                                <Typography
                                    fontWeight={400}
                                    fontSize={'15px'}
                                    sx={{
                                        color: '#767676',
                                        pt: 1
                                    }}
                                >
                                    Notice
                                </Typography>
                                <Typography
                                    fontWeight={400}
                                    fontSize={'15px'}
                                    sx={{
                                        color: '#333333',
                                        pt: 1
                                    }}>
                                    {applicantInfo?.experience?.notice}
                                </Typography>
                            </Box>
                        </Grid>
                    }
                </Grid>
            </Grid>
            <Divider/>
            <Grid item xs={12} sx={{py: 2, px: 3}}>
                <Typography sx={{fontSize: '18px', fontWeight: 500, pb: 2}}>
                    Personal Details
                </Typography>

                <Grid container spacing={1} sx={{py: 2}}>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Gender
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.gender}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Marital Status
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.marital}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            NRC
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.nrc ?? '---'}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Email Address
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.email ?? '---'}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Mobile No.
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.phone_no ?? '---'}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Permanent Address
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.address ?? '---'}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Date of Birth
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.dob ?? '---'}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Nationality
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.nationality ?? '---'}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={5} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#333333'}}>
                            Short Bio (Describe about yourself briefly.)
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={7} sx={{py: 1}}>
                        <Typography sx={{fontSize: '14px', fontWeight: 500, color: '#585858'}}>
                            {applicantInfo?.personal_detail?.short_bio ?? '---'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>

            <Grid item xs={12} sx={{py: 2, px: 3}}>
                <Typography sx={{fontSize: '18px', fontWeight: 500, pb: 2}}>
                    Working Experiences
                </Typography>

                <Grid container>
                    <Grid item xs={12}>
                        <List
                            component="nav"
                            aria-labelledby="experience-details"
                        >
                            {(applicantInfo?.experience_histories?.length > 0) &&
                                applicantInfo?.experience_histories.map((experience) => (
                                    <ListItem key={experience?.uuid} sx={{py: 3, px: 0}}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} md={4}>
                                                <Box display={'flex'}>
                                                    <ListItemAvatar
                                                        sx={{
                                                            color: '#C4C4C4',
                                                            minWidth: '25px',
                                                            mt: 0.4,
                                                        }}>
                                                        <CircleIcon fontSize={'inherit'}/>
                                                    </ListItemAvatar>
                                                    <Typography
                                                        sx={{
                                                            color: '#C4C4C4',
                                                            fontSize: '16px',
                                                            fontWeight: 500
                                                        }}>
                                                        {experience?.date}
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
                                                    {experience?.job_title}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 500,
                                                        color: '#A1A1A1'
                                                    }}>
                                                    {experience?.company}
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
                                                            {experience?.industry}
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
                                                            {experience?.job_role ?? '---'}
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
                                                            {experience?.salary ? helper.nFormat(experience?.salary ?? '') : '---'}
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
                                                            Reference:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Typography sx={{
                                                            px: 1,
                                                            fontSize: '14px',
                                                            fontWeight: 400,
                                                            color: '#333333'
                                                        }}>
                                                            {experience?.reference ?? '---'}
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
                                                    {experience?.description}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>

            <Grid item xs={12} sx={{py: 2, px: 3}}>
                <Typography sx={{fontSize: '18px', fontWeight: 500, pb: 2}}>
                    Education Details
                </Typography>

                <Grid container>
                    <Grid item xs={12}>
                        <List
                            component="nav"
                            aria-labelledby="education-details"
                        >
                            {applicantInfo?.education_histories?.length > 0 &&
                                (applicantInfo?.education_histories).map(education => (
                                    <ListItem key={education?.uuid} sx={{py: 3, px: 0}}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} md={4}>
                                                <Box display={'flex'}>
                                                    <ListItemAvatar
                                                        sx={{
                                                            mt: 0.4,
                                                            color: '#C4C4C4',
                                                            minWidth: '25px'
                                                        }}
                                                    >
                                                        <CircleIcon fontSize={'inherit'}/>
                                                    </ListItemAvatar>
                                                    <Typography
                                                        sx={{
                                                            color: '#C4C4C4',
                                                            fontSize: '16px',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {education?.date}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 500,
                                                        color: '#585858'
                                                    }}
                                                >
                                                    {education?.qualification}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 500,
                                                        color: '#A1A1A1'
                                                    }}
                                                >
                                                    {education?.school_name}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>

            <Grid item xs={12} sx={{py: 2, px: 3}}>
                <Typography sx={{fontSize: '18px', fontWeight: 500, pb: 2}}>
                    Skill Details
                </Typography>

                <Grid container>
                    <Grid item xs={12}>
                        <List
                            component="nav"
                            aria-labelledby="education-details"
                        >
                            {applicantInfo?.skills?.length > 0 &&
                                (applicantInfo?.skills).map(skill => (
                                    <ListItem key={skill?.uuid} sx={{py: 1, px: 0}}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={5} md={3}>
                                                <Typography
                                                    sx={{
                                                        color: '#C4C4C4',
                                                        fontSize: '16px',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    {skill?.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={0.5}>
                                                <Typography
                                                    sx={{
                                                        color: '#C4C4C4',
                                                        fontSize: '16px',
                                                        fontWeight: 500
                                                    }}
                                                    align="center"
                                                >
                                                    :
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4} md={7}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 500,
                                                        color: '#585858'
                                                    }}
                                                >
                                                    {skill?.proficiency}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Grid item xs={12} sx={{py: 2, px: 3}}>
                <Typography sx={{fontSize: '20px', fontWeight: 500}}>
                    Languages Known
                </Typography>

                <Grid container sx={{py: 2}}>
                    <Grid item xs={12} md={6} sx={{py: 2}}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                    Language
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                    Proficiency
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{py: 1.5}}>
                        <Grid container spacing={1}>
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
                    </Grid>

                    {
                        applicantInfo?.language_skills?.length > 0 &&
                        applicantInfo?.language_skills.map((item) => (
                            <Fragment key={item.uuid}>
                                <Grid container item xs={12} md={6} sx={{py: 1.5}}>
                                    <Grid item xs={12} md={6}>
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                fontWeight: '400',
                                                color: '#585858'
                                            }}>
                                            {item.language} {item.primary === 1 ? "(Primary)" : ''}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                fontWeight: '400',
                                                color: '#585858'
                                            }}>
                                            {item.proficiency}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item container xs={12} md={6} spacing={1}>
                                    <Grid item xs={4} md={4} alignItems="center" display="flex">
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                fontWeight: '400',
                                                color: '#585858'
                                            }}>
                                            {item.read}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4} alignItems="center" display="flex">
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                fontWeight: '400',
                                                color: '#585858'
                                            }}>
                                            {item.write}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4} alignItems="center" display="flex">
                                        <Typography
                                            sx={{
                                                fontSize: '15px',
                                                fontWeight: '400',
                                                color: '#585858'
                                            }}>
                                            {item.speak}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ApplicantInfo;