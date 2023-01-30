import React, {useState} from 'react';
import {FormControl, FormHelperText, IconButton, OutlinedInput, InputAdornment, InputLabel} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const PasswordControl = ({props, errors, register, message}) => {

    const [values, setValues] = useState({
        value: '', showValue: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowValue = () => {
        setValues({
            ...values,
            showValue: !values.showValue,
        });
    };

    const handleMouseDownValue = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor={`standard-adornment-${props.id}`} color="grey" error={errors}>
                {props.title}&nbsp;<span className="error">&lowast;</span>
            </InputLabel>
            <OutlinedInput
                required
                size="large"
                name={props.name}
                id={`standard-adornment-${props.id}`}
                onChange={handleChange(`${props.name}`)}
                type={values.showValue ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowValue}
                            onMouseDown={handleMouseDownValue}
                        >
                            {values.showValue ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </IconButton>
                    </InputAdornment>
                }
                label={props.title}
                error={errors}
                {...register}
            />
            <FormHelperText error={errors}>{message}</FormHelperText>
        </FormControl>
    );
}

export default PasswordControl;