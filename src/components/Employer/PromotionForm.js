import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { companyPromotionActions } from "../../store";
import { useDispatch } from "react-redux";
import { helper, history } from "../../helpers";

const PromotionForm = () => {
  const dispatch = useDispatch();

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
    dispatch(companyPromotionActions.create(data)).then((res) => {
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
        history.navigate("/employers/videos");
      }
    });
  };

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
        <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
          <TextField
            error={!!errors.name}
            fullWidth
            label="Title"
            sx={{
              "& .MuiInput-underline:before": {
                borderBottomColor: "#E8E8E8",
              },
              ".MuiFormLabel-asterisk": {
                color: "#B71C1C",
              },
              ".MuiInputLabel-formControl": {
                fontSize: "14px",
              },
            }}
            variant="standard"
            InputLabelProps={{ required: true }}
            {...register("name")}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
          <TextField
            error={!!errors.url}
            fullWidth
            label="Video Link"
            sx={{
              "& .MuiInput-underline:before": {
                borderBottomColor: "#E8E8E8",
              },
              ".MuiFormLabel-asterisk": {
                color: "#B71C1C",
              },
              ".MuiInputLabel-formControl": {
                fontSize: "14px",
              },
            }}
            variant="standard"
            type="url"
            InputLabelProps={{ required: true }}
            {...register("url")}
            helperText={
              errors.url?.message ??
              "Your video link must be YouTube or Facebook."
            }
          />
        </Grid>
        <Grid item xs={12} md={8} lg={8} sx={{ mb: 2 }}>
          <TextField
            error={!!errors.remark}
            fullWidth
            label="Remark"
            sx={{
              "& .MuiInput-underline:before": {
                borderBottomColor: "#E8E8E8",
              },
              ".MuiInputLabel-formControl": {
                fontSize: "14px",
              },
            }}
            multiline
            minRows={1}
            maxRows={3}
            variant="standard"
            {...register("remark")}
            helperText={errors.remark?.message}
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
            >
              Upload
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromotionForm;