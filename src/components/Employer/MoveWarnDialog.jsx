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

const MoveWarnDialog = ({open, handleClose, handleWarnMove, to}) => {
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
                    Are you willing to relocate the applicant to {to}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleWarnMove} autoFocus color="warning">Move</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MoveWarnDialog;