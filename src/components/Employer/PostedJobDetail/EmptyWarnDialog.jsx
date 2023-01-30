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

const EmptyWarnDialog = ({open, handleEmptyWarnMove, title}) => {

    return (
        <Dialog
            open={open}
            onClose={handleEmptyWarnMove}
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
                    please select at least one {title} to move.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEmptyWarnMove}>Cancel</Button>
                <Button onClick={handleEmptyWarnMove} autoFocus color="warning">Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EmptyWarnDialog;