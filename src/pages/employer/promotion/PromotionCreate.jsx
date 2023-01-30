import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import {
  abilitiesActions,
  companyPromotionActions,
  employerAuthActions,
} from "../../../store";
import { helper } from "../../../helpers";
import PromotionFormControl from "../../../components/Employer/PromotionFormControl";
import SEO from "../../../components/Common/SEO";
import { Box, Divider, Typography } from "@mui/material";

const PromotionCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formDisable, setFormDisable] = useState(true);
  const [abilityOpen, setAbilityOpen] = useState(false);
  const [type, setType] = useState("1");

  const handleFileChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
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

    if (payload["title"]) {
      formData.append("title", payload["title"]);
    }

    if (payload["video_link"] && type === "2") {
      formData.append("video_link", payload["video_link"]);
    }

    if (image) {
      formData.append("image", image);
    }

    formData.append("type", type);

    dispatch(companyPromotionActions.createPromotion(formData)).then((res) => {
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
        dispatch(companyPromotionActions.getProducts);
        navigate("/employers/promotions");
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
            if (r.payload.data?.promotion?.promotion_cnt > 0) {
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
      sx={{
        background: "white",
        borderRadius: "10px",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <SEO title="Company Videos" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" py={3} px={4} color="primary">
          Company Promotion
        </Typography>
        <Divider />
        <PromotionFormControl
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          formDisable={formDisable}
          imagePreview={imagePreview}
          showWarning={showWarning}
          abilityOpen={abilityOpen}
          handleFileChange={handleFileChange}
          errors={errors}
          isSubmitting={isSubmitting}
          register={register}
          ability="company promotion"
          type={type}
          setType={setType}
        />
      </Box>
    </Box>
  );
};

export default PromotionCreate;