import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import PasswordControl from "../../components/Controls/PasswordControl";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { employerAuthActions } from "../../store";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { helper } from "../../helpers";
import { setMessage, setOpen } from "../../store/slices/message.slice";

const EmployerAccountSetting = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [changePwd, setChangePwd] = useState(false);
  const { me: employer } = useSelector((state) => state.empAuth);

  const initFetch = useCallback(() => {
    dispatch(employerAuthActions.me()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("The full name is mandatory."),
    mobile_no: Yup.string().required("The mobile number is mandatory."),
    business_name: Yup.string()
      .required("The registered organization name is mandatory")
      .min(3)
      .max(255),
    email: Yup.string()
      .email("The email address must be email")
      .required("The email address is mandatory"),
    change_password: Yup.boolean(),
    current_password: Yup.string().when("change_password", {
      is: true,
      then: Yup.string()
        .required("Current password is mandatory.")
        .min(8, "Current password must be at least 8 characters.")
        .max(30, "Current password must be at most 30 characters."),
    }),
    password: Yup.string().when("change_password", {
      is: true,
      then: Yup.string()
        .required("New Password is mandatory.")
        .min(8, "New Password must be at least 8 characters.")
        .max(30, "New Password must be at most 30 characters."),
    }),
    password_confirmation: Yup.string().when("change_password", {
      is: true,
      then: Yup.string()
        .required("Confirm Password is mandatory.")
        .min(8, "New Password must be at least 8 characters.")
        .max(30, "New Password must be at most 30 characters.")
        .oneOf([Yup.ref("password"), null], "Password doesn't match."),
    }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    let payload = data;

    if (!changePwd) {
      payload["change_password"] = 0;
    } else {
      payload["change_password"] = 1;
    }

    dispatch(employerAuthActions.updateAccount(payload)).then((res) => {
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
                  message = errBag[key];
                }
              }

              return setError(key, { message: message });
            });
          }
        } catch (e) {
          //
        }
      } else {
        setChangePwd(false);
        dispatch(setMessage("Account setting updated."));
        dispatch(setOpen(true));
        window.location.reload();
      }
    });
  }

  const handleChangePwd = (e) => {
    setChangePwd(e.target.checked);
  };

  return (
    <Paper
      sx={{
        borderRadius: "10px",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" py={3} px={4} color="primary">
          Account Setting
        </Typography>
        <Divider />
        {!loading && Object.keys(employer?.data).length > 1 && (
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              direction="row"
              justifyContent="start"
              alignItems="center"
              sx={{ px: 4, py: 3 }}
              spacing={3}
            >
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12} md={8}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="secondary"
                  >
                    <StyledTextField
                      id="fullName"
                      size="large"
                      type="text"
                      name="full_name"
                      fullWidth
                      required
                      label="Full Name"
                      error={!!errors.full_name}
                      {...register("full_name")}
                      defaultValue={employer?.data?.full_name}
                    />
                    <FormHelperText error={!!errors.full_name}>
                      {errors.full_name?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="secondary"
                  >
                    <StyledTextField
                      id="mobileNumber"
                      size="large"
                      type="text"
                      name="mobile_no"
                      fullWidth
                      required
                      label="Mobile Number"
                      error={!!errors.mobile_no}
                      {...register("mobile_no")}
                      defaultValue={employer?.data?.mobile_no}
                    />
                    <FormHelperText error={!!errors.mobile_no}>
                      {errors.mobile_no?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="secondary"
                  >
                    <StyledTextField
                      id="email"
                      size="large"
                      type="email"
                      name="email"
                      fullWidth
                      required
                      label="Email"
                      error={!!errors.email}
                      {...register("email")}
                      defaultValue={employer?.data?.email}
                    />
                    <FormHelperText error={!!errors.email}>
                      {errors.email?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="secondary"
                  >
                    <StyledTextField
                      id="businessName"
                      size="large"
                      type="text"
                      name="business_name"
                      fullWidth
                      required
                      label="Organization Name"
                      error={!!errors.business_name}
                      {...register("business_name")}
                      defaultValue={employer?.data?.business_name}
                    />
                    <FormHelperText error={!!errors.business_name}>
                      {errors.business_name?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8}>
                  <FormControlLabel
                    control={
                      <Switch
                        value={1}
                        {...register("change_password")}
                        onChange={handleChangePwd}
                        checked={changePwd}
                      />
                    }
                    label="Change Password"
                    size="small"
                    sx={{
                      ".MuiFormControlLabel-label": {
                        fontSize: "12px",
                      },
                    }}
                  />
                </Grid>

                {changePwd && (
                  <Fragment>
                    <Grid item xs={12} md={8}>
                      <PasswordControl
                        props={currentPwdProps}
                        errors={!!errors.current_password}
                        message={errors.current_password?.message}
                        register={{ ...register("current_password") }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <PasswordControl
                        props={passwordProps}
                        errors={!!errors.password}
                        message={errors.password?.message}
                        register={{ ...register("password") }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <PasswordControl
                        props={comPasswordProps}
                        errors={!!errors.password_confirmation}
                        message={errors.password_confirmation?.message}
                        register={{ ...register("password_confirmation") }}
                      />
                    </Grid>
                  </Fragment>
                )}

                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={8}
                  xl={8}
                  justifyContent="flex-end"
                  display="flex"
                >
                  <LoadingButton
                    type="submit"
                    color="primary"
                    variant="contained"
                    loading={isSubmitting}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    sx={{
                      width: "110px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                    }}
                  >
                    Update
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default EmployerAccountSetting;

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E8E8E8",
    },
    "&:hover fieldset": {
      border: "2px solid #E8E8E8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#195DCC",
    },
  },
  ".MuiFormLabel-asterisk": {
    color: "#B71C1C",
  },
}));

const currentPwdProps = {
  title: "Current Password",
  name: "current_password",
  id: "current-password",
};

const passwordProps = {
  title: 'New Password',
  name: 'password',
  id: 'password',
}

const comPasswordProps = {
  title: 'Confirmed Password',
  name: 'password_confirmation',
  id: 'password-confirmation',
}