import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, Grid, Tooltip, Autocomplete, styled, TextField, IconButton, Alert} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import {seekerSkillActions} from "../../../store";
import ProficiencyDataService from "../../../services/proficiency.service";
import SkillDataService from "../../../services/skill.service";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const SeekerSkillForm = ({addMore}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [skills, setSkills] = useState([{}]);
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [proficiencies, setProficiencies] = useState([{}]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [inputFields, setInputFields] = useState([
        {skill_id: '', proficiency_id: ''}
    ]);

    const retrieveSeekerSkills = useCallback(() => {
        dispatch(seekerSkillActions.get()).then(r => {
            if (r.payload.length > 0) {
                let fields;

                fields = r.payload.map((item) => {
                    return {
                        skill_id: item.skill?.uuid,
                        proficiency_id: item.proficiency?.uuid,
                        skill: item.skill,
                        proficiency: item.proficiency
                    }
                })

                setInputFields(fields)

                if (fields.length > 1) {
                    setIsShow(true);
                }
            }

            setLoading(false);
        })
    }, [dispatch])

    useEffect(() => {
        if (! addMore) {
            retrieveSeekerSkills()
        } else {
            setLoading(false);
        }

    }, [addMore, retrieveSeekerSkills])

    useEffect(() => {
        (async () => {
            await ProficiencyDataService.getSkillProficiencies().then(r => {
                setProficiencies(r.data ?? {})
            });

            await SkillDataService.get().then(r => {
                setSkills(r.data ?? {})
            });
        })();
    }, []);

    const handleFormChange = (index, value, name) => {
        let data = [...inputFields];

        data[index][name] = value.uuid;

        if (name === 'skill_id') {
            data[index]['skill'] = value
        }

        if (name === 'proficiency_id') {
            data[index]['proficiency'] = value
        }

        setInputFields(data);
    }

    const handleAddMore = () => {
        let newfield = {skill_id: '', proficiency_id: ''}

        setInputFields([...inputFields, newfield])
        setIsShow(true);
    }

    const removeFields = (index) => {
        let data = [...inputFields];

        data.splice(index, 1)

        setInputFields(data)

        if (data.length === 1) {
            setIsShow(false)
        }
    }

    const onSubmit = (e) => {

        const isNew = addMore ? 1 : 0;

        setIsSubmitting(true);

        e.preventDefault();

        setShowError(false);

        dispatch(seekerSkillActions.create({"skills": inputFields, 'is_new': isNew})).then(r => {
            setIsSubmitting(false);

            if (r.error) {
                setShowError(true)
            } else {
                navigate('/seekers/skills')
            }
        })
    }

    return (
        <>
            {!loading &&
            <Box
                component="form"
                autoComplete="off"
                onSubmit={onSubmit}
            >
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
                            <Grid container item xs={12} md={8} lg={8} xl={8} spacing={2} key={index}
                                  justifyContent="space-between" display="flex">
                                <Grid item xs={12} md={5.5}>
                                    <Autocomplete
                                        fullWidth
                                        disablePortal
                                        disableClearable
                                        id="skill_id"
                                        options={skills}
                                        value={input['skill'] ? input['skill'] : null}
                                        getOptionLabel={option => option.title ? option.title : ''}
                                        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                        onChange={(event, value) => {
                                            handleFormChange(index, value, 'skill_id')
                                        }}
                                        renderInput={(params) =>
                                            <StyledTextField
                                                {...params}
                                                fullWidth
                                                label='Skill'
                                                sx={{
                                                    '.MuiInputLabel-formControl': {
                                                        fontSize: '14px'
                                                    },
                                                    '.MuiFormLabel-asterisk': {
                                                        color: '#B71C1C'
                                                    },
                                                }}
                                                variant="outlined"
                                                name="skill_id"
                                                required
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={5.5}>
                                    <Autocomplete
                                        fullWidth
                                        disablePortal
                                        disableClearable
                                        id="proficiency_id"
                                        options={proficiencies}
                                        value={input['proficiency'] ? input['proficiency'] : null}
                                        getOptionLabel={option => option.title ? option.title : ''}
                                        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                        onChange={(event, value) => {
                                            handleFormChange(index, value, 'proficiency_id')
                                        }}
                                        renderInput={(params) =>
                                            <StyledTextField
                                                {...params}
                                                fullWidth
                                                label='Proficiency'
                                                sx={{
                                                    '.MuiInputLabel-formControl': {
                                                        fontSize: '14px'
                                                    },
                                                    '.MuiFormLabel-asterisk': {
                                                        color: '#B71C1C'
                                                    },
                                                }}
                                                variant="outlined"
                                                name="proficiency_id"
                                                required
                                            />
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} md={1} display="flex" justifyContent="flex-end"
                                      alignItems="flex-end">
                                    {isShow &&
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

                    <Grid container item xs={12} md={8} lg={8} xl={8}
                          justifyContent="space-between" display="flex">
                        <Grid item xs={12} md={5.5}>
                            <Button
                                variant="text"
                                startIcon={<AddIcon/>}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400
                                }}
                                onClick={handleAddMore}
                            >
                                Add More Skills
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={5.5} display="flex" justifyContent="flex-end">
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

                        {!isShow && <Grid item xs={12} md={1}/>}
                    </Grid>
                </Grid>
            </Box>
            }
        </>
    );
}

export default SeekerSkillForm;

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