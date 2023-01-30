import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { contactActions } from "../../store";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import ContactUsBackground from "../../assets/backgrounds/contact_us.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { setProgress } from "../../store/slices/progress";
import { helper } from "../../helpers";

const ContactUs = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("The name is required field."),
    email: Yup.string().email(
      "The email address must be a valid email address."
    ),
    phone: Yup.string().required("The phone no is required field."),
    description: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, setError, formState } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ name, email, phone, description }) {
    dispatch(contactActions.create({ name, email, phone, description })).then(
      (res) => {
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
      }
    );
    reset();
  }

  useEffect(() => {
    dispatch(setProgress(100));
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="xl">
      <Box px={{ lg: "30px", xl: 0 }} py={3} minHeight="42.9vh">
        <Paper sx={{ mx: { xs: 0, md: 25 }, py: 8, borderRadius: "12px" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: "none", md: "block" } }}
              container
              direction="column"
              justifyContent="center"
              alignItems="start"
              px={6}
            >
              <img
                width="100%"
                height="50%"
                src={ContactUsBackground}
                alt="contact-us"
              />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="start"
                spacing={3}
                mt={8}
                px={3}
              >
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  spacing={3}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #000000",
                      width: 30,
                      height: 30,
                    }}
                  >
                    <LocationOnIcon
                      sx={{ color: "#195DCC", fontSize: "16px" }}
                    />
                  </Avatar>
                  <Typography fontSize="14px" flexWrap>
                    No. F, Kan Yeik Mon Housing, Kan Street, Hlaing Township,
                    Yangon, Myanmar.
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  spacing={3}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #000000",
                      width: 30,
                      height: 30,
                    }}
                  >
                    <PhoneIcon sx={{ color: "#195DCC", fontSize: "16px" }} />
                  </Avatar>
                  <Typography fontSize="14px" flexWrap>
                    +95 9 944 190 999
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                  spacing={3}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #000000",
                      width: 30,
                      height: 30,
                    }}
                  >
                    <EmailIcon sx={{ color: "#195DCC", fontSize: "16px" }} />
                  </Avatar>
                  <Typography fontSize="14px" flexWrap>
                    info@jobspace.com.mm
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} px={{ xs: 3 }}>
              <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6} lg={8}>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontWeight: 600,
                        fontSize: "24px",
                        mb: "8px",
                        background: "none",
                      }}
                    >
                      Contact Us
                    </Typography>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontWeight: 400,
                        fontSize: "14px",
                        pb: "10px",
                        background: "none",
                      }}
                    >
                      We are here for you! How can we help?
                    </Typography>
                    <FormControl
                      fullWidth
                      variant="standard"
                      size="large"
                      color="secondary"
                    >
                      <StyleTextField
                        id="employer_contact_person_name"
                        size="large"
                        label="Name"
                        type="text"
                        variant="outlined"
                        name="name"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <FormControl
                      fullWidth
                      variant="standard"
                      size="large"
                      color="secondary"
                    >
                      <StyleTextField
                        id="employer-contact-person-email"
                        size="large"
                        type="email"
                        name="email"
                        label="Email"
                        {...register("email")}
                        error={!!errors.name}
                        helperText={errors.email?.message}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <FormControl
                      fullWidth
                      variant="standard"
                      size="large"
                      color="secondary"
                    >
                      <StyleTextField
                        id="employer-contact-phone"
                        size="large"
                        type="number"
                        name="phone"
                        label="Phone"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <FormControl
                      fullWidth
                      variant="standard"
                      size="large"
                      color="secondary"
                    >
                      <StyleTextField
                        id="employer-contact-description"
                        label="Description"
                        multiline
                        minRows={3}
                        maxRows={8}
                        variant="outlined"
                        fullWidth
                        name="description"
                        placeholder="Description"
                        error={!!errors.description}
                        {...register("description")}
                        helperText={errors.description?.message}
                        required
                        InputLabelProps={{ shrink: true }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    lg={8}
                    sx={{ display: "flex", justifyContent: "start" }}
                  >
                    {isSubmitting ? (
                      <LoadingButton
                        loading
                        loadingPosition="start"
                        color="secondary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                      >
                        Send
                      </LoadingButton>
                    ) : (
                      <Button
                        color="secondary"
                        variant="contained"
                        fullWidth
                        type="submit"
                      >
                        Send
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ContactUs;

// const StyleTextField = styled(TextField)(() => ({
//     '.MuiFormLabel-asterisk': {
//         color: '#B71C1C'
//     }, '.MuiInputLabel-formControl': {
//         fontSize: '14px',
//     }
// }));

const StyleTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E8E8E8 !important",
    },
    "&:hover fieldset": {
      border: "2px solid #E8E8E8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#195DCC !important",
    },
  },
  ".MuiFormLabel-asterisk": {
    color: "#B71C1C",
  },
}));
