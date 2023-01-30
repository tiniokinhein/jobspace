import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import UploadImg from "../../assets/images/upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { resumeActions } from "../../store";
import ViewCVDialog from "../Common/ViewCVDialog";
import { setProgress } from "../../store/slices/progress";
import { helper } from "../../helpers";
import CVFormDialog from "./CVFormDialog";

const UploadCvForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const { resume } = useSelector((state) => state.resume);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name ?? null);
  };

  const iniFetch = useCallback(() => {
    dispatch(resumeActions.get()).then((res) => {
      setFileName(res.payload?.uploaded_file_name);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProgress(30));
    iniFetch();
    dispatch(setProgress(100));
    // eslint-disable-next-line
  }, [iniFetch]);

  function onSubmit(e) {

    setIsSubmitting(true);

    let formData = new FormData();

    if (selectedFile) {
      formData.append("resume", selectedFile);
    }

    if (Object.keys(resume).length > 0) {
      formData.append("_method", "PUT");

      dispatch(
        resumeActions.update({ data: formData, uuid: resume?.uuid }, true)
      ).then((res) => {
        if (res.error) {
          handleError(res);
        } else {
          setError(null);
          setSelectedFile(null);
        }

        setOpenDialog(false);
        setIsSubmitting(false);
      });
    } else {
      dispatch(resumeActions.create(formData, true)).then((res) => {
        if (res.error) {
          handleError(res);
        } else {
          setError(null);
          setSelectedFile(null);
        }

        setOpenDialog(false);
        setIsSubmitting(false);
      });
    }
  }

  const handleError = (res) => {
    try {
      if (helper.isJson(res.error.message)) {
        const errBag = JSON.parse(res.error.message);

        Object.keys(errBag).map((key) => {
          let message;

          if (errBag[key]) {
            if (Array.isArray(errBag[key])) {
              message = errBag[key].join(" ");
            } else {
              message = errBag.err;
            }
          }
          return setError(message);
        });
      }
    } catch (e) {
      //
    }
  };

  // Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog((prevState) => !prevState);
  };

  return (
    <Box component="form" autoComplete="off">
      <Grid
        container
        direction="row"
        sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <Grid container item xs={12} md={10} lg={6} xl={5}>
          <Grid container mb={2}>
            <Grid item xs={4} />
            <Grid item xs={8}>
              <img src={UploadImg} alt="upload" />
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={3}>
              <StyledTypography>File Name</StyledTypography>
            </Grid>

            <Grid item xs={8}>
              <Typography fontSize="14px">{fileName ?? "---"}</Typography>
            </Grid>

            <Grid item xs={3}>
              <StyledTypography>Uploaded</StyledTypography>
            </Grid>
            <Grid item xs={8}>
              <Typography fontSize="14px">
                {resume?.uploaded_at ?? "---"}
              </Typography>

              {error && (
                <Typography fontSize="12px" color="error" mt={2}>
                  {error}
                </Typography>
              )}

              <Typography
                fontSize="12px"
                color="text.secondary"
                mt={2}
                lineHeight="25px"
              >
                Your file must be in Word (.doc or .docx) or PDF (.pdf) format.
                File size must not exceed 5MB.
              </Typography>
            </Grid>

            <Grid item xs={3} />

            {Object.keys(resume).length > 0 ? (
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  sx={{
                    width: "110px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(180deg, #77A6F3 0%, #195DCC 100%)",
                    mr: "9px",
                    mb: {
                      xs: "10px",
                      md: 0,
                    },
                  }}
                  onClick={handleClickOpen}
                >
                  View
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    width: "110px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                  }}
                  onClick={handleClickOpenDialog}
                >
                  Replace
                </Button>
              </Grid>
            ) : (
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  sx={{
                    width: "120px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                  }}
                  onClick={handleClickOpenDialog}
                >
                  Upload CV
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {Object.keys(resume).length > 0 && (
        <ViewCVDialog open={open} onClose={onClose} data={resume} />
      )}

      <CVFormDialog
        openDialog={openDialog}
        handleCloseDialog={handleClickOpenDialog}
        handleFileChange={handleFileChange}
        fileName={fileName}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

export default UploadCvForm;

const StyledTypography = styled(Typography)(() => ({
    color: '#C4C4C4',
    fontSize: '14px'
}))