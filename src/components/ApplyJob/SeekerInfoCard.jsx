import React from 'react';
import {Avatar, Box, Divider, Grid, Link, Paper, Stack, Typography} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {useSelector} from "react-redux";
import StringAvatar from "../Common/StringAvatar";
import {Link as RouterLink} from 'react-router-dom';

const SeekerInfoCard = () => {

    const {user} = useSelector((state) => state.auth);

    return (
        <Paper
            sx={{
                background: '#195DCC',
                height: '146px',
                alignItems: "center",
                display: "flex",
                borderRadius: '5px'
            }}
            elevation={0}
        >
            <Grid container padding="20px" alignItems="center">
                <Grid item xs={12} sm={2} justifyContent="center" display="flex">
                    <Avatar sx={{
                        background: '#FFFFFF',
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                    }}>
                        <Avatar sx={{
                            background: '#195DCC',
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%'
                        }}>
                            {user.job_seeker ?
                                <Avatar
                                    sx={{
                                        background: '#FFFFFF',
                                        width: '68px',
                                        height: '68px',
                                        borderRadius: '50%'
                                    }}
                                    src={`${process.env.REACT_APP_URL}/storage/profiles/${user.job_seeker?.profile_img}`}
                                /> :
                                <StringAvatar name={user.full_name} height="68px" width="68px"/>
                            }
                        </Avatar>
                    </Avatar>
                </Grid>

                <Grid item container xs={12} sm={10} spacing={2}>
                    <Grid item xs={12} display="flex" alignItems="center">
                        <Typography
                            fontSize="16px"
                            align="left"
                            fontWeight={500}
                            width="50%"
                            color="white"
                            component="div"
                        >
                            {user.job_seeker ? user.job_seeker.full_name : user.full_name}
                        </Typography>

                        <Typography fontSize="14px" align="right" fontWeight={500} color="white"
                                    component="div" width="50%">
                            <Link
                                underline="hover"
                                color="inherit"
                                to="/seekers/profile"
                                component={RouterLink}
                            >
                                View
                            </Link>
                            &nbsp;|&nbsp;
                            <Link
                                underline="hover"
                                color="inherit"
                                to="/seekers/profile"
                                component={RouterLink}
                            >
                                Edit
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Box alignItems="center" display="flex">
                                <EmailIcon sx={{color: 'white'}}/>&nbsp;
                                <Typography
                                    variant="span"
                                    fontSize="14px"
                                    color="white"
                                >
                                    {user.job_seeker ? user.job_seeker.email : user.email}
                                </Typography>
                            </Box>
                            <Divider orientation="vertical" flexItem style={{background: 'white'}}/>
                            <Box alignItems="center" display="flex">
                                <PhoneIcon sx={{color: 'white'}}/>&nbsp;
                                <Typography
                                    variant="span"
                                    fontSize="14px"
                                    color="white"
                                >
                                    {user.job_seeker ? user.job_seeker.phone_no : user.phone_no}
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SeekerInfoCard;