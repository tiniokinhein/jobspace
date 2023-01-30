import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  styled,
  Switch,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { authActions, userActions } from "../../store";
import { setProgress } from "../../store/slices/progress";
import PasswordControl from "../Controls/PasswordControl";
import { helper } from "../../helpers";

const AccountSettingForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [changePwd, setChangePwd] = useState(false);

  const fetchUser = useCallback(() => {
    dispatch(authActions.getUser());
  }, [dispatch]);

  const handleChangePwd = (e) => {
    setChangePwd(e.target.checked);
  };

  useEffect(() => {
    dispatch(setProgress(50));
    fetchUser();
    dispatch(setProgress(100));
    setLoading(false);
    // eslint-disable-next-line
  }, [fetchUser]);

  const validationSchema = Yup.object().shape({
    phone_no: Yup.string().required("The mobile number is mandatory."),
    email: Yup.string()
      .email("The email address must be email.")
      .required("The email address is mandatory."),
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

    dispatch(userActions.updateAccount(payload)).then((res) => {
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
        window.location.reload();
      }
    });
  }

  return (
    <>
      {!loading && Object.keys(user).length > 1 && (
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
                <FormControl fullWidth variant="standard">
                  <StyledTextField
                    id="email"
                    type="text"
                    name="email"
                    variant="outlined"
                    required
                    label="Email ID"
                    defaultValue={user?.email}
                    error={!!errors.email}
                    {...register("email")}
                  />
                  <FormHelperText error={!!errors.email}>
                    {errors.email?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={8}>
                <FormControl fullWidth variant="standard">
                  <StyledTextField
                    id="phone_no"
                    type="number"
                    name="email"
                    variant="outlined"
                    label="Mobile No."
                    required
                    defaultValue={user?.phone_no}
                    error={!!errors.phone_no}
                    {...register("phone_no")}
                  />
                  <FormHelperText error={!!errors.phone_no}>
                    {errors.phone_no?.message}
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
    </>
  );
};

export default AccountSettingForm;

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