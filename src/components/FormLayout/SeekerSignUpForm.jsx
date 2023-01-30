import React, {useEffect} from 'react';
import {Alert, Box, Button, FormControl, FormHelperText, Grid, TextField} from "@mui/material";
import PasswordControl from "../Controls/PasswordControl";
import {useDispatch, useSelector} from "react-redux";
import {helper, history} from "../../helpers";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {authActions} from "../../store";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

const passwordProps = {
  title: "Password",
  name: "password",
  id: "password",
};

const comPasswordProps = {
  title: "Confirmed Password",
  name: "password_confirmation",
  id: "password-confirmation",
};

const SeekerSignUpForm = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) history.navigate("/");
  }, [isLoggedIn]);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("The password is mandatory."),
    full_name: Yup.string().required("The full name is mandatory."),
    phone_no: Yup.string().required("The mobile number is mandatory."),
    password_confirmation: Yup.string()
      .required("The confirm password is mandatory.")
      .oneOf([Yup.ref("password"), null], "Password doesn't match.")
      .min(8)
      .max(50),
    email: Yup.string()
      .email("The email address must be email")
      .required("The email address is mandatory"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({
    full_name,
    phone_no,
    email,
    password,
    password_confirmation,
  }) {
    dispatch(
      authActions.register({
        full_name,
        phone_no,
        email,
        password,
        password_confirmation,
      })
    ).then(res => {
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
  }

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={{ xs: 3, md: 1, xl: 1.5 }}>
        {!!errors.general && (
          <Grid item xs={12}>
            <Alert severity="error">{errors.general?.message}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="standard"
            size="large"
            color="secondary"
          >
            <TextField
              id="fullName"
              size="large"
              type="text"
              name="full_name"
              fullWidth
              required
              label="Full Name"
              error={!!errors.full_name}
              {...register("full_name")}
            />
            <FormHelperText error={!!errors.full_name}>
              {errors.full_name?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="standard"
            size="large"
            color="secondary"
          >
            <TextField
              id="phoneNo"
              size="large"
              type="text"
              name="phone_no"
              fullWidth
              required
              label="Mobile Number"
              error={!!errors.phone_no}
              {...register("phone_no")}
            />
            <FormHelperText error={!!errors.phone_no}>
              {errors.phone_no?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="standard"
            size="large"
            color="secondary"
          >
            <TextField
              id="email"
              size="large"
              type="text"
              name="email"
              fullWidth
              required
              label="Email"
              error={!!errors.email}
              {...register("email")}
            />
            <FormHelperText error={!!errors.email}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <PasswordControl
            props={passwordProps}
            errors={!!errors.password}
            message={errors.password?.message}
            register={{ ...register("password") }}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordControl
            props={comPasswordProps}
            errors={!!errors.password_confirmation}
            message={errors.password_confirmation?.message}
            register={{ ...register("password_confirmation") }}
          />
        </Grid>
        <Grid item xs={12}>
          {isSubmitting ? (
            <LoadingButton
              loading
              loadingPosition="start"
              color="secondary"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Create Account
            </LoadingButton>
          ) : (
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              type="submit"
            >
              Create Account
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SeekerSignUpForm;