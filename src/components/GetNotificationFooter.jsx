import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import NotificationPhoto from "../../src/assets/images/notification.svg";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { helper } from "../helpers";
import { setProgress } from "../store/slices/progress";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { notifyEmailActions } from "../store";

const GetNotificationFooter = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(
      "The email address must be a valid email address."
    ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, setError, formState } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email }) {
    dispatch(notifyEmailActions.create({ email })).then((res) => {
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
          } else {
            setError("general", { message: res.error.message });
          }
        } catch (e) {
          //
        }
      }
    });
    reset();
  }

  useEffect(() => {
    dispatch(setProgress(100));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box
        width="100%"
        sx={{
          background: "#195DCC",
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{ mx: "auto", py: { xs: 2.5, sm: 5 } }}
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item xs={12} sm={12} md={7}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: { xs: "start", md: "center" },
                        alignItems: "center",
                        ml: { sm: 3 },
                      }}
                    >
                      <Box display={{ xs: "none", sm: "block" }}>
                        <img src={NotificationPhoto} alt="notifications" />
                      </Box>
                      <Box sx={{ mx: { xs: 0, sm: 1 } }}>
                        <Typography
                          sx={{
                            fontSize: { xs: "24px", md: "36px" },
                            fontWeight: "300",
                            color: "#FFFFFF",
                          }}
                        >
                          {/* GET JOBS NOTIFICATIONS */}
                          {t("get_jobs_noti")}
                        </Typography>
                        <Typography
                          sx={{
                            letterSpacing: "0.23em",
                            fontSize: { xs: "10px", sm: "14px" },
                            fontWeight: "300",
                            color: "#FFFFFF",
                            lineHeight: "21px",
                          }}
                        >
                          Free Subscribe Our Newsletter Now!
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={9.5} sm={9} md={3}>
                    <Paper
                      sx={{
                        py: "10px",
                        mb: 1,
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <LocalPostOfficeOutlinedIcon
                        sx={{
                          ml: { xs: 1, sm: 2 },
                          mr: { xs: 0, sm: 1 },
                          color: "#585858",
                        }}
                      />
                      <InputBase
                        type={"email"}
                        sx={{ ml: 1, flex: 1, textDecoration: "none" }}
                        placeholder={t("enter_your_email")}
                        inputProps={{ "aria-label": "email" }}
                        {...register("email")}
                      />
                    </Paper>
                    <FormHelperText error={!!errors.email}>
                      {errors.email?.message}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={2.5} sm={3} md={2}>
                    {isSubmitting ? (
                      <LoadingButton
                        loading
                        loadingPosition="start"
                        color="secondary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                      >
                        Apply
                      </LoadingButton>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: "400",
                          py: "12px",
                          mb: 1,
                          border: "1px solid #FFFFFF",
                          borderRadius: "10px",
                          width: { xs: "100%", md: "auto" },
                          px: { xs: 0, md: 5 },
                          boxSizing: "border-box",
                        }}
                        type="submit"
                      >
                        Apply
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default GetNotificationFooter;
