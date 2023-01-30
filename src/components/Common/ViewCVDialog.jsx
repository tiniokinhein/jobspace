import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import PdfViewer from "./PdfViewer";
import DocViewer from "./DocViewer";
import CloseIcon from "@mui/icons-material/Close";

const ViewCVDialog = ({ open, onClose, data }) => {
  const path = `${process.env.REACT_APP_API_URL}/job-seeker/resume/file/${data?.file_name}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="xl"
      fullWidth={true}
      disableScrollLock={true}
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography component="span" variant="body1">
          CV&nbsp;&nbsp;
          <Typography
            component="span"
            variant="body1"
            color="#C4C4C4"
            fontWeight={500}
          >
            ({data?.uploaded_file_name})
          </Typography>
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {data?.file_type === "pdf" ? (
          <PdfViewer path={path} />
        ) : (
          <DocViewer path={path} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCVDialog;
