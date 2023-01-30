import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Link as RouterLink} from "react-router-dom";
import EducationItem from "./EducationItem";
import {useDispatch} from "react-redux";
import {seekerEducationActions} from "../../../store";
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";

const EducationList = ({data}) => {

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
            dispatch(seekerEducationActions.destroy(uuid)).then(() => dispatch(seekerEducationActions.get()));
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
            <Grid item xs={12} md={12}>
                <Stack direction="row" justifyContent="flex-end" display="flex" width="100%" alignItems="center">
                    <Button
                        variant="text"
                        startIcon={<AddIcon/>}
                        sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                        }}
                        component={RouterLink}
                        to="/seekers/educations/create"
                    >
                        Add Previous Educations
                    </Button>
                </Stack>
            </Grid>

            <Grid container item xs={12} spacing={4}>
                {data.length > 0 && data.map((item, index) => (
                    <EducationItem data={item} key={index} handleTrashClick={handleTrashClick}/>
                ))}
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableScrollLock={true}
            >
                <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" alignItems="center" display="flex" spacing={2}>
                        <ReportTwoToneIcon color="warning" sx={{fontSize: "40px"}}/>
                        <Typography variant="h6">Warning</Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus color="warning">Delete</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default EducationList;