import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";
import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import CheckTokenDataService from "../../services/check.token.service";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { seekerResetPwdActions } from "../../store";
import PasswordControl from "../../components/Controls/PasswordControl";
import { setMessage, setOpen } from "../../store/slices/message.slice";
import { helper } from "../../helpers";

const passwordProps = {
  title: "New Password",
  name: "password",
  id: "password",
};

const comPasswordProps = {
  title: "Confirm Password",
  name: "password_confirmation",
  id: "password-confirmation",
};

function EmailToResetPassword() {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalidToken, setIsInvalidToken] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await CheckTokenDataService.check({ token: token }).catch((r) => {
        setIsInvalidToken(true);
      });

      setIsLoading(false);
    })();
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  });

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("The password is mandatory.")
      .min(8)
      .max(50),
    password_confirmation: Yup.string()
      .required("The confirm password is mandatory.")
      .oneOf([Yup.ref("password"), null], "Password doesn't match.")
      .min(8)
      .max(50),
  });

  const dispatch = useDispatch();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = ({ ...data }) => {
    let payload = data;

    payload["token"] = token;

    dispatch(seekerResetPwdActions.resetPassword(payload)).then((res) => {
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

              if (key === "token") {
                setIsInvalidToken(true);
              }

              return setError(key, { message: message });
            });
          }
        } catch (e) {
          //
        }
      } else {
        dispatch(setMessage("your password has been reset"));
        dispatch(setOpen(true));

        navigate("/seekers/sign-in");
      }
    });
  };

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
              maxWidth: "600px",
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
              <Typography
                align="center"
                fontSize="20px"
                fontWeight={500}
                marginBottom={2}
              >
                Reset Password !
              </Typography>

              <Box>
                {isInvalidToken && (
                  <Alert severity="error">
                    Reset Key is invalid. Please check your link again
                  </Alert>
                )}

                {!isLoading && !isInvalidToken && (
                  <Fragment>
                    <Box sx={{ mb: 2 }}>
                      <PasswordControl
                        props={passwordProps}
                        errors={!!errors.password}
                        message={errors.password?.message}
                        register={{ ...register("password") }}
                      />
                    </Box>

                    <Box>
                      <PasswordControl
                        props={comPasswordProps}
                        errors={!!errors.password_confirmation}
                        message={errors.password_confirmation?.message}
                        register={{ ...register("password_confirmation") }}
                      />
                    </Box>
                  </Fragment>
                )}
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="text"
                  color="secondary"
                  startIcon={<NavigateBeforeSharpIcon />}
                  component={RouterLink}
                  to="/seekers/sign-in"
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
                      borderRadius: "7px",
                      alignSelf: "center",
                    }}
                  >
                    Continue
                  </LoadingButton>
                ) : (
                  !isInvalidToken && (
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      sx={{
                        py: "10px",
                        borderRadius: "7px",
                        alignSelf: "center",
                      }}
                    >
                      Reset Password
                    </Button>
                  )
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