import React from 'react';
import {Box, Grid, IconButton, Stack, styled, Typography} from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {Link as RouterLink} from 'react-router-dom';
import {helper} from "../../../helpers";

const ExperienceItem = ({data, handleTrashClick}) => {
    return (
        <Grid container item xs={12}>
            <Grid item xs={12} md={4}>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" display="flex" spacing={1.5}>
                    <FiberManualRecordIcon fontSize="12px" sx={{color: '#A1A1A1'}}/>
                    {data &&
                    <StyledTypography variant="body1">
                        {data.start_date_dec}&nbsp;-&nbsp;{data.is_present ? 'Present' : data?.end_date_dec}
                    </StyledTypography>
                    }
                </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
                <Stack spacing={2}>
                    <Box>
                        <StyledTypography sx={{color: '#585858'}}
                                          variant="body1">{data?.job_title ?? '---'}</StyledTypography>
                        <StyledTypography>{data.company_name ?? '---'}</StyledTypography>
                    </Box>
                    <Box>
                        <Grid container pb="7px">
                            <Grid item xs={4}>
                                <Typography variant="body2" color="#A1A1A1">Industry</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body2"
                                            fontWeight={400}>{data.industry?.title ?? '---'}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container pb="7px">
                            <Grid item xs={4}>
                                <Typography variant="body2" color="#A1A1A1">Role</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body2"
                                            fontWeight={400}>{data.job_role?.title ?? '---'}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography variant="body2" color="#A1A1A1">Monthly Salary</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body2" fontWeight={400}>
                                    {data.currency ? helper.nFormat(data.salary ?? '') +' ' + data.currency?.name : '---'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight={400} paragraph noWrap={true}>
                            {data.description}
                        </Typography>
                    </Box>
                </Stack>
            </Grid>

            <Grid item xs={1} alignItems="flex-start" justifyContent="space-between" display="flex">
                <IconButton aria-label="delete" size="small" component={RouterLink}
                            to={`/seekers/experiences/${data.uuid}`}>
                    <ModeEditOutlineOutlinedIcon fontSize="small"/>
                </IconButton>

                <IconButton aria-label="delete" size="small" onClick={() => handleTrashClick(data.uuid)}>
                    <DeleteOutlineOutlinedIcon fontSize="small"/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default ExperienceItem;

const StyledTypography = styled(Typography)(() => ({
    color: '#A1A1A1',
    fontWeight: 500,
}))