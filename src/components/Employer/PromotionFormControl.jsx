import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Divider, FormControl, FormControlLabel,
    FormLabel,
    Grid, Radio, RadioGroup,
    Stack,
    SvgIcon,
    TextField,
    Typography,
    styled
} from "@mui/material";
import WarnBlockQuote from "./WarnBlockQuote";
import {ReactComponent as PrimaryRocketIcon} from "../../assets/icons/secondary_rocket.svg";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

const PromotionFormControl = ({
    handleSubmit,
    onSubmit,
    formDisable,
    imagePreview,
    showWarning,
    abilityOpen,
    handleFileChange,
    errors,
    isSubmitting,
    register,
    ability,
    setType,
}) => {
    const [mediaType, setMediaType] = useState('1');

    const handleTypeChange = (event) => {
        setType(event.target.value);
        setMediaType(event.target.value);
    };

    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column'}}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid
                container
                direction='row'
                justifyContent='start'
                alignItems='center'
                sx={{
                    px: 4,
                    py: 3
                }}
                spacing={3}
            >
                <Grid item xs={12} md={8} lg={8} xl={8}>
                    <WarnBlockQuote
                        companyWarning={showWarning}
                        abilityWarning={abilityOpen}
                        ability={ability}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{mb: 2}}>
                    <StyleTextField
                        error={!!errors.title}
                        fullWidth
                        required
                        label='Title'
                        sx={{
                            '.MuiInputLabel-formControl': {
                                fontSize: '14px',
                            }
                        }}
                        variant="outlined"
                        InputLabelProps={{required: true}}
                        {...register('title')}
                        helperText={errors.title?.message}
                        disabled={formDisable}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={8} xl={8}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Media Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="type-radio-buttons-group-label"
                            name="type"
                            value={mediaType}
                            onChange={handleTypeChange}
                        >
                            <FormControlLabel value="1" control={<Radio disabled={formDisable}/>} label="Photo" />
                            <FormControlLabel value="2" control={<Radio disabled={formDisable}/>} label="Video" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {mediaType === '1' &&
                    <Grid item xs={12} md={8} lg={8} xl={8}>
                        <Box mb={3}>
                            {imagePreview ?
                                <Card
                                    sx={{
                                        maxWidth: '280px',
                                        maxHeight: '200px',
                                        minWidth: '280px',
                                        minHeight: '200px',
                                    }}
                                    elevation={1}
                                >
                                    <CardMedia
                                        component="img"
                                        image={imagePreview}
                                        alt="image preview"
                                        sx={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                </Card> :
                                <Card
                                    sx={{
                                        maxWidth: '280px',
                                        maxHeight: '200px',
                                        minWidth: '280px',
                                        minHeight: '200px',
                                    }}>
                                </Card>
                            }
                        </Box>

                        <Button
                            color="secondary"
                            aria-label="upload picture"
                            component="label"
                            sx={{
                                mb: '5px',
                                background: '#E9E9E9',
                                paddingX: 3.6
                            }}
                            disabled={formDisable}
                        >
                            <input hidden accept="image/*" type="file" onChange={handleFileChange}/>
                            <Stack direction="row" display="flex" alignContent="center" alignItems="center"
                                   spacing={1}>
                                <SvgIcon fontSize="1.2rem"><PrimaryRocketIcon width="100%" height="100%"/></SvgIcon>
                                <Typography sx={{
                                    color: '#585858',
                                    fontSize: '12px',
                                    fontWeight: 400
                                }}
                                >
                                    Choose Image
                                </Typography>
                            </Stack>
                        </Button>

                        {!!errors.image &&
                            <Typography
                                fontSize="12px"
                                color="error"
                                component="span"
                            >
                                {errors.image?.message}
                            </Typography>
                        }

                        <Divider/>

                        <Typography fontSize="12px" component="span" color="#525252">
                            Recommended image size - 800 x 500 pixels
                        </Typography>
                    </Grid>
                }

                {mediaType === '2' &&
                    <Grid item xs={12} md={8} lg={8} sx={{mb: 2}}>
                        <StyleTextField
                            error={!!errors.video_link}
                            fullWidth
                            label='Video Link'
                            sx={{
                                '.MuiInputLabel-formControl': {
                                    fontSize: '14px',
                                }
                            }}
                            variant="outlined"
                            InputLabelProps={{required: true}}
                            {...register('video_link')}
                            helperText={errors.video_link?.message}
                            disabled={formDisable}
                        />
                    </Grid>
                }

                <Grid item xs={12} md={8} lg={8} sx={{mb: 2}}>
                    <StyleTextField
                        error={!!errors.remark}
                        fullWidth
                        label='Remark'
                        sx={{
                            '.MuiInputLabel-formControl': {
                                fontSize: '14px',
                            }
                        }}
                        multiline
                        minRows={1}
                        maxRows={3}
                        variant="outlined"
                        {...register('remark')}
                        helperText={errors.remark?.message}
                        disabled={formDisable}
                    />
                </Grid>

                <Grid item xs={12} md={8} lg={8} sx={{mb: 2}}>
                    {
                        isSubmitting ?
                            <LoadingButton
                                loading
                                fullWidth
                                loadingPosition="start"
                                color='secondary'
                                variant='contained'
                                startIcon={<SaveIcon/>}
                                sx={{
                                    width: '110px',
                                    borderRadius: '10px'
                                }}
                                disabled={formDisable}
                            >
                                Uploading...
                            </LoadingButton> :
                            <Button
                                fullWidth
                                color='secondary'
                                variant='contained'
                                type="submit"
                                sx={{
                                    width: '110px',
                                    borderRadius: '10px'
                                }}
                                disabled={formDisable}
                            >
                                Upload
                            </Button>
                    }
                </Grid>
            </Grid>
        </Box>
    );
}

export default PromotionFormControl;

const StyleTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E8E8E8 !important',
      },
      '&:hover fieldset': {
        border: '2px solid #E8E8E8',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#195DCC !important',
      },
    }, '.MuiFormLabel-asterisk': {
      color: '#B71C1C'
  }
}))