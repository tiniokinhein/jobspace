import React, {useState} from 'react';
import {Button, Grid, Typography, IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {seekerLanguageActions} from "../../../store";
import WarnDialog from "../../Common/WarnDialog";
import AddIcon from "@mui/icons-material/Add";
import {Link as RouterLink} from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CircleIcon from '@mui/icons-material/Circle';

const SeekerLanguageList = ({data}) => {

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
            dispatch(seekerLanguageActions.destroy(uuid)).then(() => dispatch(seekerLanguageActions.get()))
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
            <Grid item xs={12} md={12} sx={{py: 1, px: 5}}>
                {
                    data &&
                    data.length > 0 ?
                        data.map((item) => (
                    <Grid container sx={{py: 2}} spacing={2}>
                        <Grid item xs={12} md={5} sx={{display: {xs: 'none', md: 'block'}}}>
                            <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                Language
                                <Typography component={"span"} sx={{color: '#B71C1C'}}>
                                    *
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={7} sx={{display: 'flex'}}>
                            <Typography sx={{display: {xs: 'block', md: 'none', paddingRight: 4}}}>
                                <CircleIcon fontSize={'inherit'}/>
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    color: '#585858'
                                }}>
                                {item.job_language?.title} {item.is_primary === 1 ? "(Primary)" : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                Proficiency
                                <Typography component={"span"} sx={{color: '#B71C1C'}}>
                                    *
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={7}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    color: '#585858'
                                }}>
                                {item.proficiency?.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                Read
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={7}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    color: '#585858'
                                }}>
                                {item.is_read === 1 ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                Write
                            </Typography>
                        </Grid>
                        <Grid item xs={7} md={7}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    color: '#585858'
                                }}>
                                {item.is_write === 1 ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Typography sx={{fontSize: '15px', fontWeight: '400'}}>
                                Speak
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    fontWeight: '400',
                                    color: '#585858'
                                }}>
                                {item.is_speak === 1 ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} md={1}>
                            <IconButton aria-label="delete" size="small"
                                        onClick={() => handleTrashClick(item.uuid)}>
                                <DeleteOutlineOutlinedIcon fontSize="small"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    ))
                    : 
                    <Typography sx={{padding: 3}}> --- </Typography>
                }
            </Grid>

            <Grid item xs={12} md={8}>
                <Button
                    variant="text"
                    startIcon={<AddIcon/>}
                    sx={{
                        fontSize: '14px', fontWeight: 400,
                    }}
                    component={RouterLink}
                    to="/seekers/languages/create"
                >
                    Add More Languages
                </Button>
            </Grid>

            <WarnDialog open={open} handleClose={handleClose} handleDelete={handleDelete}/>
        </Grid>
    );
}

export default SeekerLanguageList;