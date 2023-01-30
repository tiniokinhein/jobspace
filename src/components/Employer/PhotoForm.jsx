import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Stack,
  styled,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { ReactComponent as PrimaryRocketIcon } from "../../assets/icons/secondary_rocket.svg";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {
  abilitiesActions,
  companyPhotoActions,
  employerAuthActions,
} from "../../store";
import { useDispatch } from "react-redux";
import { helper } from "../../helpers";
import WarnBlockQuote from "./WarnBlockQuote";
import { useNavigate } from "react-router-dom";

const PhotoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formDisable, setFormDisable] = useState(true);
  const [abilityOpen, setAbilityOpen] = useState(false);

  const handleFileChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("The title is mandatory.")
      .min(2, "The title must not be less than 2 characters.")
      .max(50, "The title must not be greater than 50 characters."),
    remark: Yup.string().nullable().max(100),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = (data) => {
    let payload = data;

    let formData = new FormData();

    if (payload["remark"]) {
      formData.append("remark", payload["remark"]);
    }

    if (payload["name"]) {
      formData.append("name", payload["name"]);
    }

    if (image) {
      formData.append("image", image);
    }

    dispatch(companyPhotoActions.create(formData)).then((res) => {
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
        dispatch(companyPhotoActions.get());
        navigate("/employers/photos");
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
            if (r.payload.data?.photo?.count > 0) {
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
        <Grid item xs={12} md={8} lg={8} xl={8}>
          <WarnBlockQuote
            companyWarning={showWarning}
            abilityWarning={abilityOpen}
            ability="upload photo"
          />
        </Grid>

        <Grid item xs={12} md={8} lg={8} xl={8}>
          <Box mb={3}>
            {imagePreview ? (
              <Card
                sx={{
                  maxWidth: "280px",
                  maxHeight: "200px",
                  minWidth: "280px",
                  minHeight: "200px",
                }}
                elevation={1}
              >
                <CardMedia
                  component="img"
                  image={imagePreview}
                  alt="image preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Card>
            ) : (
              <Card
                sx={{
                  maxWidth: "280px",
                  maxHeight: "200px",
                  minWidth: "280px",
                  minHeight: "200px",
                }}
              ></Card>
            )}
          </Box>

          <Button
            color="secondary"
            aria-label="upload picture"
            component="label"
            sx={{
              mb: "5px",
              background: "#E9E9E9",
              paddingX: 3.6,
            }}
            disabled={formDisable}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
            <Stack
              direction="row"
              display="flex"
              alignContent="center"
              alignItems="center"
              spacing={1}
            >
              <SvgIcon fontSize="1.2rem">
                <PrimaryRocketIcon width="100%" height="100%" />
              </SvgIcon>
              <Typography
                sx={{
                  color: "#585858",
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                Choose Image
              </Typography>
            </Stack>
          </Button>

          {!!errors.image && (
            <Typography fontSize="12px" color="error" component="span">
              {errors.image?.message}
            </Typography>
          )}

          <Divider />

          <Typography fontSize="12px" component="span" color="#525252">
            Recommended image size - 800 x 500 pixels
          </Typography>
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

export default PhotoForm;

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