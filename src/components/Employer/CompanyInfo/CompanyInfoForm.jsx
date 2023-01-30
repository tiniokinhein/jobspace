import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import CountryDataService from "../../../services/country.service";
import RegionDataService from "../../../services/regions.service";
import TownshipDataService from "../../../services/townships.service";
import IndustryDataService from "../../../services/industry.service";
import EmployeeCountService from "../../../services/employee.count.service";
import { useDispatch, useSelector } from "react-redux";
import { companiesActions, employerAuthActions } from "../../../store";
import { helper, history } from "../../../helpers";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { PhotoCamera } from "@mui/icons-material";
import { setProgress } from "../../../store/slices/progress";

const CompanyInfoForm = () => {
  const dispatch = useDispatch();
  const [regions, setRegions] = useState([]);
  const [townships, setTownships] = useState([]);
  const [countries, setCountries] = useState([]);
  const [empCounts, setEmpCounts] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [selectedEmpCount, setSelectedEmpCount] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const { company } = useSelector((state) => state.empAuth);

  const handleLogoChange = (e) => {
    setLogoPreview(URL.createObjectURL(e.target.files[0]));
    setSelectedLogo(e.target.files[0]);
  };

  const handleBannerChange = (e) => {
    setBannerPreview(URL.createObjectURL(e.target.files[0]));
    setSelectedBanner(e.target.files[0]);
  };

  const fetchCompany = useCallback(() => {
    dispatch(employerAuthActions.company()).then((r) => {
      if (Object.keys(r.payload.data).length > 0) {
        const data = r.payload.data;

        if (data.country) {
          setSelectedCountry(data.country);
          retrieveRegions(data.country?.uuid);
        }

        if (data.region) {
          setSelectedRegion(data.region);
          retrieveTownships(data.region?.uuid);
        }

        if (data.township) {
          setSelectedTownship(data.township);
        }

        if (data.industry) {
          setSelectedIndustry(data.industry);
        }

        if (data.employee_count) {
          setSelectedEmpCount(data.employee_count);
        }

        if (data.banner) {
          setBannerPreview(data.banner);
        }

        if (data.logo) {
          setLogoPreview(data.logo);
        }
      }
    });
  }, [dispatch]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  useEffect(() => {
    (async () => {
      dispatch(setProgress(30));

      await CountryDataService.get().then((r) => {
        setCountries(r.data);
      });

      await IndustryDataService.all().then((r) => {
        setIndustries(r.data);
      });

      await EmployeeCountService.all().then((r) => {
        setEmpCounts(r.data);
      });

      dispatch(setProgress(100));
    })();
    // eslint-disable-next-line
  }, []);

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
  };

  const handleRegionChange = (item) => {
    setSelectedRegion(item);
    retrieveTownships(item.uuid);
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("Company name is mandatory."),
    email: Yup.string().email().nullable(),
    website: Yup.string().url().nullable().max(100),
    founded_since: Yup.number().test(
      "len",
      "Must be exactly 4 characters",
      (val) => val && val.toString().length === 4
    ),
    about_us: Yup.string().max(10000).nullable(true),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    let payload = data;

    if (selectedEmpCount) {
      payload["employee_count_id"] = selectedEmpCount.uuid;
    }

    if (selectedIndustry) {
      payload["industry_id"] = selectedIndustry.uuid;
    }

    if (selectedCountry) {
      payload["country_id"] = selectedCountry.uuid;
    }

    if (selectedRegion) {
      payload["region_id"] = selectedRegion.uuid;
    }

    if (selectedTownship) {
      payload["township_id"] = selectedTownship.uuid;
    }

    let formData = new FormData();

    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    if (selectedLogo) {
      formData.append("logo", selectedLogo);
    }

    if (selectedBanner) {
      formData.append("banner", selectedBanner);
    }

    dispatch(companiesActions.create(formData, true)).then((res) => {
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
        history.navigate("/employers/company-info");
        dispatch(employerAuthActions.company());
      }
    });
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Box sx={{ background: "#FFFFFF", borderRadius: "5px" }}>
            <Box
              sx={{
                px: 7,
                py: 3,
                borderRadius: "10px 10px 0 0",
                background: bannerPreview
                  ? `url(${bannerPreview})`
                  : "linear-gradient(90.48deg, rgba(45, 93, 212, 0.2) 0%, rgba(33, 39, 127, 0.2) 99.91%)",
                backgroundSize: "100% auto",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end", mb: 2 }}
                >
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleBannerChange}
                    />
                    <PhotoCamera />
                  </IconButton>
                </Grid>

                <Grid item xs={4} md={4} lg={4}>
                  {logoPreview ? (
                    <Card
                      sx={{
                        height: 150,
                        width: 150,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Button component="label">
                        <Avatar
                          src={logoPreview}
                          variant="square"
                          sx={{ height: 140, width: 140 }}
                        />
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleLogoChange}
                        />
                      </Button>
                    </Card>
                  ) : (
                    <Card
                      sx={{
                        height: 150,
                        width: 150,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar
                        src="#"
                        variant="rounded"
                        sx={{
                          height: 145,
                          width: 145,
                          border: "4px solid white",
                          background: "#F8F9FA",
                          flexDirection: "column",
                        }}
                      >
                        <IconButton
                          color="secondary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleLogoChange}
                          />
                          <PhotoCamera />
                        </IconButton>
                        <Typography sx={{ color: "#333333", fontSize: "12px" }}>
                          Company Logo
                        </Typography>
                      </Avatar>
                    </Card>
                  )}
                </Grid>

                {!bannerPreview && (
                  <Grid
                    item
                    xs={8}
                    md={8}
                    lg={8}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography sx={{ color: "#333333", mt: 3 }}>
                      Upload Your Company Cover Image
                    </Typography>
                    <Typography
                      sx={{ color: "#6D6969", my: 1, fontSize: "12px" }}
                    >
                      Recommend logo image size - 200 x 200 pixels
                    </Typography>
                    <Typography sx={{ color: "#6D6969", fontSize: "12px" }}>
                      Recommend cover image size - 1920 x 440 pixels
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            {bannerPreview && (
              <Grid container sx={{ px: 7, py: 2 }}>
                <Grid item xs={12}>
                  <Typography
                    sx={{ color: "#6D6969", my: 1, fontSize: "12px" }}
                  >
                    Recommend logo image size - 200 x 200 pixels
                  </Typography>
                  <Typography sx={{ color: "#6D6969", fontSize: "12px" }}>
                    Recommend cover image size - 1920 x 440 pixels
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Box
              sx={{ px: 7, pt: 2, pb: 3 }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="primary"
                  >
                    {/* <InputLabel
                                            htmlFor="standard-adornment-company-name"
                                            color='grey'
                                            error={!!errors.company_name}
                                        >
                                            Your Company's Name&nbsp;<span className="error">*</span>
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-company-name"
                                            size="large"
                                            type="text"
                                            name="company_name"
                                            sx={{pb: '10px'}}
                                            error={!!errors.company_name}
                                            {...register('company_name')}
                                            required
                                            defaultValue={company?.company_name}
                                        /> */}
                    <StyleTextField
                      id="standard-adornment-company-name"
                      size="large"
                      type="text"
                      name="company_name"
                      variant="outlined"
                      sx={{ pb: "10px" }}
                      label="Company's Name"
                      {...register("company_name")}
                      error={!!errors.company_name}
                      required
                      defaultValue={company?.company_name}
                    />
                    <FormHelperText error={!!errors.company_name}>
                      {errors.company_name?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    id="employee-count-box"
                    options={empCounts}
                    value={selectedEmpCount || null}
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
                        variant="outlined"
                        label="Your company’s number of employees"
                        error={!!errors.employee_count_id}
                        helperText={errors.employee_count_id?.message}
                        required
                      />
                    )}
                    name="employee_count_id"
                    {...register("employee_count_id")}
                    onChange={(event, value) => setSelectedEmpCount(value)}
                  />
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="primary"
                  >
                    {/* <InputLabel
                                            htmlFor="standard-adornment-mobile-no"
                                            color='grey'
                                            error={!!errors.mobile_no}
                                        >
                                            Your company's mobile number
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-mobile-no"
                                            size="large"
                                            type="number"
                                            name="mobile_no"
                                            sx={{pb: '10px'}}
                                            error={!!errors.mobile_no}
                                            {...register('mobile_no')}
                                            defaultValue={company.mobile_no ?? null}
                                        /> */}
                    <StyleTextField
                      id="standard-adornment-mobile-no"
                      size="large"
                      type="number"
                      name="mobile_no"
                      label="Your company's mobile number"
                      sx={{ pb: "10px" }}
                      {...register("mobile_no")}
                      error={!!errors.mobile_no}
                      defaultValue={company.mobile_no ?? null}
                    />
                    <FormHelperText error={!!errors.mobile_no}>
                      {errors.mobile_no?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="primary"
                  >
                    {/* <InputLabel
                                            htmlFor="standard-adornment-email"
                                            color='grey'
                                            error={!!errors.email}
                                        >
                                            Your company's Email
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-email"
                                            size="large"
                                            type="text"
                                            name="email"
                                            sx={{pb: '10px'}}
                                            error={!!errors.email}
                                            {...register('email')}
                                            defaultValue={company.email ?? null}
                                        /> */}
                    <StyleTextField
                      id="standard-adornment-email"
                      size="large"
                      type="email"
                      name="email"
                      label="Your company's Email"
                      sx={{ pb: "10px" }}
                      {...register("email")}
                      error={!!errors.email}
                      defaultValue={company.email ?? null}
                    />
                    <FormHelperText error={!!errors.email}>
                      {errors.email?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="primary"
                  >
                    {/* <InputLabel htmlFor="standard-adornment-company-website" color='grey'
                                                    error={!!errors.website}>
                                            Company Website
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-company-website"
                                            size="large"
                                            type="text"
                                            name="website"
                                            sx={{pb: '10px'}}
                                            error={!!errors.website}
                                            {...register('website')}
                                            defaultValue={company.website ?? null}
                                        /> */}
                    <StyleTextField
                      id="standard-adornment-company-website"
                      size="large"
                      type="text"
                      name="website"
                      label="Company Website"
                      sx={{ pb: "10px" }}
                      {...register("website")}
                      error={!!errors.website}
                      defaultValue={company.website ?? null}
                    />
                    <FormHelperText error={!!errors.website}>
                      {errors.website?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    id="industry-box"
                    options={industries}
                    value={selectedIndustry || null}
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
                        variant="outlined"
                        label="Your company's industry"
                        error={!!errors.industry_id}
                        helperText={errors.industry_id?.message}
                        required
                      />
                    )}
                    name="industry_id"
                    {...register("industry_id")}
                    onChange={(event, value) => setSelectedIndustry(value)}
                  />
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <FormControl
                    fullWidth
                    variant="standard"
                    size="large"
                    color="primary"
                  >
                    {/* <InputLabel htmlFor="standard-adornment-company-founded-since"
                                                    color='grey' error={!!errors.founded_since}>
                                            Founded Since&nbsp;<span className="error">*</span>
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-company-founded-since"
                                            size="large"
                                            type="number"
                                            name="founded_since"
                                            sx={{pb: '10px'}}
                                            required
                                            error={!!errors.founded_since}
                                            {...register('founded_since')}
                                            defaultValue={company.founded_since ?? null}
                                        /> */}
                    <StyleTextField
                      id="standard-adornment-company-founded-since"
                      size="large"
                      type="number"
                      name="founded_since"
                      label="Founded Since"
                      sx={{ pb: "10px" }}
                      required
                      {...register("founded_since")}
                      error={!!errors.founded_since}
                      defaultValue={company.founded_since ?? null}
                    />
                    <FormHelperText error={!!errors.founded_since}>
                      {errors.founded_since?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
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

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
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
                        {...params}
                        fullWidth
                        label="Region"
                        variant="outlined"
                        required
                        error={!!errors.region_id}
                        helperText={errors.region_id?.message}
                      />
                    )}
                    name="region_id"
                    {...register("region_id")}
                    onChange={(event, value) => handleRegionChange(value)}
                  />
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <Autocomplete
                    fullWidth
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
                        {...params}
                        fullWidth
                        label="Township"
                        variant="outlined"
                        error={!!errors.township_id}
                        helperText={errors.township_id?.message}
                        required
                      />
                    )}
                    name="township_id"
                    {...register("township_id")}
                    onChange={(event, value) => setSelectedTownship(value)}
                  />
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <StyleTextField
                    id="street"
                    label="Street"
                    multiline
                    fullWidth
                    maxRows={4}
                    minRows={1}
                    variant="outlined"
                    name="street"
                    error={!!errors.street}
                    helperText={errors.street?.message}
                    {...register("street")}
                    defaultValue={company?.street}
                  />
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
                  <StyleTextField
                    id="about-us"
                    label="About Our Company"
                    multiline
                    fullWidth
                    maxRows={10}
                    minRows={1}
                    variant="outlined"
                    name="about_us"
                    error={!!errors.about_us}
                    helperText={
                      errors.about_us?.message ?? "10000 Character limit"
                    }
                    {...register("about_us")}
                    defaultValue={company?.about_us}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  {isSubmitting ? (
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      color="primary"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{
                        fontSize: "16px",
                        fontWeight: "400",
                        borderRadius: "10px",
                        py: 1,
                        px: 5,
                      }}
                      size="small"
                    >
                      Create Account
                    </LoadingButton>
                  ) : (
                    <Button
                      align="center"
                      sx={{
                        background:
                          "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "400",
                        borderRadius: "10px",
                        py: 1,
                        px: 5,
                      }}
                      size="small"
                      type="submit"
                    >
                      Save
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyInfoForm;

const StyleTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E8E8E8 !important',
    },
    '&:hover fieldset': {
      border: '2px solid #E8E8E8',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#195DCC !important',
    },
  }, '.MuiFormLabel-asterisk': {
    color: '#B71C1C'
  }
}))