import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { abilitiesActions, employerAuthActions } from "../../store";
import PasswordControl from "../Controls/PasswordControl";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { helper, history } from "../../helpers";
import AuthAlert from "../Alert/AuthAlert";

const passwordProps = {
  title: "Password",
  name: "password",
  id: "password",
};

const EmployerSignInForm = () => {
  const dispatch = useDispatch();
  const type = useSelector((x) => x.empAuth.alertType);
  const { isEmpLoggedIn } = useSelector((x) => x.empAuth);
  const notification = useSelector((x) => x.empAuth.alert);
  const [invalidError, setInvalidError] = useState(null);

  useEffect(() => {
    if (isEmpLoggedIn) history.navigate("/");
  }, [isEmpLoggedIn]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("The email is mandatory."),
    password: Yup.string().required("The password is mandatory."),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email, password }) {
    return dispatch(employerAuthActions.login({ email, password })).then(
      (response) => {
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
                setInvalidError(validation.credentials);
              }
            } else {
              setError("general", { message: response.error.message });
            }
          } catch (e) {
            //
          }
        } else {
          dispatch(abilitiesActions.getAll());
        }
      }
    );
  }

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {!!errors.general && (
          <AuthAlert notification={errors.general?.message} />
        )}

        <AuthAlert notification={notification} type={type} />

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
            <StyleTextField
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
          {isSubmitting ? (
            <LoadingButton
              loading
              fullWidth
              loadingPosition="start"
              color="secondary"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Signing...
            </LoadingButton>
          ) : (
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployerSignInForm;

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