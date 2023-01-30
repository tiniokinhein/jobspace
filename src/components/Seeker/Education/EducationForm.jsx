import React, {useEffect, useState} from "react";
import {Autocomplete, Box, Button, Grid, styled, TextField, Typography,} from "@mui/material";
import {seekerEducationActions} from "../../../store";
import {useDispatch} from "react-redux";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import AcademicFieldDataService from "../../../services/academic.field.service";
import QualificationDataService from "../../../services/qualification.service";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import {setProgress} from "../../../store/slices/progress";
import {helper} from "../../../helpers";
import CountryDataService from "../../../services/country.service";

const fields = {
  region_id: "",
  school_name: "",
  graduation_date: "",
  additional_info: "",
  qualification_id: "",
  academic_field_id: "",
};

const EducationForm = ({ isSingleCreate, first = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  // const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowRemove, setIsShowRemove] = useState(false);
  const [inputFields, setInputFields] = useState([fields]);
  const [qualifications, setQualifications] = useState([]);
  const [academicFields, setAcademicFields] = useState([]);
  const [oldInputFields, setOldInputFields] = useState([
    {
      qualification: "",
      academic_field: "",
      graduation_date: "",
      region: "",
    },
  ]);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const isNew = isSingleCreate ? 0 : 1;

    dispatch(
      seekerEducationActions.create({
        educations: inputFields,
        is_new: isNew,
      })
    ).then((res) => {
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

        if (isSingleCreate) {
          navigate(`/seekers/educations`);
        }
        dispatch(seekerEducationActions.get());
      }
    });
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

  const handleQualificationChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["qualification"] = value;
    data[index]["qualification_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  // const handleRegionChange = (index, value) => {
  //   let data = [...inputFields];
  //   let oldData = [...oldInputFields];
  //
  //   oldData[index]["region"] = value;
  //   data[index]["region_id"] = value.uuid;
  //
  //   setInputFields(data);
  //   setOldInputFields(oldData);
  // };

  const handleCountryChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["country"] = value;
    data[index]["country_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  const handleAcademicFieldChange = (index, value) => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    oldData[index]["academic_field"] = value;
    data[index]["academic_field_id"] = value.uuid;

    setInputFields(data);
    setOldInputFields(oldData);
  };

  useEffect(() => {
    (async () => {
      // await RegionDataService.all().then((r) => setRegions(r.data));
      await CountryDataService.get().then((r) => setCountries(r.data));
      await AcademicFieldDataService.all().then((r) =>
        setAcademicFields(r.data)
      );
      await QualificationDataService.all().then((r) =>
        setQualifications(r.data)
      );
      dispatch(setProgress(100));
    })();
    // eslint-disable-next-line
  }, []);

  // const handleAddMore = () => {
  //   setInputFields([...inputFields, fields]);
  //   setOldInputFields([
  //     ...oldInputFields,
  //     {
  //       qualification: "",
  //       academic_field: "",
  //       graduation_date: "",
  //       region: "",
  //     },
  //   ]);
  //   setIsShowRemove(true);
  // };

  const removeFields = () => {
    let data = [...inputFields];
    let oldData = [...oldInputFields];

    data.pop();
    oldData.pop();

    setInputFields(data);
    setOldInputFields(oldData);

    if (data.length === 1) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setIsShowRemove(false);
    }
  };

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
              {first && (
                <Grid item xs={12} md={8}>
                  <Typography fontWeight={400}>
                    Enter your highest education level first.
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={8}>
                <StyledTextField
                  fullWidth
                  label="School/ Institute/ University"
                  variant="outlined"
                  name="school_name"
                  required
                  InputLabelProps={{ required: true }}
                  onChange={(event) => {
                    handleInputChange(event, index);
                  }}
                  error={!!errors[`educations.${index}.school_name`]}
                  helperText={
                    errors[`educations.${index}.school_name`]
                      ? errors[`experiences.${index}.designation`]
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="qualification-box"
                  options={qualifications}
                  value={
                    oldInputFields[index]["qualification"]
                      ? oldInputFields[index]["qualification"]
                      : null
                  }
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.uuid === value.uuid
                  }
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      required
                      fullWidth
                      label="Qualification Level"
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      error={!!errors[`educations.${index}.qualification_id`]}
                      helperText={
                        errors[`educations.${index}.qualification_id`]
                          ? errors[`educations.${index}.qualification_id`]
                          : null
                      }
                    />
                  )}
                  name="qualification_id"
                  onChange={(event, value) =>
                    handleQualificationChange(index, value)
                  }
                />
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} md={8}>
                  <DatePicker
                    views={["year", "month"]}
                    maxDate={new Date()}
                    name="graduation_date"
                    defaultValue={null}
                    onChange={(newValue) => {
                      handleDateChange(index, "graduation_date", newValue);
                    }}
                    value={oldInputFields[index]["graduation_date"] || null}
                    renderInput={(params) => (
                      <StyledTextField
                        {...params}
                        variant="outlined"
                        label="Completion/ Graduation Date"
                        required
                        fullWidth
                        InputLabelProps={{ required: true }}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "Month Year",
                        }}
                        error={!!errors[`educations.${index}.graduation_date`]}
                        helperText={
                          errors[`educations.${index}.graduation_date`]
                            ? errors[`educations.${index}.graduation_date`]
                            : null
                        }
                      />
                    )}
                  />
                </Grid>
              </LocalizationProvider>

              {/*<Grid item xs={12} md={8}>*/}
              {/*    <Autocomplete*/}
              {/*        fullWidth*/}
              {/*        disableClearable*/}
              {/*        id="region-box"*/}
              {/*        options={regions}*/}
              {/*        value={oldInputFields[index]['region'] ? oldInputFields[index]['region'] : null}*/}
              {/*        getOptionLabel={option => option.title ? option.title : ''}*/}
              {/*        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}*/}
              {/*        renderInput={(params) => <StyledTextField*/}
              {/*            {...params}*/}
              {/*            fullWidth*/}
              {/*            required*/}
              {/*            label='Institute/University Location'*/}
              {/*            variant="outlined"*/}
              {/*            InputLabelProps={{required: true}}*/}
              {/*            error={!!errors[`educations.${index}.region_id`]}*/}
              {/*            helperText={errors[`educations.${index}.region_id`] ? errors[`educations.${index}.region_id`] : null}*/}
              {/*        />}*/}
              {/*        name="region_id"*/}
              {/*        onChange={(event, value) => handleRegionChange(index, value)}*/}
              {/*    />*/}
              {/*</Grid>*/}

              <Grid item xs={12} md={8}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="country-box"
                  options={countries}
                  value={
                    oldInputFields[index]["country"]
                      ? oldInputFields[index]["country"]
                      : null
                  }
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
                      required
                      label="School/ Institute/ University Location"
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      error={!!errors[`educations.${index}.country_id`]}
                      helperText={
                        errors[`educations.${index}.country_id`]
                          ? errors[`educations.${index}.country_id`]
                          : null
                      }
                    />
                  )}
                  name="country_id"
                  onChange={(event, value) => handleCountryChange(index, value)}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Autocomplete
                  fullWidth
                  disableClearable
                  id="academic-field-box"
                  options={academicFields}
                  value={
                    oldInputFields[index]["academic_field"]
                      ? oldInputFields[index]["academic_field"]
                      : null
                  }
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
                      required
                      label="Field of Study"
                      variant="outlined"
                      InputLabelProps={{ required: true }}
                      error={!!errors[`educations.${index}.academic_field_id`]}
                      helperText={
                        errors[`educations.${index}.academic_field_id`]
                          ? errors[`educations.${index}.academic_field_id`]
                          : null
                      }
                    />
                  )}
                  name="academic_field_id"
                  onChange={(event, value) =>
                    handleAcademicFieldChange(index, value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <StyledTextField
                  id="additional-info"
                  label="Additional Info"
                  multiline
                  rows={3}
                  variant="outlined"
                  fullWidth
                  name="additional_info"
                  onChange={(event) => {
                    handleInputChange(event, index);
                  }}
                  error={!!errors[`experiences.${index}.additional_info`]}
                  helperText={
                    errors[`experiences.${index}.additional_info`]
                      ? errors[`educations.${index}.additional_info`]
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
          {/*{isSingleCreate ? null : <Button*/}
          {/*    variant="text"*/}
          {/*    startIcon={<AddIcon/>}*/}
          {/*    sx={{*/}
          {/*        fontSize: '14px', fontWeight: 400*/}
          {/*    }}*/}
          {/*    onClick={handleAddMore}*/}
          {/*>*/}
          {/*    Add Previous Educations*/}
          {/*</Button>}*/}

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
              to="/seekers/educations"
            >
              Cancel
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default EducationForm;

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
