import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";
import { Link as RouterLink } from "react-router-dom";

const JobApplyDialog = ({ open, handleClose, isProfile = false }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="warning-title"
      aria-describedby="warning-description"
      disableScrollLock={true}
    >
      <DialogTitle id="warning-title">
        <Stack
          direction="row"
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" display="flex" spacing={2}>
            <ReportTwoToneIcon color="warning" sx={{ fontSize: "50px" }} />
            <Typography variant="h6">Warning</Typography>
          </Stack>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {isProfile ? (
          <DialogContentText id="alert-dialog-description">
            Sorry, Unable to Apply, Please update your Account Profile first.
          </DialogContentText>
        ) : (
          <DialogContentText id="alert-dialog-description">
            Sorry, Unable to Apply, Your CV Profile has to be over{" "}
            <strong>60%</strong>.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {isProfile ? (
          <Button
            variant="contained"
            component={RouterLink}
            to="/seekers/profile"
            color="success"
            sx={{ width: "150px" }}
          >
            Update Profile
          </Button>
        ) : (
          <Button
            variant="contained"
            component={RouterLink}
            to="/seekers/account"
            color="success"
            sx={{ width: "150px" }}
          >
            Update Profile
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default JobApplyDialog;