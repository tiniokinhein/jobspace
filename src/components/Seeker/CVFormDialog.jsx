import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import {LoadingButton} from "@mui/lab";

const CVFormDialog = ({
  openDialog,
  handleCloseDialog,
  handleFileChange,
  fileName,
  onSubmit,
  isSubmitting
}) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} disableScrollLock>
      <DialogTitle>
        <Typography fontSize="18px" fontWeight={500}>Upload CV</Typography>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
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
      <Divider />
      <DialogContent>
        <DialogContentText>
          Your file must be in Word (.doc or .docx) or PDF (.pdf) format. File
          size must not exceed 5MB.
        </DialogContentText>

        <Stack
          direction="row"
          sx={{ alignItems: "center", display: "flex", mt: 2 }}
          spacing={2}
        >
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(180deg, #77A6F3 0%, #195DCC 100%)",
            }}
            component="label"
          >
            Browse
            <input
              hidden
              type="file"
              accept=".doc,.docx,.txt,.pdf,.rtf"
              onChange={handleFileChange}
              name="resume"
            />
          </Button>
          <Typography fontSize="14px">
            File&nbsp;:&nbsp;{fileName ? fileName : "___"}
          </Typography>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleCloseDialog} variant="contained" color="error">
          Cancel
        </Button>

          {isSubmitting ?
              <LoadingButton
                  loading
                  loadingPosition="start"
                  color='secondary'
                  variant='contained'
                  startIcon={<SaveIcon/>}
              >
                  Upload
              </LoadingButton> :
              <Button
              onClick={onSubmit}
              variant="contained"
              sx={{
                  borderRadius: "10px",
                  background: "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
              }}
          >
              Upload
          </Button>}
      </DialogActions>
    </Dialog>
  );
};

export default CVFormDialog;
