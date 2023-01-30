import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardMedia,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import NationalityDataService from "../../services/nationality.service";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RegionDataService from "../../services/regions.service";
import TownshipDataService from "../../services/townships.service";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { authActions, personalInfoActions } from "../../store";
import { setProgress } from "../../store/slices/progress";
import { helper } from "../../helpers";
import { useNavigate } from "react-router-dom";
import CountryDataService from "../../services/country.service";

const ProfileFormComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((x) => x.auth);
  const [gender, setGender] = useState(1);
  const [value, setValue] = useState(null);
  const [marital, setMarital] = useState(1);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [townships, setTownships] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const { personal_info: PersonalInfo } = useSelector(
    (state) => state.personal_info
  );

  const initFetch = useCallback(() => {
    dispatch(personalInfoActions.get()).then((r) => {
      if (r.payload) {
        setSelectedCountry(r.payload?.country);
        setSelectedRegion(r.payload?.region);
        setSelectedTownship(r.payload?.township);
        setSelectedNationality(r.payload?.nationality);
        setValue(new Date(`${r.payload?.dob}`));
        setGender(r.payload?.gender);
        setMarital(r.payload?.marital);

        retrieveRegions(r.payload.country?.uuid);
        retrieveTownships(r.payload.region?.uuid);
      }
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    (async () => {
      dispatch(setProgress(50));
      await CountryDataService.get().then((r) => setCountries(r.data));
      // await RegionDataService.all().then(r => setRegions(r.data));
      await NationalityDataService.get().then((r) => setNationalities(r.data));
      dispatch(setProgress(100));
    })();
    // eslint-disable-next-line
  }, []);

  const validationSchema = Yup.object().shape({
    street: Yup.string().max(200),
    nrc: Yup.string().max(50).nullable(),
    full_name: Yup.string().required("The full name is mandatory."),
    phone_no: Yup.string().required("The mobile number is mandatory."),
    short_bio: Yup.string().required("The short bio is mandatory.").max(500),
    gender: Yup.string().required("The gender is mandatory.").min(1).max(2),
    marital_status: Yup.string()
      .required("The marital status is mandatory.")
      .min(1)
      .max(2),
    email: Yup.string()
      .email("The email address must be a valid email.")
      .required("The email address is mandatory."),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    let payload = data;

    if (selectedNationality) {
      payload.nationality_id = selectedNationality.uuid ?? null;
    }

    if (selectedCountry) {
      payload.country_id = selectedCountry.uuid ?? null;
    }

    if (selectedRegion) {
      payload.region_id = selectedRegion.uuid ?? null;
    }

    if (selectedTownship) {
      payload.township_id = selectedTownship.uuid ?? null;
    }

    if (value) {
      const date = format(value);
      if (date !== "NaN-NaN-NaN") {
        payload.dob = format(value);
      }
    }

    let formData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    if (selectedImage) {
      formData.append("profile_img", selectedImage);
    }

    return dispatch(personalInfoActions.create(formData, true)).then((res) => {
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
        dispatch(authActions.getUser());
        navigate("/seekers/profile");
      }
    });
  }

  const retrieveRegions = async (countryId) => {
    if (countryId) {
      await RegionDataService.getRegionsByCountryUuid(countryId).then((r) => {
        setRegions(r.data);
      });
    }
  };

  const retrieveTownships = async (regionId) => {
    if (regionId) {
      await TownshipDataService.getTownshipByRegionUuid(regionId).then((r) => {
        setTownships(r.data);
      });
    }
  };

  const handleCountryChange = (item) => {
    setSelectedCountry(item);
    retrieveRegions(item.uuid);
    setSelectedRegion(null);
    setSelectedTownship(null);
  };

  const handleRegionChange = (item) => {
    setSelectedRegion(item);
    retrieveTownships(item.uuid);
    setSelectedTownship(null);
  };

  const handleTownshipChange = (item) => {
    setSelectedTownship(item);
  };

  const handleNationalityChange = (item) => {
    setSelectedNationality(item);
  };

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };

  function format(inputDate) {
    if (inputDate !== "Invalid Date") {
      let month, year, day;

      let date = new Date(inputDate);

      day = date.getDate();
      month = date.getMonth() + 1;
      year = date.getFullYear();

      if (day.toString().length === 1) {
        day = "0" + day;
      }

      month = month.toString().padStart(2, "0");

      return `${day}-${month}-${year}`;
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loading && (
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{
            px: { xs: 2, sm: 4 },
            py: 3,
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            xl={8}
            sx={{
              display: "flex",
              flexDirection: "row",
              pb: "10px",
            }}
          >
            <Stack spacing={1} width="100%">
              <Skeleton width="120px" />
              <Skeleton variant="rounded" width={134} height={134} />
              <Skeleton width="90%" />
              <Skeleton width="80%" />
            </Stack>
          </Grid>
        </Grid>
      )}

      {!loading && (
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={3}
          sx={{
            px: 4,
            py: 3,
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            xl={8}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{ color: "#808080" }}
              fontSize="15px"
              fontWeight={400}
            >
              <span className="error">*</span>&nbsp;Indicates required
            </Typography>
          </Grid>

          <Grid item xs={12} md={8} lg={8} xl={8}>
            <Box mb={3}>
              {imagePreview ? (
                <Card sx={{ maxWidth: 134, maxHeight: 134 }}>
                  <label htmlFor="upload-image">
                    <CardMedia
                      component="img"
                      image={imagePreview}
                      alt="profile preview"
                    />
                  </label>
                  <input
                    hidden
                    id="upload-image"
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Card>
              ) : (
                <>
                  {!PersonalInfo?.profile_img && (
                    <Button component="label" sx={{ p: 0 }}>
                      <label htmlFor="upload-image">
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 134,
                            height: 131,
                            bgcolor: "#EAEAEA",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <PhotoCameraIcon
                              sx={{
                                color: "#ffffff",
                                backgroundColor: "#00A0DC",
                                p: "2px",
                                mb: 1,
                                borderRadius: "6px",
                              }}
                            />
                            <Typography
                              sx={{
                                color: "#585858",
                                fontSize: "12px",
                                fontWeight: 400,
                              }}
                            >
                              Choose Profile Photo
                            </Typography>
                          </Box>
                        </Avatar>
                      </label>
                      <input
                        hidden
                        id="upload-image"
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                  )}
                  <Box>
                    <Typography fontSize="12px" component="span" color="#525252">
                        Recommended image size - 300 x 300 pixels
                    </Typography>
                  </Box>
                </>
              )}

              {!imagePreview && PersonalInfo?.profile_img && (
                <ButtonBase>
                  <Card
                    sx={{
                      maxWidth: 134,
                      maxHeight: 134,
                      minWidth: 134,
                      minHeight: 134,
                    }}
                  >
                    <label htmlFor="upload-image">
                      <CardMedia
                        component="img"
                        image={PersonalInfo?.profile_img}
                        alt="profile"
                        onChange={handleFileChange}
                      />
                    </label>
                    <input
                      hidden
                      id="upload-image"
                      accept="image/*"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </Card>
                </ButtonBase>
              )}
            </Box>

            {/*<Button color="secondary" aria-label="upload picture" component="label"*/}
            {/*        sx={{*/}
            {/*            mb: '5px',*/}
            {/*            background: '#E9E9E9',*/}
            {/*            paddingX: '12px'*/}
            {/*        }}>*/}
            {/*    <input hidden accept="image/*" type="file" onChange={handleFileChange}/>*/}
            {/*    <Stack direction="row" display="flex" alignContent="center" alignItems="center"*/}
            {/*           spacing={1}>*/}
            {/*        <SvgIcon fontSize="1.2rem"><PrimaryRocketIcon width="100%" height="100%"/></SvgIcon>*/}
            {/*        <Typography sx={{*/}
            {/*            color: '#585858',*/}
            {/*            fontSize: '12px',*/}
            {/*            fontWeight: 400*/}
            {/*        }}*/}
            {/*        >*/}
            {/*            Choose Image*/}
            {/*        </Typography>*/}
            {/*    </Stack>*/}
            {/*</Button>*/}

            {!!errors.profile_img && (
              <Typography fontSize="12px" color="error" component="span">
                {errors.profile_img?.message}
              </Typography>
            )}

            <Divider />
          </Grid>
          <Grid item xs={12} md={8} lg={8} xl={8} container pt={2} spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <StyleTextField
                  id="full-name"
                  type="text"
                  name="full_name"
                  required
                  label="Full Name"
                  defaultValue={PersonalInfo?.full_name || user?.full_name}
                  error={!!errors.full_name}
                  {...register("full_name")}
                />
                <FormHelperText error={!!errors.full_name}>
                  {errors.full_name?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <StyleTextField
                  id="email"
                  type="text"
                  name="email"
                  required
                  label="Email"
                  defaultValue={PersonalInfo?.email || user?.email}
                  error={!!errors.email}
                  {...register("email")}
                />
                <FormHelperText error={!!errors.email}>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <StyleTextField
                  id="phone-no"
                  type="number"
                  name="phone_no"
                  required
                  label="Phone Number"
                  defaultValue={PersonalInfo?.phone_no || user?.phone_no}
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
                <StyleTextField
                  id="nrc"
                  type="text"
                  name="nrc"
                  label="NRC or Passport Number"
                  defaultValue={PersonalInfo?.nrc || user?.nrc}
                  error={!!errors.nrc}
                  {...register("nrc")}
                />
                <FormHelperText error={!!errors.nrc}>
                  {errors.nrc?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                disablePortal
                disableClearable
                id="nationality"
                options={nationalities}
                value={selectedNationality || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyleTextField
                    error={!!errors.nationality_id}
                    {...params}
                    fullWidth
                    required
                    label="Nationality"
                    sx={{
                      ".MuiFormLabel-asterisk": {
                        color: "#B71C1C",
                      },
                      ".MuiInputLabel-formControl": {
                        fontSize: "14px",
                      },
                    }}
                    variant="outlined"
                    name="nationality_id"
                    InputLabelProps={{ required: true }}
                    {...register("nationality_id")}
                    helperText={errors.nationality_id?.message}
                  />
                )}
                onChange={(event, value) => handleNationalityChange(value)}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={value}
                  inputFormat="dd-MM-yyyy"
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <StyleTextField
                      fullWidth
                      {...params}
                      variant="outlined"
                      name="dob"
                      error={!!errors.dob}
                      {...register("dob")}
                      helperText={errors.dob?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="country-box"
                  options={countries}
                  value={selectedCountry || null}
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <StyleTextField
                      {...params}
                      fullWidth
                      label="Country"
                      variant="outlined"
                      required
                      error={!!errors.country_id}
                      helperText={errors.country_id?.message}
                    />
                  )}
                  name="country_id"
                  {...register("country_id")}
                  onChange={(event, value) => handleCountryChange(value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="region-box"
                  options={regions}
                  value={selectedRegion || null}
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <StyleTextField
                      error={!!errors.region_id}
                      {...params}
                      fullWidth
                      label="Region"
                      sx={{
                        ".MuiFormLabel-asterisk": {
                          color: "#B71C1C",
                        },
                        ".MuiInputLabel-formControl": {
                          fontSize: "14px",
                        },
                      }}
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      {...register("region_id")}
                      helperText={errors.region_id?.message}
                    />
                  )}
                  onChange={(event, value) => handleRegionChange(value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  disableClearable
                  id="township-box"
                  options={townships}
                  value={selectedTownship || null}
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <StyleTextField
                      error={!!errors.township_id}
                      {...params}
                      fullWidth
                      label="Township"
                      sx={{
                        ".MuiFormLabel-asterisk": {
                          color: "#B71C1C",
                        },
                        ".MuiInputLabel-formControl": {
                          fontSize: "14px",
                        },
                      }}
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      {...register("township_id")}
                      helperText={errors.township_id?.message}
                    />
                  )}
                  onChange={(event, value) => handleTownshipChange(value)}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <StyleTextField
                id="street"
                label="Street"
                multiline
                minRows={1}
                maxRows={4}
                variant="outlined"
                fullWidth
                sx={{
                  ".MuiInputLabel-formControl": {
                    fontSize: "14px",
                  },
                }}
                name="street"
                error={!!errors.street}
                {...register("street")}
                helperText={errors.street?.message}
                defaultValue={PersonalInfo?.street}
              />
            </Grid>

            <Grid item xs={12}>
              <StyleTextField
                id="short-bio"
                label="Short Bio (Describe about yourself briefly.)"
                multiline
                minRows={4}
                maxRows={10}
                variant="outlined"
                fullWidth
                required
                sx={{
                  ".MuiFormLabel-asterisk": {
                    color: "#B71C1C",
                  },
                  ".MuiInputLabel-formControl": {
                    fontSize: "14px",
                  },
                }}
                name="short_bio"
                error={!!errors.short_bio}
                {...register("short_bio")}
                helperText={errors.short_bio?.message ?? "500 Character limit"}
                defaultValue={PersonalInfo?.short_bio}
                InputLabelProps={{ required: true }}
              />
            </Grid>

            <Grid item xs={12} md={8} lg={8} xl={8}>
              <FormControl>
                <FormLabel
                  id="marital-status"
                  sx={{ fontWeight: 400, fontSize: "14px" }}
                >
                  Marital Status
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="marital-status"
                  name="marital_status"
                  defaultValue={marital ?? 1}
                  {...register("marital_status")}
                >
                  <StyledFormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Single"
                    {...register("marital_status")}
                  />
                  <StyledFormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Married"
                    {...register("marital_status")}
                  />
                </RadioGroup>
                {!!errors.marital_status && (
                  <FormHelperText error={!!errors.marital_status}>
                    {errors.marital_status?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormLabel
                  id="gender"
                  sx={{ fontWeight: 400, fontSize: "14px" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  defaultValue={gender ?? 1}
                  aria-labelledby="gender"
                  {...register("gender")}
                >
                  <StyledFormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Male"
                    {...register("gender")}
                  />
                  <StyledFormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Female"
                    {...register("gender")}
                  />
                </RadioGroup>
                {!!errors.gender && (
                  <FormHelperText error={!!errors.gender}>
                    {errors.gender?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} justifyContent="flex-end" display="flex">
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
                }}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProfileFormComponent;

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
    '.MuiFormControlLabel-label': {
        fontSize: '14px'
    }
}));

const StyleTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E8E8E8',
        },
        '&:hover fieldset': {
            border: '2px solid #E8E8E8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#195DCC',
        },
    }, '.MuiFormLabel-asterisk': {
        color: '#B71C1C'
    }
}))