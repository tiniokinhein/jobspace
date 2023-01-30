import React from 'react';
import {Avatar, Button, Grid, Paper, Stack, styled, Typography} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link as RouterLink} from "react-router-dom";
import StringAvatar from "../Common/StringAvatar";

const StyledTypography = styled(Typography)(() => ({
    fontSize: 14,
    fontWeight: 300
}));

const RecentAppliedPaper = ({data}) => {

    return (
        <Paper
            variant="outlined"
            sx={{
                px: '20px',
                pt: {xs: '16px', sm: 0},
                width: '100%',
                minHeight: '152px',
                maxHeight: '300px',
                border: '1px solid #EBEBEB',
                backgroundColor: 'white',
            }}
            direction="column"
            justifyContent="center"
            component={Stack}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    {data.profile_image ?
                        <Avatar
                            alt={data.name}
                            src={`${process.env.REACT_APP_URL}/storage/profiles/${data.profile_image}`}
                            sx={{width: 80, height: 80}}
                        /> :
                        <StringAvatar name={data.name} width={80} height={80}/>
                    }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={2}>
                        <Typography fontWeight={300} align="left">{data.name}</Typography>
                        <StyledTypography color="secondary">{data.job_title}</StyledTypography>
                        {data.address &&
                            <Stack direction="row" spacing={1}>
                                <LocationOnIcon color="error" sx={{fontSize: '1.2rem'}}/>
                                <StyledTypography>{data.address}</StyledTypography>
                            </Stack>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={4} display={'flex'} alignItems={'end'}
                      justifyContent={{xs: 'center', sm: 'end'}}>
                    <Stack direction="row" spacing={1} pb={2}>
                        <Button
                            component={RouterLink}
                            variant="contained"
                            sx={{
                                color: 'white',
                                minWidth: {xs: "120px", sm: "150px"},
                                background: "linear-gradient(274.94deg, #0C81AC -12.35%, #00A0DC 114.64%)",
                                borderRadius: '5px',
                                height: '39px'
                            }}
                            to={`/employers/posted-jobs/${data.job_post_uuid}/applicants/${data.user_id}/resume`}
                            size="small"
                        >
                            See CV
                        </Button>

                        <Button
                            component={RouterLink}
                            variant="outlined"
                            color="secondary"
                            sx={{
                                minWidth: {xs: "120px", sm: "150px"},
                                borderRadius: '5px',
                                height: '39px'
                            }}
                            to={`/employers/posted-jobs/${data.job_post_uuid}/applicants/${data.user_id}/profile`}
                            size="small"
                        >
                            See Details
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
};

export default RecentAppliedPaper