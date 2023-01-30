import React from 'react';
import {Grid, Typography, Stack, IconButton, styled} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {Link as RouterLink} from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const EducationItem = ({data, handleTrashClick}) => {
    return (
        <Grid container item xs={12}>
            <Grid item xs={12} md={4}>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" display="flex" spacing={1.5}>
                    <FiberManualRecordIcon fontSize="12px" sx={{color: '#A1A1A1'}}/>
                    <StyledTypography variant="body1">{data?.graduation_date_dec}</StyledTypography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
                <Stack spacing={1}>
                    <StyledTypography sx={{color: '#585858'}} variant="body1">
                        {data?.qualification?.title ?? '---'}
                    </StyledTypography>

                    <StyledTypography variant="body1">
                        {data.school_name ?? '---'}
                    </StyledTypography>
                </Stack>
            </Grid>

            <Grid item xs={1} alignItems="flex-start" justifyContent="space-between" display="flex">
                <IconButton aria-label="delete" size="small" component={RouterLink}
                            to={`/seekers/educations/${data.uuid}`}>
                    <ModeEditOutlineOutlinedIcon fontSize="small"/>
                </IconButton>

                <IconButton aria-label="delete" size="small" onClick={() => handleTrashClick(data.uuid)}>
                    <DeleteOutlineOutlinedIcon fontSize="small"/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default EducationItem;

const StyledTypography = styled(Typography)(() => ({
    color: '#A1A1A1',
    fontWeight: 500,
}))