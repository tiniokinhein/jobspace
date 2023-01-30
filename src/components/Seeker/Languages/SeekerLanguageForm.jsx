import React, {useCallback, useEffect, useState} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    TextField,
    styled,
    Tooltip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobLanguageDataService from "../../../services/job.languages.service";
import ProficiencyDataService from "../../../services/proficiency.service";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import {Alert, LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {useDispatch} from "react-redux";
import {seekerLanguageActions} from "../../../store";
import {useNavigate} from "react-router-dom";

const SeekerLanguageForm = ({addMore}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [languages, setLanguages] = useState([]);
    const [showError, setShowError] = useState(false);
    const [proficiencies, setProficiencies] = useState([]);
    const [isShowRemove, setIsShowRemove] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        setInputFields([{
            job_language_id: '',
            proficiency_id: '',
            is_write: false,
            is_read: false,
            is_speak: false,
            is_primary: false
        }]);
    }, [])

    const retrieveLanguages = () => {
        JobLanguageDataService.get().then(r => {
            setLanguages(r.data ?? {})
        });
    }

    const retrieveProficiencies = () => {
        ProficiencyDataService.get().then(r => {
            setProficiencies(r.data ?? {})
        });
    }

    const retrieveLangSkills = useCallback(() => {
        dispatch(seekerLanguageActions.get()).then(r => {

            if (r.payload.length > 0) {
                let fields;

                fields = r.payload.map((item, index) => {

                    if (!!item.is_primary) {
                        setSelectedValue(index)
                    }

                    return {
                        job_language_id: item.job_language?.uuid,
                        proficiency_id: item.proficiency?.uuid,
                        is_speak: !!item.is_speak,
                        is_write: !!item.is_write,
                        is_read: !!item.is_read,
                        is_primary: !!item.is_primary,
                        job_language: item.job_language,
                        proficiency: item.proficiency
                    }
                })

                setInputFields(fields)
                if (fields.length > 1) {
                    setIsShowRemove(true);
                }
            }

            setLoading(false);
        });
    }, [dispatch])

    useEffect(() => {
        if (!addMore) {
            retrieveLangSkills()
        } else {
            setLoading(false);
        }
    }, [addMore, retrieveLangSkills])

    useEffect(() => {
        retrieveLanguages();
        retrieveProficiencies();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const isNew = addMore ? 1 : 0;

        dispatch(seekerLanguageActions.create({"languages": inputFields, 'is_new': isNew})).then(r => {
            setIsSubmitting(false);

            if (r.error) {
                setShowError(true)
            } else {
                navigate('/seekers/languages');
            }
        })
    }

    const handleAddMore = () => {
        let fields = {
            job_language_id: '',
            proficiency_id: '',
            is_write: false,
            is_read: false,
            is_speak: false,
            is_primary: false
        };

        setIsShowRemove(true);
        setInputFields([...inputFields, fields]);
    }

    const removeFields = (index) => {
        let data = [...inputFields];

        data.splice(index, 1);

        setInputFields(data)

        if (data.length === 1) {
            setIsShowRemove(false)
        }
    }

    const handleSelectChange = (index, value, name) => {
        let data = [...inputFields];

        data[index][name] = value.uuid;

        if (name === 'job_language_id') {
            data[index]['job_language'] = value
        }

        if (name === 'proficiency' || name === 'proficiency_id') {
            data[index]['proficiency'] = value
        }

        setInputFields(data);
    }

    const handleFlexChange = (checked, index, name) => {
        let data = [...inputFields];

        if (name === 'is_primary' && checked) {
            data = data.map((item, key) => {
                if (index !== key && item['is_primary']) {
                    item['is_primary'] = false;
                }

                return item;
            })
        }

        data[index][name] = checked;

        setInputFields(data);
    }

    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column'}}
            component="form"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            {!loading &&
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
                sx={{px: {xs: 2, sm: 4}, py: 3}}
                spacing={3}
            >
                {
                    showError && <Box paddingX={3} paddingTop={3}>
                        <Alert severity="warning">Some value of input fields are invalid. - check it out!</Alert>
                    </Box>
                }

                {inputFields.map((input, index) => {
                    return (
                        <Grid item container xs={12} pt={3} spacing={1} key={index}>
                            <Grid item xs={6} md={6} lg={3.5}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    id="language-box"
                                    options={languages}
                                    getOptionLabel={option => option.title ? option.title : ''}
                                    value={input['job_language'] ? input['job_language'] : null}
                                    isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                    onChange={(event, value) => {
                                        handleSelectChange(index, value, 'job_language_id')
                                    }}
                                    renderInput={(params) =>
                                        <StyledTextField
                                            {...params}
                                            fullWidth
                                            label='Language'
                                            sx={{
                                                '.MuiFormLabel-asterisk': {
                                                    color: '#B71C1C'
                                                },
                                                '.MuiInputLabel-formControl': {
                                                    fontSize: '14px'
                                                }
                                            }}
                                            variant="outlined"
                                            InputLabelProps={{required: true}}
                                        />
                                    }
                                />
                            </Grid>

                            <Grid item xs={6} md={6} lg={3.5}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    id="proficiency-box"
                                    options={proficiencies}
                                    getOptionLabel={option => option.title ? option.title : ''}
                                    value={input['proficiency'] ? input['proficiency'] : null}
                                    isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                    onChange={(event, value) => {
                                        handleSelectChange(index, value, 'proficiency_id')
                                    }}
                                    renderInput={(params) =>
                                        <StyledTextField
                                            {...params}
                                            fullWidth
                                            label='Proficiency'
                                            sx={{
                                                '.MuiFormLabel-asterisk': {
                                                    color: '#B71C1C'
                                                },
                                                '.MuiInputLabel-formControl': {
                                                    fontSize: '14px'
                                                }
                                            }}
                                            variant="outlined"
                                            InputLabelProps={{required: true}}
                                        />
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} md={5} lg={5} display="flex" alignItems="flex-end" gap={1}>
                                <FormControlLabel
                                    value="1"
                                    control={<Checkbox
                                        size="small"
                                        checked={input['is_read'] ? input['is_read'] : false}
                                        onChange={(event, checked) => {
                                            handleFlexChange(checked, index, 'is_read')
                                        }}
                                    />}
                                    label={index === 0 ? "Read" : ''}
                                    labelPlacement="top"
                                    name="is_read"
                                    sx={{'.MuiTypography-root': {fontSize: '13px'}}}
                                />
                                <FormControlLabel
                                    value="1"
                                    control={<Checkbox
                                        size="small"
                                        checked={input['is_write'] ? input['is_write'] : false}
                                        onChange={(event, checked) => {
                                            handleFlexChange(checked, index, 'is_write')
                                        }}
                                    />}
                                    label={index === 0 ? "Write" : ''}
                                    labelPlacement="top"
                                    name="is_write"
                                    sx={{'.MuiTypography-root': {fontSize: '13px'}}}
                                />
                                <FormControlLabel
                                    value="1"
                                    control={<Checkbox
                                        size="small"
                                        checked={input['is_speak'] ? input['is_speak'] : false}
                                        onChange={(event, checked) => {
                                            handleFlexChange(checked, index, 'is_speak')
                                        }}
                                    />}
                                    label={index === 0 ? "Speak" : ''}
                                    labelPlacement="top"
                                    name="is_speak"
                                    sx={{'.MuiTypography-root': {fontSize: '13px'}}}
                                />
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={selectedValue === index}
                                            size="small"
                                            onChange={(event, checked) => {
                                                setSelectedValue(index)
                                                handleFlexChange(checked, index, 'is_primary')
                                            }}
                                        />
                                    }
                                    label={index === 0 ? "Primary" : ''}
                                    id={`primary-${index}`}
                                    labelPlacement="top"
                                    name="is_primary"
                                    sx={{'.MuiTypography-root': {fontSize: '13px'}, width: '60px'}}
                                />
                                {isShowRemove &&
                                <Tooltip title="Remove" placement="right">
                                    <IconButton color="warning" onClick={() => removeFields(index)}>
                                        <CancelTwoToneIcon/>
                                    </IconButton>
                                </Tooltip>
                                }
                            </Grid>
                        </Grid>
                    )
                })}

                <Grid item xs={12}>
                    <Button startIcon={<AddIcon/>} onClick={handleAddMore}>Add More Language</Button>
                </Grid>

                <Grid item xs={12} md={8} lg={8} xl={8} display="flex">
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        sx={{
                            width: '110px',
                            borderRadius: '10px',
                            background: "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)"
                        }}
                    >
                        Save
                    </LoadingButton>
                </Grid>
            </Grid>
            }
        </Box>
    )
}

export default SeekerLanguageForm;

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E8E8E8',
      },
      '&:hover fieldset': {
        border: '2px solid #E8E8E8',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#195DCC',
      },
    }, '.MuiFormLabel-asterisk': {
      color: '#B71C1C'
  }
}))