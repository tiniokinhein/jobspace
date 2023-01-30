import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import AuthAlert from "../Alert/AuthAlert";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { authActions } from "../../store";
import { helper } from "../../helpers";

const SeekerSignInForm = () => {
  const dispatch = useDispatch();
  const type = useSelector((x) => x.auth.alertType);
  const notification = useSelector((x) => x.auth.alert);
  const [invalidError, setInvalidError] = useState(null);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("The password is mandatory."),
    email: Yup.string().required("The email / mobile is mandatory."),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  function onSubmit({ email, password }) {
    return dispatch(authActions.login({ email, password })).then((response) => {
      if (response.error) {
        try {
          if (helper.isJson(response.error.message)) {
            const validation = JSON.parse(response.error.message);

            if (validation.email) {
              setError("email", { message: validation.email });
            }

            if (validation.password) {
              setError("password", { message: validation.password });
            }

            if (validation.credentials) {
              setInvalidError("That Jobspace account doesn't exists.");
            }
          } else {
            setError("general", { message: response.error.message });
          }
        } catch (e) {
          //
        }
      }
    });
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid spacing={{ xs: 4, sm: 2, xl: 4 }} container>
        {!!errors.general && (
          <AuthAlert
            notification={errors.general?.message}
            type="error"
            setInvalidError={setInvalidError}
          />
        )}

        <AuthAlert
          notification={notification}
          type={type}
          setInvalidError={setInvalidError}
        />

        <AuthAlert
          notification={invalidError}
          type="error"
          setInvalidError={setInvalidError}
        />

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
              label="Email / Mobile"
              error={!!errors.email}
              {...register("email")}
            />
            <FormHelperText error={!!errors.email}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor="standard-adornment-password"
              color="grey"
              error={!!errors.password}
            >
              Password&nbsp;<span className="error">&lowast;</span>
            </InputLabel>
            <OutlinedInput
              id="standard-adornment-password"
              type={values.showPassword ? "text" : "password"}
              size="large"
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              name="password"
              error={!!errors.password}
              {...register("password")}
              required
              label="Password"
            />
            <FormHelperText error={!!errors.password}>
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={isSubmitting}
            fullWidth
            color="secondary"
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="right">
            <Link
              to="/seekers/forgot-password"
              component={RouterLink}
              underline="hover"
              color="secondary"
            >
              Forgot Password
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography color="text.secondary" align="center">
            Don't have an account yet ?&nbsp;&nbsp;
            <Link
              to="/seekers/sign-up"
              component={RouterLink}
              color="secondary"
              underline="none"
            >
              Sign Up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SeekerSignInForm;
