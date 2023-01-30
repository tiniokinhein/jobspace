import React, {Fragment, useState} from 'react';
import {Button, Grid, IconButton, Typography} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WarnDialog from "../../Common/WarnDialog";
import {seekerSkillActions} from "../../../store";
import {useDispatch} from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {Link as RouterLink} from "react-router-dom";

const SeekerSkillList = ({data}) => {

    const dispatch = useDispatch();
    const [uuid, setUuid] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleTrashClick = (uuid) => {
        setOpen(true);
        setUuid(uuid);
    }

    const handleDelete = () => {
        if (uuid) {
            dispatch(seekerSkillActions.destroy(uuid)).then(() => dispatch(seekerSkillActions.get()))
        }

        setOpen(false);
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
            sx={{px: {xs: 2, sm: 4}, py: 3}}
            spacing={3}
        >
            <Grid container item xs={12} md={8}>
                <Grid item xs={6} md={4}>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#585858'
                        }}
                    >
                        Skill
                    </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#585858'
                        }}>
                        Proficiency
                    </Typography>
                </Grid>
            </Grid>

            {
                data.length > 0 && data.map((item) => (
                    <Fragment key={item.uuid}>
                        <Grid
                            container
                            item
                            xs={12}
                            md={8}
                            sx={{py: 1}}
                            justifyContent="start"
                            alignItems="center"
                        >
                            <Grid item xs={6} md={4}>
                                <Typography
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: '400',
                                        color: '#585858'
                                    }}>
                                    {item.skill?.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={5} md={4}>
                                <Typography
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: '400',
                                        color: '#585858'
                                    }}>
                                    {item.proficiency?.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} md={1}>
                                <IconButton aria-label="delete" size="small"
                                            onClick={() => handleTrashClick(item.uuid)}>
                                    <DeleteOutlineOutlinedIcon fontSize="small"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Fragment>
                ))
            }

            <Grid item xs={12} md={8}>
                <Button
                    variant="text"
                    startIcon={<AddIcon/>}
                    sx={{
                        fontSize: '14px', fontWeight: 400,
                    }}
                    component={RouterLink}
                    to="/seekers/skills/create"
                >
                    Add More Skills
                </Button>
            </Grid>

            <WarnDialog open={open} handleClose={handleClose} handleDelete={handleDelete}/>
        </Grid>
    )
}

export default SeekerSkillList;