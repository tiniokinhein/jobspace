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

const EmpAbilityWarn = ({open, handleClose, msgKey}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="ability-title"
            aria-describedby="ability-description"
            disableScrollLock={true}
        >
            <DialogTitle id="ability-title">
                <Stack direction="row" alignItems="center" display="flex" spacing={2}>
                    <ReportTwoToneIcon color="warning" sx={{fontSize: "40px"}}/>
                    <Typography variant="h6">Warning</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="ability-description">
                    You don't have any chance to {msgKey}. Please contact us to continue.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    component={RouterLink}
                    to='/contact-us'
                    color="secondary"
                    autoFocus
                >
                    Contact Us
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EmpAbilityWarn;