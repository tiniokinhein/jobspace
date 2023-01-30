import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import JobCategoryDataService from "../../../services/job.category.service";
import JobRoleService from "../../../services/job.role.service";
import CurrencyDataService from "../../../services/currencies.service";
import SaveIcon from "@mui/icons-material/Save";
import { seekerExperienceActions } from "../../../store";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import IndustryDataService from "../../../services/industry.service";
import PositionDataService from "../../../services/position.service.slice";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setProgress } from "../../../store/slices/progress";
import { helper } from "../../../helpers";
import NoticePeriodDataService from "../../../services/notice.period.service";

const ExperienceForm = ({ isSingleCreate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPresent, setIsPresent] = useState(false);
  const [jobRoles, setJobRoles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputFields, setInputFields] = useState([
    {
      company_name: "",
      start_date: null,
      end_date: null,
      is_present: 0,
      job_title: "",
      job_category_id: "",
      job_role_id: "",
      currency_id: "",
      notice_period_id: "",
      salary: "",
      hide_salary: "",
      description: "",
      reference: "",
      industry_id: "",
      position_id: "",
    },
  ]);

  const [isShowRemove, setIsShowRemove] = useState(false);
  const [oldInputFields, setOldInputFields] = useState([
    {
      category: "",
      job_role: "",
      currency: "",
      start_date: null,
      end_date: null,
      position: "",
      industry: "",
      notice_period: "",
    },
  ]);

  const [errors, setErrors] = useState([]);
  const [noticePeriods, setNoticePeriods] = useState([]);

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

  const onSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const isNew = isSingleCreate ? 0 : 1;

    dispatch(
      seekerExperienceActions.create({
        experiences: inputFields,
        is_new: isNew,
      })
    ).then(res => {
      setIsSubmitting(false);

      if (res.error) {
        try {
          if (helper.isJson(res.error.message)) {
            const errBag = JSON.parse(res.error.message);
            let bag = [];

            Object.keys(errBag).map((key) => {
              let message;

              if (errBag[key]) {
                if (Array.isArray(errBag[key])) {
                  message = errBag[key].join(" ");
                } else {
                  message = errBag.err;
                }
              }
              return (bag[key] = message);
            });

            return setErrors(bag);
          }
        } catch (e) {
          //
        }
      } else {
        setErrors([]);

        navigate(`/seekers/experiences`);

        dispatch(seekerExperienceActions.get());
      }
    });
  };

  const handleJobCategoryChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["job_category"] = value;
    data[index]["job_category_id"] = value.uuid;
    oldData[index]["job_role"] = null;

    setInputFields(data);
    setJobRoles([]);
    setOldInputFields(oldData);

    retrieveJobRole(value.uuid);
  };

  const handleJobRoleChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["job_role"] = value;
    data[index]["job_role_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  const handleIndustryChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["industry"] = value;
    data[index]["industry_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  const handlePositionChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["position"] = value;
    data[index]["position_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  const handleCurrencyChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["currency"] = value;
    data[index]["currency_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  const handleNoticePeriod = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["notice_period"] = value;
    data[index]["notice_period_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  const removeFields = () => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    data.pop();
    oldData.pop();

    setInputFields(data);
    setOldInputFields(oldData);

    if (data.length === 1) {
      setIsShowRemove(false);
    }
  };

  const handleRadioChange = (event, index) => {
    let data = [...inputFields];

    data[index][event.target.name] = event.target.checked ? 1 : 0;

    setInputFields(data);

    setIsPresent(event.target.checked);
  };

  const handleInputChange = (event, index, name = null) => {
    let data = [...inputFields];

    if (!name) {
      name = event.target.name;
    }

    data[index][name] = event.target.value;

    setInputFields(data);
  };

  const handleDateChange = (index, name, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index][name] = value;
    data[index][name] = format(value);

    setInputFields(data);
    setOldInputFields(oldData);
  };

  function format(inputDate) {
    let month, year;

    let date = new Date(inputDate);
    month = date.getMonth() + 1;
    year = date.getFullYear();

    month = month.toString().padStart(2, "0");

    return `${month}-${year}`;
  }

  return (
    <Box component="form" autoComplete="off" onSubmit={onSubmit}>
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
        sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
        spacing={3}
      >
        {inputFields.map((input, index) => {
          return (
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="start"
              alignItems="center"
              spacing={3}
              key={index}
            >
              {isSingleCreate ? (
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" fontWeight={400} color="primary">
                    Add Previous Employment
                  </Typography>
                </Grid>
              ) : (
                (index === 0 || index === 1) && (
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" fontWeight={400} color="primary">
                      {index === 0
                        ? "Add Current Employment"
                        : "Add Previous Employment"}
                    </Typography>
                  </Grid>
                )
              )}

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Job Title"
                  variant="outlined"
                  name="job_title"
                  required
                  InputLabelProps={{ required: true }}
                  onChange={(event) => {
                    handleInputChange(event, index);
                  }}
                  error={!!errors[`experiences.${index}.job_title`]}
                  helperText={
                    errors[`experiences.${index}.job_title`]
                      ? errors[`experiences.${index}.job_title`]
                      : null
                  }
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Company"
                  variant="outlined"
                  name="company_name"
                  required
                  InputLabelProps={{ required: true }}
                  onChange={(event) => {
                    handleInputChange(event, index);
                  }}
                  error={!!errors[`experiences.${index}.company_name`]}
                  helperText={
                    errors[`experiences.${index}.company_name`]
                      ? errors[`experiences.${index}.company_name`]
                      : null
                  }
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
                  <Grid item xs={index === 0 && !isSingleCreate ? 8 : 12}>
                    <DatePicker
                      views={["year", "month"]}
                      maxDate={oldInputFields[index]["end_date"] ?? new Date()}
                      value={oldInputFields[index]["start_date"] || null}
                      name="start_date"
                      defaultValue={null}
                      onChange={(newValue) => {
                        handleDateChange(index, "start_date", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
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
                          error={!!errors[`experiences.${index}.start_date`]}
                          helperText={
                            errors[`experiences.${index}.start_date`]
                              ? errors[`experiences.${index}.start_date`]
                              : null
                          }
                        />
                      )}
                    />
                  </Grid>

                  {index === 0 && !isSingleCreate && (
                    <Grid
                      item
                      xs={4}
                      sx={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                        display: "flex",
                        height: "100%",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="is_present"
                            checked={
                              input["is_present"]
                                ? input["is_present"]
                                : isPresent
                            }
                            onChange={(event) => {
                              handleRadioChange(event, index);
                            }}
                          />
                        }
                        label="Present"
                        sx={{ marginRight: 0 }}
                      />
                      {errors[`experiences.${index}.is_present`] && (
                        <FormHelperText error={true}>
                          {errors[`experiences.${index}.is_present`]}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}

                  <Grid item xs={index === 0 && !isSingleCreate ? 8 : 12}>
                    <DatePicker
                      views={["year", "month"]}
                      minDate={
                        oldInputFields[index]["start_date"] ?? new Date()
                      }
                      maxDate={new Date()}
                      value={oldInputFields[index]["end_date"] || null}
                      name="end_date"
                      onChange={(newValue) => {
                        handleDateChange(index, "end_date", newValue);
                      }}
                      disabled={isPresent}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="End Date"
                          fullWidth
                          readOnly={true}
                          required={!isPresent}
                          inputProps={{
                            ...params.inputProps,
                            placeholder: "Month Year",
                          }}
                          error={!!errors[`experiences.${index}.end_date`]}
                          helperText={
                            errors[`experiences.${index}.end_date`]
                              ? errors[`experiences.${index}.end_date`]
                              : null
                          }
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
                  value={
                    oldInputFields[index]["job_category"]
                      ? oldInputFields[index]["job_category"]
                      : null
                  }
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Job Category"
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      error={!!errors[`experiences.${index}.job_category_id`]}
                      helperText={
                        errors[`experiences.${index}.job_category_id`]
                          ? errors[`experiences.${index}.job_category_id`]
                          : null
                      }
                    />
                  )}
                  name="job_category_id"
                  onChange={(event, value) =>
                    handleJobCategoryChange(index, value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="job-role-box"
                  options={jobRoles}
                  value={
                    oldInputFields[index]["job_role"]
                      ? oldInputFields[index]["job_role"]
                      : null
                  }
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Job Role"
                      variant="outlined"
                      error={!!errors[`experiences.${index}.job_role_id`]}
                      helperText={
                        errors[`experiences.${index}.job_role_id`]
                          ? errors[`experiences.${index}.job_role_id`]
                          : null
                      }
                    />
                  )}
                  name="job_role_id"
                  onChange={(event, value) => handleJobRoleChange(index, value)}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="job-level-box"
                  options={positions}
                  value={
                    oldInputFields[index]["position"]
                      ? oldInputFields[index]["position"]
                      : null
                  }
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Job Level"
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      error={!!errors[`experiences.${index}.position_id`]}
                      helperText={
                        errors[`experiences.${index}.position_id`]
                          ? errors[`experiences.${index}.position_id`]
                          : null
                      }
                    />
                  )}
                  name="position_id"
                  onChange={(event, value) =>
                    handlePositionChange(index, value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="industry-box"
                  options={industries}
                  value={
                    oldInputFields[index]["industry"]
                      ? oldInputFields[index]["industry"]
                      : null
                  }
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Industry"
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      error={!!errors[`experiences.${index}.industry_id`]}
                      helperText={
                        errors[`experiences.${index}.industry_id`]
                          ? errors[`experiences.${index}.industry_id`]
                          : null
                      }
                    />
                  )}
                  name="industry_id"
                  onChange={(event, value) =>
                    handleIndustryChange(index, value)
                  }
                />
              </Grid>

              <Grid container item xs={12} md={8} spacing={0.2}>
                <Grid item xs={12}>
                  <Typography variant="body2" component="span">
                    {index === 0 && !isSingleCreate
                      ? "Current Salary"
                      : "Salary"}
                  </Typography>
                </Grid>

                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      fullWidth
                      disableClearable
                      id="currency-box"
                      options={currencies}
                      value={
                        oldInputFields[index]["currency"]
                          ? oldInputFields[index]["currency"]
                          : null
                      }
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.uuid === value.uuid
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Currency"
                          variant="outlined"
                          error={!!errors[`experiences.${index}.currency_id`]}
                          helperText={
                            errors[`experiences.${index}.currency_id`]
                              ? errors[`experiences.${index}.currency_id`]
                              : null
                          }
                        />
                      )}
                      name="currency_id"
                      onChange={(event, value) =>
                        handleCurrencyChange(index, value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <TextField
                      type="number"
                      fullWidth
                      label="Salary"
                      variant="outlined"
                      name="salary"
                      onChange={(event) => {
                        handleInputChange(event, index);
                      }}
                      error={!!errors[`experiences.${index}.salary`]}
                      helperText={
                        errors[`experiences.${index}.salary`]
                          ? errors[`experiences.${index}.salary`]
                          : null
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="hide_salary"
                        checked={
                          input["hide_salary"] ? input["hide_salary"] : false
                        }
                        onChange={(event) => {
                          handleRadioChange(event, index);
                        }}
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
                  {errors[`experiences.${index}.hide_salary`] && (
                    <FormHelperText error={true}>
                      {errors[`experiences.${index}.hide_salary`]}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>

              {index === 0 && !isSingleCreate && (
                <Grid item xs={12} md={8}>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    id="notice-period"
                    options={noticePeriods}
                    value={
                      oldInputFields[index]["notice_period_id"]
                        ? oldInputFields[index]["notice_period_id"]
                        : null
                    }
                    getOptionLabel={(option) =>
                      option.title ? option.title : ""
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.uuid === value.uuid
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Notice Period"
                        variant="outlined"
                        error={
                          !!errors[`experiences.${index}.notice_period_id`]
                        }
                        helperText={
                          errors[`experiences.${index}.notice_period_id`]
                            ? errors[`experiences.${index}.notice_period_id`]
                            : null
                        }
                      />
                    )}
                    name="notice_period_id"
                    onChange={(event, value) =>
                      handleNoticePeriod(index, value)
                    }
                  />
                </Grid>
              )}

              <Grid item xs={12} md={8}>
                <TextField
                  id="description"
                  label="Job Description"
                  multiline
                  minRows={3}
                  maxRows={10}
                  variant="outlined"
                  fullWidth
                  name="description"
                  onChange={(event) => {
                    handleInputChange(event, index);
                  }}
                  error={!!errors[`experiences.${index}.description`]}
                  helperText={
                    errors[`experiences.${index}.description`]
                      ? errors[`experiences.${index}.description`]
                      : "5000 Character limit"
                  }
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  id="reference"
                  label="Reference"
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  name="reference"
                  onChange={(event) => {
                    handleInputChange(event, index);
                  }}
                  error={!!errors[`experiences.${index}.reference`]}
                  helperText={
                    errors[`experiences.${index}.reference`]
                      ? errors[`experiences.${index}.reference`]
                      : "1000 Character limit"
                  }
                />
              </Grid>
            </Grid>
          );
        })}

        <Grid
          item
          xs={12}
          md={8}
          justifyItems="center"
          justifyContent="space-between"
          display="flex"
        >
          {isShowRemove && (
            <Button
              value="text"
              startIcon={<DeleteIcon />}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
              }}
              onClick={removeFields}
              color="warning"
            >
              Remove Previous Employment
            </Button>
          )}
        </Grid>

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

          {isSingleCreate ? (
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
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExperienceForm;
