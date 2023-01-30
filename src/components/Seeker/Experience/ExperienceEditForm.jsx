import React, {useCallback, useEffect, useState} from "react";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    Skeleton,
    Stack,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {Link as RouterLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {seekerExperienceActions} from "../../../store";
import JobCategoryDataService from "../../../services/job.category.service";
import JobRoleService from "../../../services/job.role.service";
import CurrencyDataService from "../../../services/currencies.service";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import PositionDataService from "../../../services/position.service.slice";
import IndustryDataService from "../../../services/industry.service";
import {setProgress} from "../../../store/slices/progress";
import {helper, history} from "../../../helpers";
import NoticePeriodDataService from "../../../services/notice.period.service";

const ExperienceEditForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const expUuid = params.expId ?? null;
  const [loading, setLoading] = useState(true);
  const [isHide, setIsHide] = useState(false);
  const [jobRoles, setJobRoles] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [positions, setPositions] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [isPresent, setIsPresent] = useState(false);
  const [noticePeriods, setNoticePeriods] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [selectedJobRole, setSelectedJobRole] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState([]);
  const [selectedNoticePeriod, setSelectedNoticePeriod] = useState([]);
  const { seeker_experience: SeekerExp } = useSelector((x) => x.seeker_experiences);

  const iniFetch = useCallback(() => {
    dispatch(seekerExperienceActions.show(expUuid)).then(r => {
      if (r.payload?.job_category) {
        setSelectedJobCategory(r.payload.job_category);
        retrieveJobRole(r.payload.job_category?.uuid);
      }

      if (r.payload?.job_role) {
        setSelectedJobRole(r.payload.job_role);
      }

      if (r.payload?.currency) {
        setSelectedCurrency(r.payload.currency);
      }

      if (r.payload?.notice_period) {
        setSelectedNoticePeriod(r.payload.notice_period);
      }

      if (r.payload?.start_date) {
        const parts = r.payload.start_date.split("-");
        setStartDate(new Date(parts[1], parts[0] - 1, "01"));
      }

      if (r.payload?.end_date) {
        const parts = r.payload.end_date.split("-");
        setEndDate(new Date(parts[1], parts[0] - 1, "01"));
      }

      if (r.payload?.industry) {
        setSelectedIndustry(r.payload.industry);
      }

      if (r.payload?.position) {
        setSelectedPosition(r.payload.position);
      }

      setIsHide(r.payload?.hide_salary === 1);
      setIsPresent(r.payload?.is_present === 1);
      setLoading(false);
    });

    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    iniFetch();
  }, [iniFetch]);

  const retrieveJobRole = async (categoryUuid) => {
    await JobRoleService.get(categoryUuid).then((r) => setJobRoles(r.data));
  };

  useEffect(() => {
    (async () => {
      dispatch(setProgress(50));
      await JobCategoryDataService.get().then((r) => setJobCategories(r.data));
      await CurrencyDataService.get().then((r) => setCurrencies(r.data));
      await PositionDataService.all().then((r) => setPositions(r.data));
      await IndustryDataService.all().then((r) => setIndustries(r.data));
      await NoticePeriodDataService.all().then((r) => setNoticePeriods(r.data));
      dispatch(setProgress(100));
    })();

    // eslint-disable-next-line
  }, []);

  const handleJobCategoryChange = (value) => {
    setJobRoles([]);
    setSelectedJobRole([]);
    setSelectedJobCategory(value);
    retrieveJobRole(value.uuid);
  };

  const handleJobRoleChange = (value) => {
    setSelectedJobRole(value);
  };

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
  };

  const handlePositionChange = (value) => {
    setSelectedPosition(value);
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required().min(2).max(100),
    start_date: Yup.string().required(),
    end_date: Yup.string().nullable(true),
    job_title: Yup.string().max(100).min(3).required(),
    salary: Yup.string().nullable(true),
    description: Yup.string().nullable(true).max(5000),
    reference: Yup.string().nullable(true).max(1000),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    let payload = data;

    if (selectedJobCategory) {
      payload.job_category_id = selectedJobCategory.uuid ?? null;
    }

    if (selectedJobRole) {
      payload.job_role_id = selectedJobRole.uuid ?? null;
    }

    if (selectedCurrency) {
      payload.currency_id = selectedCurrency.uuid ?? null;
    }

    if (selectedNoticePeriod) {
      payload.notice_period_id = selectedNoticePeriod.uuid ?? null;
    }

    if (startDate) {
      payload.start_date = format(startDate);
    }

    if (endDate) {
      payload.end_date = format(endDate);
    }

    if (selectedIndustry) {
      payload.industry_id = selectedIndustry.uuid ?? null;
    }

    if (selectedPosition) {
      payload.position_id = selectedPosition.uuid ?? null;
    }

    return dispatch(
      seekerExperienceActions.update({ data: payload, uuid: expUuid })
    ).then((res) => {
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
        history.navigate("/seekers/experiences");
      }
    });
  }

  function format(inputDate) {
    let month, year;

    let date = new Date(inputDate);
    month = date.getMonth() + 1;
    year = date.getFullYear();

    month = month.toString().padStart(2, "0");

    return `${month}-${year}`;
  }

  const handleIsPresent = (e) => {
    setIsPresent(e.target.checked);

    if (e.target.checked) {
      setEndDate(null);
    }
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
        sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
        spacing={3}
      >
        {loading && (
          <Grid
            container
            direction="row"
            justifyContent="start"
            alignItems="center"
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
                pb: "10px",
              }}
            >
              <Stack spacing={1} width="100%">
                <Skeleton width="90%" />
                <Skeleton width="90%" />
                <Skeleton width="80%" />
              </Stack>
            </Grid>
          </Grid>
        )}

        {!loading && (
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
              <StyledTextField
                fullWidth
                label="Job Title"
                variant="outlined"
                name="job_title"
                required
                InputLabelProps={{ required: true }}
                defaultValue={SeekerExp?.job_title}
                error={!!errors.job_title}
                {...register("job_title")}
                helperText={errors.job_title?.message}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledTextField
                fullWidth
                label="Company"
                variant="outlined"
                name="company_name"
                required
                InputLabelProps={{ required: true }}
                defaultValue={SeekerExp?.company_name}
                error={!!errors.company_name}
                {...register("company_name")}
                helperText={errors.company_name?.message}
              />
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid
                item
                xs={12}
                md={8}
                container
                spacing={3}
                alignItems="flex-end"
                display="flex"
                justifyContent="space-between"
              >
                <Grid item xs={SeekerExp.is_present === 1 ? 9 : 12}>
                  <DatePicker
                    views={["year", "month"]}
                    maxDate={endDate ?? new Date()}
                    value={startDate || null}
                    name="start_date"
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        variant="outlined"
                        label="Start Date"
                        required
                        fullWidth
                        InputLabelProps={{ required: true }}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "Month Year",
                        }}
                        error={!!errors.start_date}
                        {...register("start_date")}
                        helperText={errors.start_date?.message}
                      />
                    )}
                  />
                </Grid>

                {SeekerExp.is_present === 1 && (
                  <Grid item xs={2} justifyContent="flex-end" display="flex">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="is_present"
                          checked={isPresent}
                          {...register("is_present")}
                          onChange={handleIsPresent}
                        />
                      }
                      label="Present"
                      sx={{ marginRight: 0 }}
                    />
                    <FormHelperText error={!!errors.is_present}>
                      {errors.is_present?.message}
                    </FormHelperText>
                  </Grid>
                )}

                <Grid item xs={SeekerExp.is_present === 1 ? 9 : 12}>
                  <DatePicker
                    views={["year", "month"]}
                    minDate={startDate ?? new Date()}
                    maxDate={new Date()}
                    name="end_date"
                    value={endDate || null}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    disabled={isPresent}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        variant="outlined"
                        label="End Date"
                        fullWidth
                        readOnly={true}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "Month Year",
                        }}
                        required={!isPresent}
                        error={!!errors.end_date}
                        {...register("end_date")}
                        helperText={errors.end_date?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12} md={8}>
              <Autocomplete
                fullWidth
                disableClearable
                id="job-category-box"
                options={jobCategories}
                value={selectedJobCategory || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    label="Job Category"
                    variant="outlined"
                    name="job_category_id"
                    InputLabelProps={{ required: true }}
                    error={!!errors.job_category_id}
                    helperText={errors.job_category_id?.message}
                  />
                )}
                name="job_category_id"
                {...register("job_category_id")}
                onChange={(event, value) => handleJobCategoryChange(value)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Autocomplete
                fullWidth
                id="job-role-box"
                options={jobRoles}
                value={selectedJobRole || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    label="Job Role"
                    variant="outlined"
                    error={!!errors.job_role_id}
                    helperText={errors.job_role_id?.message}
                  />
                )}
                name="job_role_id"
                {...register("job_role_id")}
                onChange={(event, value) => handleJobRoleChange(value)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Autocomplete
                fullWidth
                disableClearable
                id="job-level-box"
                options={positions}
                value={selectedPosition || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    label="Job Level"
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    error={!!errors.position_id}
                    helperText={errors.position_id?.message}
                  />
                )}
                name="position_id"
                {...register("position_id")}
                onChange={(event, value) => handlePositionChange(value)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Autocomplete
                fullWidth
                disableClearable
                id="industry-box"
                options={industries}
                value={selectedIndustry || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    label="Industry"
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    error={!!errors.position_id}
                    helperText={errors.position_id?.message}
                  />
                )}
                name="industry_id"
                {...register("industry_id")}
                onChange={(event, value) => handleIndustryChange(value)}
              />
            </Grid>

            <Grid container item xs={12} md={8} spacing={0.2}>
              <Grid item xs={12} mb={3}>
                <Typography variant="body2" component="span">
                  {SeekerExp.is_present === 1 ? "Current Salary" : "Salary"}
                </Typography>
              </Grid>

              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    id="currency-box"
                    options={currencies}
                    value={selectedCurrency}
                    getOptionLabel={(option) =>
                      option.name ? option.name : ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.uuid === value.uuid
                    }
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        fullWidth
                        label="Currency"
                        variant="outlined"
                        error={!!errors.currency_id}
                        helperText={errors.currency_id?.message}
                      />
                    )}
                    name="currency_id"
                    {...register("currency_id")}
                    onChange={(event, value) => setSelectedCurrency(value)}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <StyledTextField
                    type="number"
                    fullWidth
                    label="Salary"
                    variant="outlined"
                    name="salary"
                    defaultValue={SeekerExp?.salary}
                    error={!!errors.salary}
                    {...register("salary")}
                    helperText={errors.salary?.message}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="hide_salary"
                      checked={isHide}
                      {...register("hide_salary")}
                      onChange={(event, checked) => setIsHide(checked)}
                    />
                  }
                  label="Hide my salary from potential employers:"
                  labelPlacement="start"
                  sx={{
                    marginLeft: 0,
                    ".MuiFormControlLabel-label": {
                      fontSize: "12px",
                      color: "#A1A1A1",
                    },
                  }}
                />
                <FormHelperText error={!!errors.hide_salary}>
                  {errors.hide_salary?.message}
                </FormHelperText>
              </Grid>
            </Grid>

            {SeekerExp?.is_present === 1 && (
              <Grid item xs={12} md={8}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="notice-period"
                  options={noticePeriods}
                  value={selectedNoticePeriod}
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
                      label="Notice Period"
                      variant="outlined"
                      error={!!errors.notice_period_id}
                      helperText={errors.notice_period_id?.message}
                    />
                  )}
                  name="notice_period_id"
                  {...register("notice_period_id")}
                  onChange={(event, value) => setSelectedNoticePeriod(value)}
                />
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <StyledTextField
                id="description"
                label="Job Description"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                name="description"
                defaultValue={SeekerExp?.description}
                error={!!errors.description}
                {...register("description")}
                helperText={
                  errors.description?.message ?? "5000 Character limit"
                }
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <StyledTextField
                id="reference"
                label="Reference"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                name="reference"
                defaultValue={SeekerExp?.reference}
                error={!!errors.reference}
                {...register("reference")}
                helperText={errors.reference?.message ?? "1000 Character limit"}
              />
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} md={8} justifyContent="flex-end" display="flex">
          <LoadingButton
            type="submit"
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
          <Button
            variant="contained"
            color="error"
            sx={{
              width: "110px",
              borderRadius: "10px",
              ml: "15px",
            }}
            component={RouterLink}
            to="/seekers/experiences"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExperienceEditForm;

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