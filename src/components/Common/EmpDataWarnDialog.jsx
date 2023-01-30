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
import {Link as RouterLink} from 'react-router-dom';

const EmpDataWarnDialog = ({open, handleClose}) => {
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
                    Update your company information to continue.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    component={RouterLink}
                    to="/employers/company-info"
                    color="secondary"
                    autoFocus
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EmpDataWarnDialog;