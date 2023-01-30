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
} from "@mui/material";
import IndustryDataService from "../../../services/industry.service";
import JobCategoryDataService from "../../../services/job.category.service";
import JobTypeDataService from "../../../services/job.type.service";
import CurrencyDataService from "../../../services/currencies.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { jobPreferenceActions } from "../../../store";
import { helper } from "../../../helpers";
import JPLoader from "./JPLoader";
import { useNavigate } from "react-router-dom";

const JobPreferenceForm = () => {
  const navigate = useNavigate();
  const [industries, setIndustries] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [firstEmpType, setFirstEmpType] = useState(1);
  const [preference, setPreference] = useState(1);

  const [loading, setLoading] = useState(true);
  const { job_preference: jobPreference } = useSelector(
    (x) => x.job_preference
  );

  const dispatch = useDispatch();

  const jobPreFetch = useCallback(() => {
    dispatch(jobPreferenceActions.get()).then((r) => {
      if (r.payload) {
        setPreference(r.payload?.is_preferences ?? 1);
        setFirstEmpType(r.payload?.job_type?.uuid ?? null);
        setSelectedIndustries(r.payload?.preferred_industries ?? []);
        setSelectedCategories(r.payload?.preferred_job_categories ?? []);

        if (r.payload.currency) {
          setSelectedCurrency(r.payload.currency);
        }
      }
    });
  }, [dispatch]);

  useEffect(() => {
    jobPreFetch();
  }, [jobPreFetch]);

  useEffect(() => {
    (async () => {
      await IndustryDataService.all().then((r) => setIndustries(r.data));

      await JobCategoryDataService.get().then((r) => setJobCategories(r.data));

      await JobTypeDataService.get().then((r) => setEmploymentTypes(r.data));

      await CurrencyDataService.get().then((r) => setCurrencies(r.data));
    })().then(() => setLoading(false));
  }, []);

  const handleIndustryChange = (item) => {
    setSelectedIndustries(item);
  };

  const handleJobCategoryChange = (item) => {
    setSelectedCategories(item);
  };

  const handleCurrencyChange = (item) => {
    setSelectedCurrency(item);
  };

  const validationSchema = Yup.object().shape();
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    let payload = data;

    if (selectedIndustries.length > 0) {
      payload["industry_ids"] = selectedIndustries.map(
        (item) => item.uuid ?? null
      );
    }

    if (selectedCategories.length > 0) {
      payload["category_ids"] = selectedCategories.map(
        (item) => item.uuid ?? null
      );
    }

    if (selectedCurrency) {
      payload["currency_id"] = selectedCurrency.uuid ?? null;
    }

    return dispatch(jobPreferenceActions.create(payload)).then((res) => {
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
        navigate("/seekers/job-preferences");
      }
    });
  }

  function handleEmpType(uuid) {
    setFirstEmpType(uuid);
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {!loading ? (
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
          spacing={3}
        >
          <Grid item xs={12} md={8} lg={8} xl={8}>
            <Autocomplete
              multiple
              id="industries"
              options={industries}
              disableClearable
              getOptionLabel={(option) => (option.title ? option.title : "")}
              getOptionDisabled={(options) => selectedIndustries.length > 2}
              isOptionEqualToValue={(option, value) =>
                option.uuid === value.uuid
              }
              value={selectedIndustries || null}
              onChange={(event, value) => {
                handleIndustryChange(value);
              }}
              renderInput={(params) => (
                <StyledTextField
                  size="large"
                  {...params}
                  variant="outlined"
                  label="Preferred Industries"
                  InputLabelProps={{ required: true }}
                  sx={{
                    ".MuiFormLabel-asterisk": {
                      color: "#B71C1C",
                    },
                    ".MuiInputLabel-formControl": {
                      fontSize: "14px",
                    },
                    ".MuiFormHelperText-root": {
                      color: "#C4C4C4",
                    },
                  }}
                  error={!!errors.industry_ids}
                  helperText={
                    !!errors.industry_ids
                      ? errors.industry_ids?.message
                      : "Maximum 3 industries can be selected."
                  }
                  FormHelperTextProps={{
                    fontSize: "12px",
                    fontWeight: 400,
                    error: !!errors.industry_ids,
                  }}
                  {...register("industry_ids")}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={8} xl={8}>
            <Autocomplete
              multiple
              id="job-categories"
              disableClearable
              options={jobCategories}
              getOptionLabel={(option) => (option.title ? option.title : "")}
              getOptionDisabled={(options) => selectedCategories.length > 2}
              isOptionEqualToValue={(option, value) =>
                option.uuid === value.uuid
              }
              value={selectedCategories || null}
              onChange={(event, value) => {
                handleJobCategoryChange(value);
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  variant="outlined"
                  label="Preferred Categories"
                  InputLabelProps={{ required: true }}
                  sx={{
                    ".MuiFormLabel-asterisk": {
                      color: "#B71C1C",
                    },
                    ".MuiInputLabel-formControl": {
                      fontSize: "14px",
                    },
                    ".MuiFormHelperText-root": {
                      color: "#C4C4C4",
                    },
                  }}
                  error={!!errors.category_ids}
                  helperText={
                    !!errors.category_ids
                      ? errors.category_ids?.message
                      : "Maximum 3 Categories can be selected."
                  }
                  FormHelperTextProps={{
                    error: !!errors.category_ids,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={8} xl={8}>
            <FormControl
              fullWidth
              variant="standard"
              size="large"
              color="secondary"
            >
              <StyledTextField
                id="job_title"
                type="text"
                name="job_title"
                required
                label="Preferred Job Title"
                defaultValue={jobPreference?.job_title}
                error={!!errors.job_title}
                {...register("job_title")}
              />
              <FormHelperText error={!!errors.job_title}>
                {errors.job_title?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid container item xs={12} md={8} lg={8} xl={8} spacing={2}>
            <Grid item xs={6} md={4}>
              <Autocomplete
                fullWidth
                disablePortal
                disableClearable
                id="currency"
                options={currencies}
                value={selectedCurrency || null}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => {
                  handleCurrencyChange(value);
                }}
                renderInput={(params) => (
                  <StyledTextField
                    size="large"
                    error={!!errors.currency_id}
                    {...params}
                    fullWidth
                    label="Currency"
                    sx={{
                      ".MuiInputLabel-formControl": {
                        fontSize: "14px",
                      },
                    }}
                    variant="outlined"
                    {...register("currency_id")}
                    helperText={errors.currency_id?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={8}>
              <FormControl
                fullWidth
                variant="standard"
                size="large"
                color="secondary"
                sx={{ border: "1px sold white" }}
                error={!!errors.salary}
              >
                <StyledTextField
                  id="salary"
                  type="number"
                  name="salary"
                  label="Expected Salary"
                  defaultValue={jobPreference?.salary ?? null}
                  error={!!errors.salary}
                  {...register("salary")}
                />
                <FormHelperText error={!!errors.salary}>
                  {errors.salary?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8} lg={8} xl={8}>
            <FormControl>
              <FormLabel
                id="employment-type"
                sx={{ fontSize: "14px" }}
                error={!!errors.job_type_id}
              >
                Employment Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="employment-type"
                name="job_type_id"
                value={firstEmpType}
              >
                {employmentTypes.length > 0 &&
                  employmentTypes.map((item) => (
                    <FormControlLabel
                      key={item.uuid}
                      value={item.uuid}
                      control={
                        <Radio onClick={() => handleEmpType(item.uuid)} />
                      }
                      label={item.title}
                      sx={{
                        ".MuiFormControlLabel-label": {
                          fontSize: "13px",
                          color: "rgba(0, 0, 0, 0.6)",
                        },
                      }}
                      {...register("job_type_id")}
                    />
                  ))}
              </RadioGroup>
              {!!errors.job_type_id && (
                <FormHelperText error={!!errors.job_type_id}>
                  {errors.job_type_id?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={8} lg={8} xl={8}>
            <FormControl>
              <FormLabel
                id="preferences"
                sx={{ fontWeight: 400, fontSize: "14px" }}
                error={!!errors.is_preference}
              >
                Preference
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="preferences"
                defaultValue={preference}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Actively Applying"
                  name="is_preference"
                  sx={{
                    ".MuiFormControlLabel-label": {
                      fontSize: "13px",
                      color: "rgba(0, 0, 0, 0.6)",
                    },
                  }}
                  {...register("is_preference")}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Casually Browsing"
                  name="preference"
                  sx={{
                    ".MuiFormControlLabel-label": {
                      fontSize: "13px",
                      color: "rgba(0, 0, 0, 0.6)",
                    },
                  }}
                  {...register("is_preference")}
                />
              </RadioGroup>
              {!!errors.is_preference && (
                <FormHelperText error={!!errors.is_preference}>
                  {errors.is_preference?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

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
                background: "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
              }}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      ) : (
        <JPLoader />
      )}
    </Box>
  );
};

export default JobPreferenceForm;

const StyledTextField = styled(TextField)(() => ({
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