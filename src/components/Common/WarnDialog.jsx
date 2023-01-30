import React from 'react';
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";

const WarnDialog = ({open, handleClose, handleDelete}) => {
    return (
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
    )
}

export default WarnDialog;