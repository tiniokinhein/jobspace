import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  styled,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { seekerEducationActions } from "../../../store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import AcademicFieldDataService from "../../../services/academic.field.service";
import QualificationDataService from "../../../services/qualification.service";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { setProgress } from "../../../store/slices/progress";
import { helper, history } from "../../../helpers";
import CountryDataService from "../../../services/country.service";

const EducationEditForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const uuid = params.eduId ?? null;
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedQualification, setSelectedQualification] = useState([]);
  const [selectedAcademicField, setSelectedAcademicField] = useState([]);
  const { seeker_education: seekerEducation } = useSelector(
    (x) => x.seeker_educations
  );
  const [qualifications, setQualifications] = useState([]);
  const [countries, setCountries] = useState([]);
  const [academicFields, setAcademicFields] = useState([]);

  const iniFetch = useCallback(() => {
    dispatch(seekerEducationActions.show(uuid)).then((r) => {
      if (r.payload?.qualification) {
        setSelectedQualification(r.payload.qualification);
      }

      if (r.payload?.country) {
        setSelectedCountry(r.payload.country);
      }

      if (r.payload?.academic_field) {
        setSelectedAcademicField(r.payload?.academic_field);
      }

      if (r.payload?.graduation_date) {
        const parts = r.payload.graduation_date.split("-");
        setDate(new Date(parts[1], parts[0] - 1, "01"));
      }

      setLoading(false);
    });
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    iniFetch();
  }, [iniFetch]);

  useEffect(() => {
    (async () => {
      dispatch(setProgress(50));
      await AcademicFieldDataService.all().then((r) =>
        setAcademicFields(r.data)
      );
      await QualificationDataService.all().then((r) =>
        setQualifications(r.data)
      );
      await CountryDataService.get().then((r) => setCountries(r.data));
      dispatch(setProgress(100));
    })();
    // eslint-disable-next-line
  }, []);

  const handleQualificationChange = (value) => {
    setSelectedQualification(value);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleAcademicFieldChange = (value) => {
    setSelectedAcademicField(value);
  };

  const validationSchema = Yup.object().shape({
    graduation_date: Yup.string().required(),
    school_name: Yup.string().required().min(2).max(100),
    additional_info: Yup.string().nullable(true).max(1000),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    let payload = data;

    if (selectedCountry) {
      payload.country_id = selectedCountry.uuid ?? null;
    }

    if (selectedQualification) {
      payload.qualification_id = selectedQualification.uuid ?? null;
    }

    if (selectedAcademicField) {
      payload.academic_field_id = selectedAcademicField.uuid ?? null;
    }

    if (date) {
      payload.graduation_date = format(date);
    }

    return dispatch(
      seekerEducationActions.update({ data: payload, uuid: uuid })
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
        history.navigate("/seekers/educations");
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
                label="Institute / University"
                variant="outlined"
                name="school_name"
                required
                InputLabelProps={{ required: true }}
                defaultValue={seekerEducation?.school_name}
                error={!!errors.school_name}
                {...register("school_name")}
                helperText={errors.school_name?.message}
              />
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} md={8}>
                <DatePicker
                  views={["year", "month"]}
                  maxDate={new Date()}
                  name="graduation_date"
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  value={date || null}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      variant="outlined"
                      label="Graduation Date"
                      required
                      fullWidth
                      InputLabelProps={{ required: true }}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "Month Year",
                      }}
                      error={!!errors.graduation_date}
                      {...register("graduation_date")}
                      helperText={errors.graduation_date?.message}
                    />
                  )}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12} md={8}>
              <Autocomplete
                fullWidth
                disableClearable
                id="qualification-box"
                options={qualifications}
                value={selectedQualification || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    label="Qualification"
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    error={!!errors.qualification_id}
                    helperText={errors.qualification_id?.message}
                  />
                )}
                name="qualification_id"
                {...register("qualification_id")}
                onChange={(event, value) => handleQualificationChange(value)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Autocomplete
                fullWidth
                disableClearable
                id="region-box"
                options={countries}
                value={selectedCountry || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    label="Institute/University Location"
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    error={!!errors.country_id}
                    helperText={errors.country_id?.message}
                  />
                )}
                name="country_id"
                onChange={(event, value) => handleCountryChange(value)}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Autocomplete
                fullWidth
                disableClearable
                id="academic-field-box"
                options={academicFields}
                value={selectedAcademicField || null}
                getOptionLabel={(option) => (option.title ? option.title : "")}
                isOptionEqualToValue={(option, value) =>
                  option.uuid === value.uuid
                }
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    label="Field of Study"
                    variant="outlined"
                    InputLabelProps={{ required: true }}
                    error={!!errors.academic_field_id}
                    helperText={errors.academic_field_id?.message}
                  />
                )}
                name="academic_field_id"
                onChange={(event, value) => handleAcademicFieldChange(value)}
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
                defaultValue={seekerEducation?.additional_info}
                error={!!errors.additional_info}
                {...register("additional_info")}
                helperText={
                  errors.additional_info?.message ?? "1000 Character limit"
                }
              />
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
                  background:
                    "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
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
                to="/seekers/educations"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default EducationEditForm;

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