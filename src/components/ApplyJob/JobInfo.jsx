import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import ViewCVDialog from "../Common/ViewCVDialog";
import { ReactComponent as PrimaryRocketIcon } from "../../assets/icons/secondary_rocket.svg";
import { applyJobActions } from "../../store";
import { LoadingButton } from "@mui/lab";
import { helper } from "../../helpers";

const JobInfo = ({ uuid, handleApply, additionalQuestions }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((x) => x.auth);
  const [errors, setErrors] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  const [required, setRequired] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name ?? null);
  };

  const openEditCv = () => {
    setIsEdit(true);
  };

  const closeEditCv = () => {
    setFile(null);
    setIsEdit(false);
    setFileName(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    let formData = new FormData();

    if (isEdit) {
      if (!file) {
        setRequired(true);
      } else {
        formData.append("cv", file);
      }
    }

    formData.append("job_post_id", uuid);

    if (inputFields.length > 0) {
      inputFields.map((value, index) => {
        formData.append(`additional_answers[${index}][answer]`, value.answer);
        formData.append(
          `additional_answers[${index}][additional_question_id]`,
          value.additional_question_id
        );

        return formData;
      });
    }

    dispatch(applyJobActions.create(formData, true)).then((res) => {
      if (res.error) {
        try {
          if (helper.isJson(res.error.message)) {
            const errBag = JSON.parse(res.error.message);
            let bag = [];

            Object.keys(errBag).map((key) => {
              let message;

              if (errBag[key]) {
                if (Array.isArray(errBag[key])) {
                  message = errBag[key].join(" ");
                } else {
                  message = errBag.err;
                }
              }
              bag[key] = message;

              return bag;
            });

            handleApply(false);
            return setErrors(bag);
          }
        } catch (e) {
          //
        }
      } else {
        setErrors([]);
        handleApply(true);
      }

      setSubmitting(false);
    });
  };

  const handleInput = (e, index) => {
    let data = inputFields;

    data[index] = {
      answer: e.target.value,
      additional_question_id: e.target.id,
    };

    setInputFields(data);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        mt: 3,
        borderRadius: "5px",
      }}
      elevation={0}
    >
      <Box component="form" onSubmit={onSubmit}>
        {errors && (
          <Box flexGrow={1}>
            <Alert severity="error">
              <AlertTitle>Invalid Input Fields</AlertTitle>
              {errors.map((error) => {
                return (
                  <Typography fontSize="14px" component="div">
                    {error}
                  </Typography>
                );
              })}
            </Alert>
          </Box>
        )}

        {user.seeker_resume && (
          <Grid container spacing={4}>
            {!isEdit ? (
              <Box component={Grid} container item xs={12} spacing={1}>
                <Box
                  component={Grid}
                  item
                  xs={12}
                  display="flex"
                  alignItems="center"
                >
                  <Typography
                    fontSize="16px"
                    align="left"
                    fontWeight={400}
                    width="50%"
                    component="div"
                  >
                    Uploaded Resume - {user.seeker_resume?.uploaded_at}
                  </Typography>

                  <Typography
                    fontSize="14px"
                    align="right"
                    fontWeight={500}
                    component="div"
                    width="50%"
                  >
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={handleClickOpen}
                    >
                      View
                    </Link>
                    <span>&nbsp;|&nbsp;</span>
                    <Link
                      underline="hover"
                      color="inherit"
                      onClick={openEditCv}
                    >
                      Edit
                    </Link>
                  </Typography>
                </Box>

                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <DescriptionIcon fontSize="12px" color="#A1A1A1" />
                    &nbsp;
                    <Typography variant="span" color="#A1A1A1" fontSize="14px">
                      {user.seeker_resume?.uploaded_file_name}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            ) : (
              <Box component={Grid} container item xs={12}>
                <Stack width="100%" spacing={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    display="flex"
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      display="flex"
                    >
                      <Button
                        aria-label="upload cv"
                        component="label"
                        sx={{
                          background: "#E9E9E9",
                          paddingX: "12px",
                        }}
                      >
                        <input
                          hidden
                          accept=".doc,.docx,.txt,.pdf,.rtf"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <Stack
                          direction="row"
                          display="flex"
                          alignContent="center"
                          alignItems="center"
                          spacing={1}
                        >
                          <SvgIcon fontSize="1.2rem">
                            <PrimaryRocketIcon width="100%" height="100%" />
                          </SvgIcon>
                          <Typography
                            sx={{
                              color: "#585858",
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            Choose CV
                          </Typography>
                        </Stack>
                      </Button>
                      <Typography
                        variant="span"
                        color="#A1A1A1"
                        fontSize="14px"
                      >
                        {fileName}
                      </Typography>
                    </Stack>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      sx={{
                        align: "right",
                        display: "flex",
                      }}
                      onClick={closeEditCv}
                    >
                      <CancelIcon fontSize="inherit" />
                    </IconButton>
                  </Stack>
                  <Divider fullWidth sx={{ borderColor: "#DADADA" }} />
                  {required && (
                    <Typography fontSize="13px" component="span" color="error">
                      Please Choose the CV.
                    </Typography>
                  )}
                </Stack>
              </Box>
            )}
            <ViewCVDialog
              open={open}
              onClose={onClose}
              data={user.seeker_resume}
            />
          </Grid>
        )}

        {additionalQuestions.length > 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <DriveFileRenameOutlineOutlinedIcon
                  fontSize="12px"
                  color="primary"
                />
                <Typography sx={{ color: "#195DCC", fontSize: "14px", mx: 1 }}>
                  Additional information from the employer.
                </Typography>
              </Box>
            </Grid>

            {additionalQuestions.map((additionalQuestion, index) => (
              <Grid item xs={12} key={additionalQuestion.uuid}>
                <FormControl>
                  <FormLabel
                    sx={{ fontSize: "14px" }}
                    id={`question${additionalQuestion.uuid}`}
                  >
                    {additionalQuestion.question}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby={`question${additionalQuestion.uuid}`}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="1"
                      control={
                        <Radio
                          value="1"
                          id={additionalQuestion.uuid}
                          onChange={(e) => handleInput(e, index)}
                          required
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      value="0"
                      control={
                        <Radio
                          value="0"
                          id={additionalQuestion.uuid}
                          onChange={(e) => handleInput(e, index)}
                          required
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        )}

        <Box display="flex" justifyContent={"center"} sx={{ pt: 5, pb: 2 }}>
          {submitting ? (
            <LoadingButton
              loading
              loadingPosition="start"
              color="secondary"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Submit Application
            </LoadingButton>
          ) : (
            <Button
              sx={{
                py: "13px",
                px: "25px",
                color: "#FFFFFF",
                borderRadius: "6px",
                background: "linear-gradient(180deg, #FFE15A 0%, #FF9635 100%)",
              }}
              type="submit"
            >
              Submit Application
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default JobInfo;