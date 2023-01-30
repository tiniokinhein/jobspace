import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import AuthAlert from "../../components/Alert/AuthAlert";
import { useDispatch, useSelector } from "react-redux";
import { employerResetPwdActions } from "../../store";
import { helper } from "../../helpers";

function EmailToResetPassword() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("The email address must be email")
      .required("The email address is mandatory"),
  });

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  });

  const dispatch = useDispatch();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ ...data }) {
    dispatch(employerResetPwdActions.verifyEmail({ ...data })).then((res) => {
      if (res.error) {
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

              return setError(key, { message: message });
            });
          }
        } catch (e) {
          //
        }
      } else {
        setAlert("Reset password email send. Please check your email.");
      }
    });
  }

  return (
    <Container maxWidth={"xl"}>
      <Grid
        container
        sx={{
          width: "100%",
          minHeight: "81vh",
          padding: {
            lg: "0px 30px",
            xl: 0,
          },
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box
            sx={{
              maxWidth: 600,
              borderRadius: "10px",
              px: {
                sm: "30px",
                md: "30px",
                lg: "50px",
              },
              py: 4,
              boxShadow: 4,
              background: "#fff",
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack justifyContent={"center"} alignItems={"center"} spacing={3}>
              <ReportTwoToneIcon sx={{ fontSize: "5rem" }} />
              <Box>
                <Typography
                  align="center"
                  fontSize="20px"
                  fontWeight={500}
                  marginBottom={2}
                >
                  Forgot Password !
                </Typography>
                <Typography align="center" fontSize="16px">
                  Enter your email to reset your password.
                </Typography>
              </Box>

              <Box>
                <AuthAlert
                  notification={alert}
                  type="success"
                  setInvalidError={setAlert}
                />
                <Paper
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "7px",
                    mt: 1,
                  }}
                >
                  <IconButton sx={{ p: "10px" }} aria-label="menu">
                    <MailOutlineIcon />
                  </IconButton>
                  <InputBase
                    required
                    type="email"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter your email"
                    inputProps={{ "aria-label": "email" }}
                    error={!!errors.email}
                    {...register("email")}
                    fullWidth
                  />
                </Paper>
                {!!errors.email && (
                  <Typography component="span" fontSize="12px" color="error">
                    {errors.email?.message}
                  </Typography>
                )}
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="text"
                  color="secondary"
                  startIcon={<NavigateBeforeSharpIcon />}
                  component={RouterLink}
                  to="/employers/sign-in"
                >
                  Back to Login
                </Button>

                {isSubmitting ? (
                  <LoadingButton
                    loading
                    loadingPosition="start"
                    color="primary"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      py: "10px",
                      px: "40px",
                      borderRadius: "7px",
                      alignSelf: "center",
                    }}
                  >
                    Continue
                  </LoadingButton>
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{
                      py: "10px",
                      px: "40px",
                      borderRadius: "7px",
                      alignSelf: "center",
                    }}
                  >
                    Continue
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default EmailToResetPassword;