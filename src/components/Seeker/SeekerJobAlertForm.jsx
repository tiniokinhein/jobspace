import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { jobAlertActions } from "../../store";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import RegionDataService from "../../services/regions.service";
import TownshipDataService from "../../services/townships.service";
import ExperienceLengthDataService from "../../services/experience.length.service";
import { setProgress } from "../../store/slices/progress";
import { helper } from "../../helpers";

const SeekerJobAlertForm = () => {
  const dispatch = useDispatch();
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertType, setAlertType] = useState(1);
  const [townships, setTownships] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedTownship, setSelectedTownship] = useState([]);
  const [alertSubscription, setAlertSubscription] = useState(1);
  const [selectedExp, setSelectedExp] = useState([]);
  const { job_alert: jobAlert } = useSelector((state) => state.job_alert);

  const validationSchema = Yup.object().shape({
    keywords: Yup.string().required().max(100),
    job_alert_name: Yup.string().required(),
    email: Yup.string().email().nullable(true),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = (data) => {
    let payload = data;

    if (selectedExp) {
      payload["experience_length_id"] = selectedExp.uuid ?? null;
    }

    if (selectedRegion) {
      payload["region_id"] = selectedRegion.uuid ?? null;
    }

    if (selectedTownship) {
      payload["township_id"] = selectedTownship.uuid ?? null;
    }

    if (Object.keys(jobAlert).length > 0) {
      return dispatch(
        jobAlertActions.update({ data: payload, uuid: jobAlert.uuid })
      ).then((res) => {
        if (res.error) handleError(res);
      });
    } else {
      return dispatch(jobAlertActions.create(payload)).then((res) => {
        if (res.error) handleError(res);
      });
    }
  };

  const handleError = (res) => {
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
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);

    setSelectedTownship(null);

    retrieveTownships(value.uuid);
  };

  const retrieveTownships = async (uuid) => {
    if (uuid) {
      await TownshipDataService.getTownshipByRegionUuid(uuid).then((r) =>
        setTownships(r.data)
      );
    }
  };

  const initFetch = useCallback(() => {
    dispatch(jobAlertActions.get()).then((r) => {
      if (r.payload?.region) {
        setSelectedRegion(r.payload?.region);
        retrieveTownships(r.payload.region?.uuid);
      }

      if (r.payload?.township) {
        setSelectedTownship(r.payload?.township);
      }

      if (r.payload?.experience_length) {
        setSelectedExp(r.payload?.experience_length);
      }

      setAlertType(r.payload.alert_type);
      setAlertSubscription(r.payload.alert_subscription);

      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    (async () => {
      dispatch(setProgress(50));
      await RegionDataService.all().then((r) => setRegions(r.data));
      await ExperienceLengthDataService.get().then((r) =>
        setExperiences(r.data)
      );
      dispatch(setProgress(100));
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {!loading && (
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <Typography>
              Here is your job alert. We will send you emails if there are
              relevant job matches.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <StyledTextField
              fullWidth
              label="Keywords"
              variant="outlined"
              name="keywords"
              required
              InputLabelProps={{ required: true }}
              defaultValue={jobAlert?.keywords}
              error={!!errors.keywords}
              {...register("keywords")}
              helperText={errors.keywords?.message ?? "100 Character limit"}
              placeholder="Job Title or Company Name"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Autocomplete
              fullWidth
              disablePortal
              disableClearable
              id="experience"
              options={experiences}
              value={selectedExp || null}
              getOptionLabel={(option) => (option.title ? option.title : "")}
              isOptionEqualToValue={(option, value) =>
                option.uuid === value.uuid
              }
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  fullWidth
                  label="Total Experience"
                  variant="outlined"
                  name="experience_id"
                  {...register("experience_id")}
                  helperText={errors.experience_id?.message}
                  error={!!errors.experience_id}
                />
              )}
              onChange={(event, value) => setSelectedExp(value)}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography color="#525252" fontSize="14px" fontWeight={400} mb={3}>
              Current Location
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  disableClearable
                  id="region"
                  options={regions}
                  value={selectedRegion || null}
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      fullWidth
                      label="Region"
                      variant="outlined"
                      name="region_id"
                      {...register("region_id")}
                      helperText={errors.region_id?.message}
                      error={!!errors.region_id}
                    />
                  )}
                  onChange={(event, value) => handleRegionChange(value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  disableClearable
                  id="township"
                  options={townships}
                  value={selectedTownship || null}
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      fullWidth
                      label="Township"
                      variant="outlined"
                      name="township_id"
                      {...register("township_id")}
                      helperText={errors.township_id?.message}
                      error={!!errors.township_id}
                    />
                  )}
                  onChange={(event, value) => setSelectedTownship(value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8}>
            <StyledTextField
              fullWidth
              label="Job Alert Name"
              variant="outlined"
              name="job_alert_name"
              required
              InputLabelProps={{ required: true }}
              defaultValue={jobAlert?.job_alert_name}
              error={!!errors.job_alert_name}
              {...register("job_alert_name")}
              helperText={errors.job_alert_name?.message}
              placeholder="Enter a name of this job alert"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <StyledTextField
              fullWidth
              label="Email Id"
              variant="outlined"
              name="email"
              defaultValue={jobAlert?.email}
              error={!!errors.email}
              {...register("email")}
              helperText={errors.email?.message}
              type="email"
              placeholder="type email"
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <FormControl>
              <FormLabel
                id="alert-type"
                sx={{ fontWeight: 400, fontSize: "14px" }}
              >
                Frequency of Alerts
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="alert-type"
                defaultValue={alertType}
              >
                <StyledFormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Weekly"
                  {...register("alert_type")}
                />
                <StyledFormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Monthly"
                  {...register("alert_type")}
                />
              </RadioGroup>
              {!!errors.alert_type && (
                <FormHelperText error={!!errors.alert_type}>
                  {errors.alert_type?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={8}>
            <FormControl>
              <FormLabel
                id="alert-type"
                sx={{ fontWeight: 400, fontSize: "14px" }}
              >
                Alerts Subscription
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="alert-type"
                defaultValue={alertSubscription}
              >
                <StyledFormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Yes"
                  {...register("alert_subscription")}
                />
                <StyledFormControlLabel
                  value="2"
                  control={<Radio />}
                  label="No"
                  {...register("alert_subscription")}
                />
              </RadioGroup>
              {!!errors.alert_subscription && (
                <FormHelperText error={!!errors.alert_subscription}>
                  {errors.alert_subscription?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={8} justifyContent="flex-end" display="flex">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{
                borderRadius: "10px",
                background: "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
              }}
            >
              {Object.keys(jobAlert).length > 0
                ? "Update Free Job Alert"
                : "Create Free Job Alert"}
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SeekerJobAlertForm;

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

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  ".MuiFormControlLabel-label": {
    fontSize: "14px",
  },
}));
