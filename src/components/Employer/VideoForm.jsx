import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {
  abilitiesActions,
  companyVideoActions,
  employerAuthActions,
} from "../../store";
import { useDispatch } from "react-redux";
import { helper } from "../../helpers";
import WarnBlockQuote from "./WarnBlockQuote";
import { useNavigate } from "react-router-dom";

const VideoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [formDisable, setFormDisable] = useState(true);
  const [abilityOpen, setAbilityOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("The title is mandatory.")
      .min(2, "The title must not be less than 2 characters.")
      .max(100, "The title must not be greater than 100 characters."),
    remark: Yup.string().nullable().max(100),
    url: Yup.string().url(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = (data) => {
    dispatch(companyVideoActions.create(data)).then((res) => {
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
        dispatch(companyVideoActions.get());
        navigate("/employers/videos");
      }
    });
  };

  const fetchData = useCallback(() => {
    dispatch(employerAuthActions.company()).then((r) => {
      if (Object.keys(r.payload?.data).length < 1) {
        setShowWarning(true);
        setFormDisable(true);
      } else {
        dispatch(abilitiesActions.getAll()).then((r) => {
          if (Object.keys(r.payload.data).length < 1) {
            setAbilityOpen(true);
            setFormDisable(true);
          } else {
            if (r.payload.data?.video?.count > 0) {
              setShowWarning(false);
              setFormDisable(false);
            } else {
              setAbilityOpen(true);
              setFormDisable(true);
            }
          }
        });
      }
    });
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
        sx={{
          px: 4,
          py: 3,
        }}
        spacing={3}
      >
        <Grid item xs={12} md={8} lg={8}>
          <WarnBlockQuote
            companyWarning={showWarning}
            abilityWarning={abilityOpen}
            ability="upload video"
          />
        </Grid>

        <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
          <StyleTextField
            error={!!errors.name}
            fullWidth
            label="Title"
            sx={{
              ".MuiInputLabel-formControl": {
                fontSize: "14px",
              },
            }}
            required
            variant="outlined"
            InputLabelProps={{ required: true }}
            {...register("name")}
            helperText={errors.name?.message}
            disabled={formDisable}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
          <StyleTextField
            error={!!errors.url}
            fullWidth
            label="Video Link"
            sx={{
              ".MuiInputLabel-formControl": {
                fontSize: "14px",
              },
            }}
            required
            variant="outlined"
            type="url"
            InputLabelProps={{ required: true }}
            {...register("url")}
            helperText={
              errors.url?.message ??
              "Your video link must be YouTube or Facebook."
            }
            disabled={formDisable}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
          <StyleTextField
            error={!!errors.remark}
            fullWidth
            label="Remark"
            sx={{
              ".MuiInputLabel-formControl": {
                fontSize: "14px",
              },
            }}
            multiline
            minRows={1}
            maxRows={3}
            variant="outlined"
            {...register("remark")}
            helperText={errors.remark?.message}
            disabled={formDisable}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
          {isSubmitting ? (
            <LoadingButton
              loading
              fullWidth
              loadingPosition="start"
              color="secondary"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                width: "110px",
                borderRadius: "10px",
              }}
              disabled={formDisable}
            >
              Uploading...
            </LoadingButton>
          ) : (
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              type="submit"
              sx={{
                width: "110px",
                borderRadius: "10px",
              }}
              disabled={formDisable}
            >
              Upload
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoForm;

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