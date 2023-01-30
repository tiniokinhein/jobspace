import React, { memo, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import PasswordControl from "../Controls/PasswordControl";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { helper, history } from "../../helpers";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { employerAuthActions } from "../../store";

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

const EmployerSignUpForm = () => {
  const dispatch = useDispatch();

  const { isEmpLoggedIn } = useSelector((x) => x.empAuth);

  useEffect(() => {
    if (isEmpLoggedIn) history.navigate("/");
  }, [isEmpLoggedIn]);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("The full name is mandatory."),
    mobile_no: Yup.string().required("The mobile number is mandatory."),
    password: Yup.string()
      .required("The password is mandatory.")
      .min(8)
      .max(50),
    password_confirmation: Yup.string()
      .required("The confirm password is mandatory.")
      .oneOf([Yup.ref("password"), null], "Password doesn't match.")
      .min(8)
      .max(50),
    business_name: Yup.string()
      .required("The registered organization name is mandatory")
      .min(3)
      .max(255),
    email: Yup.string()
      .email("The email address must be email")
      .required("The email address is mandatory"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ ...data }) {
    dispatch(employerAuthActions.register({ ...data })).then((res) => {
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
      <Grid container spacing={{ xs: 3, md: 0.5, xl: 1 }}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="standard"
            size="large"
            color="secondary"
          >
            <StyleTextField
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
            <StyleTextField
              id="mobileNumber"
              size="large"
              type="text"
              name="mobile_no"
              fullWidth
              required
              label="Mobile Number"
              error={!!errors.mobile_no}
              {...register("mobile_no")}
            />
            <FormHelperText error={!!errors.mobile_no}>
              {errors.mobile_no?.message}
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
            <StyleTextField
              id="email"
              size="large"
              type="email"
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
          <FormControl
            fullWidth
            variant="standard"
            size="large"
            color="secondary"
          >
            <StyleTextField
              id="businessName"
              size="large"
              type="text"
              name="business_name"
              fullWidth
              required
              label="Organization Name"
              error={!!errors.business_name}
              {...register("business_name")}
            />
            <FormHelperText error={!!errors.business_name}>
              {errors.business_name?.message}
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

export default memo(EmployerSignUpForm);

const StyleTextField = styled(TextField)(() => ({
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