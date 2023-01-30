import React, { useCallback, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  TextField,
  styled,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import {
  employerAuthActions,
  employerContactPersonActions,
  employerPositionActions,
} from "../../store";
import { setProgress } from "../../store/slices/progress";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { helper, history } from "../../helpers";
import WarnBlockQuote from "./WarnBlockQuote";
import { useParams } from "react-router-dom";

const ContactPersonForm = () => {
  const dispatch = useDispatch();
  const { contactPersonId } = useParams();
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState([]);
  const [formDisable, setFormDisable] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedEmployerPosition, setSelectedEmployerPosition] = useState([]);
  const { employer_contact_persons } = useSelector(
    (state) => state.employer_contact_persons
  );

  const handleEmployerPositionChange = (item) => {
    setPositionId(item.uuid);
    setSelectedEmployerPosition(item);
  };

  const initFetch = useCallback(() => {
    dispatch(setProgress(50));
    dispatch(employerAuthActions.company()).then((res) => {
      if (contactPersonId) {
        dispatch(employerContactPersonActions.getAll()).then((res) => {
          if (res.payload?.employer_position) {
            setSelectedEmployerPosition(res.payload?.employer_position);
          }
        });
      }

      if (Object.keys(res.payload?.data).length > 0) {
        setFormDisable(false);
      }

      if (Object.keys(res.payload?.data).length < 1) {
        setShowWarning(true);
      }

      dispatch(employerPositionActions.getAll()).then((res) => {
        setPositions(res.payload);
        setLoading(false);
      });

      dispatch(setProgress(100));
    });

    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required field."),
    email: Yup.string()
      .email("The email address must be a valid email address.")
      .required("Email is required field."),
    mobile_no: Yup.string().required("Phone is required field."),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    data.employer_position_id = positionId;

    if (contactPersonId) {
      return dispatch(
        employerContactPersonActions.update({
          uuid: contactPersonId,
          data: data,
        })
      ).then((res) => {
        if (res.error) {
          return errorHelper(res);
        } else {
          history.navigate("/employers/contact-person");
          dispatch(employerContactPersonActions.getAll());
        }
      });
    } else {
      return dispatch(employerContactPersonActions.create(data, true)).then(
        (res) => {
          if (res.error) {
            return errorHelper(res);
          } else {
            history.navigate("/employers/contact-person");
            dispatch(employerContactPersonActions.getAll());
          }
        }
      );
    }
  }

  const errorHelper = (res) => {
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!loading && (
        <Grid container spacing={1} sx={{ px: 4, py: 3 }}>
          <Grid item xs={12} md={8} lg={8}>
            <WarnBlockQuote companyWarning={showWarning} />
          </Grid>
          <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
            <FormControl
              fullWidth
              variant="outlined"
              size="large"
              color="secondary"
            >
              <StyleTextField
                id="employer_contact_person_name"
                size="large"
                type="text"
                name="name"
                variant="outlined"
                sx={{
                  pb: "10px",
                }}
                label="Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                required
                disabled={formDisable}
                defaultValue={employer_contact_persons?.name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
            <FormControl
              fullWidth
              variant="outlined"
              size="large"
              color="secondary"
            >
              <StyleTextField
                id="employer-contact-person-email"
                size="large"
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                sx={{
                  pb: "10px",
                }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                disabled={formDisable}
                defaultValue={employer_contact_persons?.email}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
            <FormControl
              fullWidth
              variant="outlined"
              size="large"
              color="secondary"
            >
              <StyleTextField
                id="employer-contact-person-email"
                size="large"
                type="number"
                name="mobile_no"
                label="Phone"
                variant="outlined"
                sx={{
                  pb: "10px",
                }}
                {...register("mobile_no")}
                error={!!errors.mobile_no}
                helperText={errors.mobile_no?.message}
                required
                disabled={formDisable}
                defaultValue={employer_contact_persons.mobile_no}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
            <Autocomplete
              fullWidth
              disablePortal
              disableClearable
              id="employer-contact-person-position"
              options={positions}
              value={selectedEmployerPosition || null}
              getOptionLabel={(option) => (option.title ? option.title : "")}
              isOptionEqualToValue={(option, value) =>
                option.uuid === value.uuid
              }
              disabled={formDisable}
              renderInput={(params) => (
                <StyleTextField
                  error={!!errors.employer_position_id}
                  {...params}
                  fullWidth
                  label="Position"
                  sx={{
                    ".MuiInputLabel-formControl": {
                      fontSize: "14px",
                    },
                  }}
                  required
                  variant="outlined"
                  name="employer_position_id"
                  InputLabelProps={{ required: true }}
                  {...register("employer_position_id")}
                  helperText={errors.employer_position_id?.message}
                />
              )}
              onChange={(event, value) => {
                handleEmployerPositionChange(value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            sx={{ display: "flex", justifyContent: "end" }}
          >
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={isSubmitting}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{
                background: "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "400",
                borderRadius: "10px",
                py: 1,
                px: 5,
              }}
              disabled={formDisable}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ContactPersonForm;

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
