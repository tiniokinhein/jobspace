import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { abilitiesActions, jobsActions } from "../../../store";
import { setProgress } from "../../../store/slices/progress";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputBase,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SEO from "../../../components/Common/SEO";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useForm } from "react-hook-form";
import { helper, history } from "../../../helpers";
import JobTypeDataService from "../../../services/job.type.service";
import QualificationDataService from "../../../services/qualification.service";
import ExperienceLengthDataService from "../../../services/experience.length.service";
import JobCategoryDataService from "../../../services/job.category.service";
import IndustryDataService from "../../../services/industry.service";
import RegionDataService from "../../../services/regions.service";
import CurrenciesService from "../../../services/currencies.service";
import TownshipDataService from "../../../services/townships.service";
import JobRoleDataService from "../../../services/job.role.service";
import OfferService from "../../../services/offer.service";
import CountryDataService from "../../../services/country.service";

const JobPostEdit = () => {
  const dispatch = useDispatch();
  const { jobPostId } = useParams();
  let descriptionRef = React.useRef();
  let specificationRef = React.useRef();
  const [loading, setLoading] = useState(true);
  const [jobTypes, setJobTypes] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedQualifications, setSelectedQualifications] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [townships, setTownships] = useState([]);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);
  const [selectedJobRole, setSelectedJobRole] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [salaryType, setSalaryType] = useState(3);
  const [questions, setQuestions] = useState([]);
  const [isShowQuestionTag, setIsShowQuestionTag] = useState(false);
  const [question, setQuestion] = useState(null);
  const [questionErr, setQuestionErr] = useState(false);
  const [questionErrMsg, setQuestionErrMsg] = useState(null);
  const [selectedValue, setSelectedValue] = useState("1");
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionLimit, setQuestionLimit] = useState(0);
  const { job } = useSelector((state) => state.jobs);
  const [offers, setOffers] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);

  const fetchJobPost = useCallback(() => {
    dispatch(setProgress(50));
    if (jobPostId) {
      dispatch(jobsActions.getDataByUuid(jobPostId)).then(res => {
        if (res.payload.industry) {
          setSelectedIndustry(res.payload.industry);
        }

        if (res.payload.job_type) {
          setSelectedJobType(res.payload.job_type);
        }

        if (res.payload.qualifications) {
          let qualifications = res.payload.qualifications.map(
            (qualification) => qualification.qualification ?? {}
          );
          setSelectedQualifications(qualifications);
        }

        if (res.payload.experience_length) {
          setSelectedExperience(res.payload.experience_length);
        }

        if (res.payload.job_category) {
          setSelectedJobCategory(res.payload.job_category);
        }

        if (res.payload.job_role) {
          setSelectedJobRole(res.payload.job_role);
        }

        if (res.payload.country) {
          setSelectedCountry(res.payload.country);
        }

        if (res.payload.region) {
          setSelectedRegion(res.payload.region);
        }

        if (res.payload.township) {
          setSelectedTownship(res.payload.township);
        }

        if (res.payload.job_post_additional_questions) {
          let questions = res.payload.job_post_additional_questions.map(
            (question) => question?.question
          );
          setQuestions(questions);
        }

        if (res.payload?.job_post_offers) {
          let offers = res.payload.job_post_offers.map(
            (jobPostOffer) => jobPostOffer.offer ?? {}
          );
          setSelectedOffers(offers);
        }

        setSalaryType(res.payload?.salary_type);

        setSelectedValue(`${res.payload?.notify_type}`);

        if (res.payload.currency) {
          setSelectedCurrency(res.payload.currency);
        }

        dispatch(abilitiesActions.getAll()).then(r => {
          if (r.payload.data?.job_post?.question > 0) {
            setShowQuestion(true);
            setQuestionLimit(r.payload.data?.job_post?.question);
          }
        });

        dispatch(setProgress(100));
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    fetchJobPost();
  }, [fetchJobPost]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleOfferChange = (item) => {
    setSelectedOffers(item);
  };

  useEffect(() => {
    (async () => {
      dispatch(setProgress(50));

      await JobTypeDataService.get().then((r) => {
        setJobTypes(r.data);
      });

      await QualificationDataService.all().then((r) => {
        setQualifications(r.data);
      });

      await ExperienceLengthDataService.get().then((r) => {
        setExperiences(r.data);
      });

      await JobCategoryDataService.get().then((r) => {
        setJobCategories(r.data);
      });

      await IndustryDataService.all().then((r) => {
        setIndustries(r.data);
      });

      await CountryDataService.get().then((r) => {
        setCountries(r.data);
      });

      // await RegionDataService.all().then(r => {
      //     setRegions(r.data);
      // })

      await CurrenciesService.get().then((r) => {
        setCurrencies(r.data);
      });

      await OfferService.get().then((r) => {
        setOffers(r.data);
      });

      dispatch(setProgress(100));
    })();
    // eslint-disable-next-line
  }, []);

  const retrieveRegions = useCallback(async () => {
    if (selectedCountry?.uuid) {
      await RegionDataService.getRegionsByCountryUuid(
        selectedCountry.uuid
      ).then((r) => {
        setRegions(r.data);
      });
    }
  }, [selectedCountry]);

  const retrieveTownships = useCallback(async () => {
    if (selectedRegion?.uuid) {
      await TownshipDataService.getTownshipByRegionUuid(
        selectedRegion.uuid
      ).then((r) => {
        setTownships(r.data);
      });
    }
  }, [selectedRegion]);

  const retrieveJobRole = useCallback(async () => {
    if (selectedJobCategory?.uuid) {
      await JobRoleDataService.get(selectedJobCategory.uuid).then((r) => {
        setJobRoles(r.data);
      });
    }
  }, [selectedJobCategory]);

  useEffect(() => {
    retrieveJobRole();
    retrieveRegions();
    retrieveTownships();
  }, [retrieveJobRole, retrieveRegions, retrieveTownships]);

  const handleQualificationChange = (item) => {
    setSelectedQualifications(item);
  };

  const validationSchema = Yup.object().shape({
    job_title: Yup.string()
      .required("The job title is mandatory.")
      .max(200)
      .min(2),
    vacancy: Yup.number().required("The no. of vacancies is mandatory.").min(1),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(data) {
    let payload = data;

    if (selectedExperience) {
      payload["experience_length_id"] = selectedExperience.uuid;
    }

    if (selectedIndustry) {
      payload["industry_id"] = selectedIndustry.uuid;
    }

    if (selectedJobCategory) {
      payload["job_category_id"] = selectedJobCategory.uuid;
    }

    if (selectedJobRole) {
      payload["job_role_id"] = selectedJobRole.uuid;
    }

    if (selectedJobType) {
      payload["job_type_id"] = selectedJobType.uuid;
    }

    if (selectedCountry) {
      payload["country_id"] = selectedCountry.uuid;
    }

    if (selectedRegion) {
      payload["region_id"] = selectedRegion.uuid;
    }

    if (selectedTownship) {
      payload["township_id"] = selectedTownship.uuid;
    }

    if (selectedCurrency) {
      payload["currency_id"] = selectedCurrency.uuid;
    }

    if (selectedQualifications.length > 0) {
      payload["qualifications"] = selectedQualifications.map(
        (item) => item.uuid ?? null
      );
    }

    if (!payload["gender"]) {
      payload["gender"] = 3;
    }

    const jobDec = descriptionRef.current.getInstance()?.getHTML();
    const jobSpec = specificationRef.current.getInstance()?.getHTML();

    if (jobSpec) {
      payload["job_specification"] = jobSpec;
    }

    if (jobDec) {
      payload["job_description"] = jobDec;
    }

    if (questions.length > 0) {
      payload["additional_questions"] = questions;
    }

    payload["notify_type"] = selectedValue;

    if (selectedOffers.length > 0) {
      payload["offers"] = selectedOffers.map((item) => item.uuid ?? null);
    }

    if (selectedValue === "2" && !payload.notify_mail) {
      setError("notify_mail", { message: "The notify email is mandatory." });
    } else {
      if (jobPostId) {
        console.log(payload);
        dispatch(jobsActions.update({ uuid: jobPostId, data: payload })).then(r => {
            if (r.error) {
              try {
                if (helper.isJson(r.error.message)) {
                  const errBag = JSON.parse(r.error.message);

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
              history.navigate(`/employers/job-posts/${jobPostId}/detail`);
            }
          }
        );
      }
    }
  }

  const toolbarItems: string[] = [
    ["heading", "bold", "italic", "hr", "ul", "ol", "indent", "outdent"],
  ];

  const handleSalaryTypeChange = (value) => {
    setSalaryType(parseInt(value));
  };

  const handleQuestionChange = (e) => {
    if (e.target.value) {
      if (e.target.value.length > 200) {
        setQuestionErr(true);
        setQuestionErrMsg("The question must less than 200 characters.");
      } else {
        setQuestionErr(false);
        setQuestionErrMsg(null);
        setQuestion(e.target.value);
      }
    } else {
      setQuestionErr(true);
      setQuestionErrMsg("The question is mandatory.");
    }
  };

  const handleDelete = (item) => {
    const data = [...questions];
    const index = data.indexOf(item);

    if (index > -1) {
      data.splice(index, 1);
      setQuestions(data);
    }
  };

  const handleAddQuestion = () => {
    if (question) {
      if (question.length > 200) {
        setQuestionErr(true);
        setQuestionErrMsg("The question must less then 200 characters.");
      } else {
        setIsShowQuestionTag(false);
        setQuestions((prevState) => [...prevState, question]);
      }
    } else {
      setQuestionErr(true);
      setQuestionErrMsg("The question is mandatory.");
    }
  };

  const handleShowQuestion = () => {
    setIsShowQuestionTag((prevState) => !prevState);
  };

  return (
    <Fragment>
      {!loading && (
        <Box
          sx={{
            background: "white",
            borderRadius: "10px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SEO title="Post Job" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h5" py={3} px={4} color="primary">
              Job Post Edit
            </Typography>
            <Divider />
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
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
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
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography color="#333333" fontSize="20px">
                        Make Tomorrow Yours
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth variant="standard">
                        <StyleTextField
                          error={!!errors.job_title}
                          type="text"
                          name="job_title"
                          required
                          fullWidth
                          multiline
                          minRows={1}
                          maxRows={4}
                          label="Job Title"
                          variant="outlined"
                          defaultValue={job.job_title ?? null}
                          {...register("job_title")}
                        />
                        <Stack direction="row" justifyContent="space-between">
                          <FormHelperText
                            error={!!errors.job_title}
                            sx={{ textAlign: "left" }}
                          >
                            {errors.job_title?.message}
                          </FormHelperText>
                          <FormHelperText sx={{ textAlign: "right" }}>
                            200 Character limit
                          </FormHelperText>
                        </Stack>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        id="industry"
                        options={industries}
                        value={selectedIndustry}
                        getOptionLabel={(option) =>
                          option.title ? option.title : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.uuid === value.uuid
                        }
                        renderInput={(params) => (
                          <StyleTextField
                            error={!!errors.industry_id}
                            {...params}
                            fullWidth
                            label="Industry"
                            variant="outlined"
                            name="industry_id"
                            {...register("industry_id")}
                            helperText={errors.industry_id?.message}
                          />
                        )}
                        onChange={(event, value) => setSelectedIndustry(value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        disableClearable
                        id="job-types"
                        options={jobTypes}
                        value={selectedJobType}
                        getOptionLabel={(option) =>
                          option.title ? option.title : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.uuid === value.uuid
                        }
                        renderInput={(params) => (
                          <StyleTextField
                            error={!!errors.job_type_id}
                            {...params}
                            fullWidth
                            label="Employment Types"
                            sx={{
                              ".MuiInputLabel-formControl": {
                                fontSize: "14px",
                              },
                            }}
                            required
                            variant="outlined"
                            name="job_type_id"
                            {...register("job_type_id")}
                            helperText={errors.job_type_id?.message}
                          />
                        )}
                        onChange={(event, value) => setSelectedJobType(value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth variant="standard">
                        <StyleTextField
                          error={!!errors.vacancy}
                          type="number"
                          name="vacancy"
                          required
                          fullWidth
                          label="No. of Vacancies"
                          variant="outlined"
                          defaultValue={job.vacancy ?? null}
                          {...register("vacancy")}
                          placeholder="How many people do you want to hire for this application?"
                        />
                        <FormHelperText error={!!errors.vacancy}>
                          {errors.vacancy?.message}
                        </FormHelperText>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Autocomplete
                        multiple
                        id="qualifications"
                        disableClearable
                        options={qualifications}
                        getOptionLabel={(option) =>
                          option.title ? option.title : ""
                        }
                        getOptionDisabled={(options) =>
                          selectedQualifications.length > 3
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.uuid === value.uuid
                        }
                        value={selectedQualifications || null}
                        onChange={(event, value) =>
                          handleQualificationChange(value)
                        }
                        renderInput={(params) => (
                          <StyleTextField
                            {...params}
                            variant="outlined"
                            label="Qualification"
                            InputLabelProps={{ required: true }}
                            sx={{
                              ".MuiInputLabel-formControl": {
                                fontSize: "14px",
                              },
                              ".MuiFormHelperText-root": {
                                color: "#C4C4C4",
                              },
                            }}
                            error={!!errors.qualifications}
                            helperText={
                              !!errors.qualifications
                                ? errors.qualifications?.message
                                : "Maximum 4 Qualification can be selected."
                            }
                            FormHelperTextProps={{
                              error: !!errors.qualifications,
                            }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        disableClearable
                        id="experience"
                        options={experiences}
                        value={selectedExperience}
                        getOptionLabel={(option) =>
                          option.title ? option.title : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.uuid === value.uuid
                        }
                        renderInput={(params) => (
                          <StyleTextField
                            error={!!errors.experience_id}
                            {...params}
                            fullWidth
                            label="Experience"
                            sx={{
                              ".MuiInputLabel-formControl": {
                                fontSize: "14px",
                              },
                            }}
                            variant="outlined"
                            name="experience_id"
                            required
                            {...register("experience_id")}
                            helperText={errors.experience_id?.message}
                          />
                        )}
                        onChange={(event, value) =>
                          setSelectedExperience(value)
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Autocomplete
                            fullWidth
                            disablePortal
                            disableClearable
                            id="category"
                            options={jobCategories}
                            value={selectedJobCategory}
                            getOptionLabel={(option) =>
                              option.title ? option.title : ""
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.uuid === value.uuid
                            }
                            renderInput={(params) => (
                              <StyleTextField
                                error={!!errors.job_category_id}
                                {...params}
                                fullWidth
                                label="Job Category"
                                variant="outlined"
                                name="job_category_id"
                                required
                                {...register("job_category_id")}
                                helperText={errors.job_category_id?.message}
                              />
                            )}
                            onChange={(event, value) =>
                              setSelectedJobCategory(value)
                            }
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Autocomplete
                            fullWidth
                            disablePortal
                            disableClearable
                            id="job_role"
                            options={jobRoles}
                            value={selectedJobRole}
                            getOptionLabel={(option) =>
                              option.title ? option.title : ""
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.uuid === value.uuid
                            }
                            renderInput={(params) => (
                              <StyleTextField
                                error={!!errors.job_role_id}
                                {...params}
                                fullWidth
                                label="Job Role"
                                variant="outlined"
                                name="job_role_id"
                                {...register("job_role_id")}
                                helperText={errors.job_role_id?.message}
                              />
                            )}
                            onChange={(event, value) =>
                              setSelectedJobRole(value)
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 1 }}>
                          <FormControl>
                            <FormLabel
                              id="open-to-label"
                              sx={{ mb: 1, fontSize: "14px" }}
                            >
                              Open To <span className="error">*</span>
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="open-to-label"
                              name="gender"
                              defaultValue={`${job.gender ? job.gender : 3}`}
                            >
                              <StyledFormControlLabel
                                value="1"
                                control={<Radio {...register("gender")} />}
                                label="Male"
                              />
                              <StyledFormControlLabel
                                value="2"
                                control={<Radio {...register("gender")} />}
                                label="Female"
                              />
                              <StyledFormControlLabel
                                value="3"
                                control={<Radio {...register("gender")} />}
                                label="Both"
                              />
                            </RadioGroup>
                            <FormHelperText error={!!errors.gender}>
                              {errors.gender?.message}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} my={2}>
                          <Typography
                            color="primary"
                            fontSize="20px"
                            fontWeight={500}
                          >
                            Job Description
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Editor
                            previewStyle="vertical"
                            height="600px"
                            initialEditType="wysiwyg"
                            initialValue={`${job?.job_description}`}
                            language="en_US"
                            useDefaultHTMLSanitizer={true}
                            useCommandShortcut={true}
                            usageStatistics={true}
                            hideModeSwitch={true}
                            toolbarItems={toolbarItems}
                            ref={descriptionRef}
                            autofocus={false}
                          />
                          <Stack
                            direction="row"
                            display="flex"
                            justifyContent="space-between"
                          >
                            <FormHelperText error={!!errors.job_description}>
                              {errors.job_description?.message}
                            </FormHelperText>
                            <Typography
                              align="right"
                              mt={1}
                              fontSize="12px"
                              color="#A1A1A1"
                            >
                              10000 Character limit
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} my={2}>
                          <Typography
                            color="primary"
                            fontSize="20px"
                            fontWeight={500}
                          >
                            Job Specification (Job Requirements)
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Editor
                            previewStyle="vertical"
                            height="600px"
                            initialEditType="wysiwyg"
                            initialValue={`${job?.job_specification}`}
                            language="en_US"
                            useDefaultHTMLSanitizer={true}
                            useCommandShortcut={true}
                            usageStatistics={true}
                            hideModeSwitch={true}
                            toolbarItems={toolbarItems}
                            ref={specificationRef}
                            autofocus={false}
                          />
                          <Stack
                            direction="row"
                            display="flex"
                            justifyContent="space-between"
                          >
                            <FormHelperText error={!!errors.job_specification}>
                              {errors.job_specification?.message}
                            </FormHelperText>
                            <Typography
                              align="right"
                              mt={1}
                              fontSize="12px"
                              color="#A1A1A1"
                            >
                              10000 Character limit
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} mt={1}>
                          <Typography
                            color="primary"
                            fontSize="20px"
                            fontWeight={500}
                          >
                            Work Location
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Autocomplete
                                fullWidth
                                disablePortal
                                disableClearable
                                id="country"
                                options={countries}
                                value={selectedCountry}
                                getOptionLabel={(option) =>
                                  option.title ? option.title : ""
                                }
                                isOptionEqualToValue={(option, value) =>
                                  option.uuid === value.uuid
                                }
                                renderInput={(params) => (
                                  <StyleTextField
                                    error={!!errors.country_id}
                                    {...params}
                                    fullWidth
                                    label="Country"
                                    variant="outlined"
                                    name="country_id"
                                    {...register("country_id")}
                                    helperText={errors.country_id?.message}
                                    required
                                  />
                                )}
                                onChange={(event, value) =>
                                  setSelectedCountry(value)
                                }
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Autocomplete
                                fullWidth
                                disablePortal
                                disableClearable
                                id="region"
                                options={regions}
                                value={selectedRegion}
                                getOptionLabel={(option) =>
                                  option.title ? option.title : ""
                                }
                                isOptionEqualToValue={(option, value) =>
                                  option.uuid === value.uuid
                                }
                                renderInput={(params) => (
                                  <StyleTextField
                                    error={!!errors.region_id}
                                    {...params}
                                    fullWidth
                                    label="Region"
                                    variant="outlined"
                                    name="region_id"
                                    {...register("region_id")}
                                    helperText={errors.region_id?.message}
                                    required
                                  />
                                )}
                                onChange={(event, value) =>
                                  setSelectedRegion(value)
                                }
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Autocomplete
                                fullWidth
                                disablePortal
                                disableClearable
                                id="township"
                                options={townships}
                                value={selectedTownship}
                                getOptionLabel={(option) =>
                                  option.title ? option.title : ""
                                }
                                isOptionEqualToValue={(option, value) =>
                                  option.uuid === value.uuid
                                }
                                renderInput={(params) => (
                                  <StyleTextField
                                    error={!!errors.township_id}
                                    {...params}
                                    fullWidth
                                    label="Township"
                                    variant="outlined"
                                    name="township_id"
                                    {...register("township_id")}
                                    helperText={errors.township_id?.message}
                                    required
                                  />
                                )}
                                onChange={(event, value) =>
                                  setSelectedTownship(value)
                                }
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <StyleTextField
                                id="address"
                                label="Address"
                                multiline
                                minRows={1}
                                maxRows={4}
                                variant="outlined"
                                fullWidth
                                sx={{
                                  ".MuiInputLabel-formControl": {
                                    fontSize: "14px",
                                  },
                                }}
                                name="address"
                                error={!!errors.address}
                                {...register("address")}
                                helperText={errors.address?.message}
                                defaultValue={job.address}
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} mt={2}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={12}>
                                  <Typography
                                    color="primary"
                                    fontSize="20px"
                                    fontWeight={500}
                                  >
                                    Salary
                                  </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                  <FormControl>
                                    <RadioGroup
                                      row
                                      name="salary_type"
                                      value={salaryType}
                                      {...register("salary_type")}
                                      onChange={(event, value) =>
                                        handleSalaryTypeChange(value)
                                      }
                                    >
                                      <StyledFormControlLabel
                                        value="1"
                                        control={
                                          <Radio {...register("salary_type")} />
                                        }
                                        label="Negotiable"
                                      />
                                      <StyledFormControlLabel
                                        value="2"
                                        control={
                                          <Radio {...register("salary_type")} />
                                        }
                                        label="Confidential"
                                      />
                                      <StyledFormControlLabel
                                        value="3"
                                        control={
                                          <Radio {...register("salary_type")} />
                                        }
                                        label="Range"
                                      />
                                    </RadioGroup>
                                    <FormHelperText
                                      error={!!errors.salary_type}
                                    >
                                      {errors.salary_type?.message}
                                    </FormHelperText>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>

                            {salaryType === 3 && (
                              <Grid item xs={12}>
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
                                    <Autocomplete
                                      fullWidth
                                      disablePortal
                                      disableClearable
                                      id="currency"
                                      options={currencies}
                                      value={selectedCurrency}
                                      getOptionLabel={(option) =>
                                        option.name ? option.name : ""
                                      }
                                      isOptionEqualToValue={(option, value) =>
                                        option.uuid === value.uuid
                                      }
                                      renderInput={(params) => (
                                        <StyleTextField
                                          error={!!errors.currency_id}
                                          {...params}
                                          fullWidth
                                          label="Currency"
                                          variant="outlined"
                                          name="currency_id"
                                          {...register("currency_id")}
                                          helperText={
                                            errors.currency_id?.message
                                          }
                                        />
                                      )}
                                      onChange={(event, value) =>
                                        setSelectedCurrency(value)
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={4.5}>
                                    <FormControl fullWidth variant="standard">
                                      <StyleTextField
                                        error={!!errors.min_salary}
                                        type="number"
                                        name="min_salary"
                                        required
                                        fullWidth
                                        label="Min"
                                        variant="outlined"
                                        defaultValue={job.min_salary ?? null}
                                        {...register("min_salary")}
                                      />
                                      <FormHelperText
                                        error={!!errors.min_salary}
                                      >
                                        {errors.min_salary?.message}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={4.5}>
                                    <FormControl fullWidth variant="standard">
                                      <StyleTextField
                                        error={!!errors.max_salary}
                                        type="number"
                                        name="max_salary"
                                        required
                                        fullWidth
                                        label="Max"
                                        variant="outlined"
                                        defaultValue={job.max_salary ?? null}
                                        {...register("max_salary")}
                                      />
                                      <FormHelperText
                                        error={!!errors.max_salary}
                                      >
                                        {errors.max_salary?.message}
                                      </FormHelperText>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>

                        <Grid item xs={12} mt={2}>
                          <Typography
                            color="primary"
                            fontSize="20px"
                            fontWeight={500}
                          >
                            What Else Can We Offer...
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            fullWidth
                            disablePortal
                            disableClearable
                            id="offers"
                            options={offers}
                            value={selectedOffers}
                            getOptionLabel={(option) =>
                              option.title ? option.title : ""
                            }
                            isOptionEqualToValue={(option, value) =>
                              option.uuid === value.uuid
                            }
                            renderInput={(params) => (
                              <StyleTextField
                                placeholder="Offers"
                                error={!!errors.offers}
                                {...params}
                                fullWidth
                                variant="outlined"
                                name="offers"
                                {...register("offers")}
                                helperText={errors.offers?.message}
                              />
                            )}
                            onChange={(event, value) =>
                              handleOfferChange(value)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {showQuestion && (
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography
                              color="primary"
                              fontSize="20px"
                              fontWeight={500}
                            >
                              Add Additional Questions ( Optional)
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                width: "100%",
                                py: 2,
                              }}
                            >
                              <Typography
                                color="#565656"
                                fontSize="14px"
                                fontWeight={300}
                                pb={1}
                              >
                                These additional questions will help you to
                                choose an ideal employee for your organization.
                              </Typography>
                              <Typography
                                color="error"
                                fontSize="14px"
                                fontWeight={300}
                                pb={1}
                              >
                                A Total of {questionLimit} additional questions
                                can be added.
                              </Typography>
                              <Typography
                                color="#565656"
                                fontSize="14px"
                                fontWeight={300}
                              >
                                Answers will be only in <strong>Yes</strong>
                                &nbsp;or&nbsp;
                                <strong>No</strong> options.
                              </Typography>
                              {questions.length > 0 && (
                                <Box
                                  direction="row"
                                  mt={1}
                                  sx={{ maxWidth: "100%" }}
                                >
                                  {questions.map((item, index) => (
                                    <Chip
                                      key={item}
                                      color="primary"
                                      variant="outlined"
                                      label={item}
                                      onDelete={() => handleDelete(item)}
                                      sx={{ m: 0.5 }}
                                    />
                                  ))}
                                </Box>
                              )}

                              <FormHelperText
                                error={!!errors.additional_questions}
                              >
                                {errors.additional_questions?.message}
                              </FormHelperText>

                              {isShowQuestionTag && (
                                <Stack spacing={0} direction="column">
                                  <Stack
                                    direction="row"
                                    width="80%"
                                    spacing={2}
                                    mt={2}
                                  >
                                    <FormControl fullWidth variant="standard">
                                      <StyledInputLabel
                                        htmlFor="question"
                                        error={questionErr}
                                      >
                                        Question
                                      </StyledInputLabel>
                                      <StyleInput
                                        id="question"
                                        size="small"
                                        onChange={handleQuestionChange}
                                        error={questionErr}
                                        maxLength="100"
                                      />
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        display="flex"
                                        mt={1}
                                      >
                                        <Typography
                                          component="span"
                                          fontSize="12px"
                                          align="left"
                                          fontWeight={400}
                                          color="error"
                                        >
                                          {questionErrMsg}
                                        </Typography>
                                        <Typography
                                          component="span"
                                          fontSize="12px"
                                          align="right"
                                          fontWeight={400}
                                        >
                                          100 Characters limit
                                        </Typography>
                                      </Stack>
                                    </FormControl>
                                    <Box
                                      sx={{
                                        minHeight: "45px",
                                        height: "45px",
                                        alignItems: "center",
                                        display: "flex",
                                      }}
                                    >
                                      <IconButton
                                        color="secondary"
                                        size="large"
                                        onClick={handleAddQuestion}
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Box>
                                  </Stack>
                                </Stack>
                              )}
                              {questions.length < questionLimit && (
                                <Button
                                  onClick={handleShowQuestion}
                                  variant="outlined"
                                  color="secondary"
                                  startIcon={<AddIcon color="primary" />}
                                  sx={{ mt: 4, py: 1 }}
                                >
                                  <Typography color="#333333" fontSize="14px">
                                    Add another questions
                                  </Typography>
                                </Button>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}

                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            pb={1}
                            color="primary"
                            fontSize="20px"
                            fontWeight={500}
                          >
                            How would you like to view the applications for this
                            job?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl>
                            <RadioGroup
                              name="notify_type"
                              value={selectedValue}
                              {...register("notify_type")}
                              onChange={(event, value) => handleChange(value)}
                            >
                              <StyledFormControlLabel
                                value="1"
                                control={<Radio />}
                                label="Screen CV in Employer ATS only."
                              />
                              <StyledFormControlLabel
                                value="2"
                                control={<Radio />}
                                label="Receive Notifications via below Email and Screen
                                                                        CV in Employer ApplicantList Tracking System."
                              />
                            </RadioGroup>
                            <FormHelperText error={!!errors.notify_mail}>
                              {errors.notify_mail?.message}
                            </FormHelperText>
                          </FormControl>

                          {selectedValue === "2" && (
                            <Box>
                              <Paper
                                sx={{
                                  p: 0.7,
                                  ml: 3.5,
                                  width: 400,
                                  display: "flex",
                                  alignItems: "center",
                                  border: "0.5px solid #E0E0E0",
                                }}
                                elevation={0}
                              >
                                <InputBase
                                  sx={{ ml: 1, flex: 1 }}
                                  placeholder="info@jobspace.com.mm"
                                  inputProps={{
                                    "aria-label": "info@jobspace.com.mm",
                                  }}
                                  {...register("notify_mail")}
                                  error={!!errors.notify_mail}
                                  defaultValue={job.notify_mail}
                                />
                              </Paper>
                              <FormHelperText error={!!errors.notify_mail}>
                                {errors.notify_mail?.message}
                              </FormHelperText>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justifyContent="flex-end"
                      display="flex"
                    >
                      <Stack spacing={2} direction="row">
                        {isSubmitting ? (
                          <LoadingButton
                            loading
                            color="secondary"
                            variant="contained"
                            sx={{
                              background:
                                "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                              color: "white",
                              borderRadius: "10px",
                              width: "130px",
                              height: "40px",
                            }}
                          >
                            Posting...
                          </LoadingButton>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{
                              background:
                                "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                              color: "white",
                              borderRadius: "10px",
                              width: "130px",
                              height: "40px",
                            }}
                            type="submit"
                          >
                            Update
                          </Button>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Fragment>
  );
};

export default JobPostEdit;

const StyledInputLabel = styled(InputLabel)(() => ({
  color: "#C4C4C4",
  fontSize: "14px",
}));

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  ".MuiFormControlLabel-label": {
    fontSize: "14px",
    color: "#C4C4C4",
  },
}));

const StyleInput = styled(Input)(() => ({
  ":before": {
    borderBottomColor: "#E8E8E8 !important",
  },
  ".MuiFormLabel-asterisk": {
    color: "#B71C1C",
  },
  ".MuiInputLabel-formControl": {
    fontSize: "14px",
  },
}));

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
