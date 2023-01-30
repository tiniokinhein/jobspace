import React, {useEffect} from 'react';
import {Box, FormControlLabel, FormLabel, Link, Radio, RadioGroup, FormControl} from "@mui/material";
import {useTranslation} from "react-i18next";

const defaultLimit = 4;

const FilterRadioGroup = ({data, cnt, name, changeItem, type, checked, show}) => {

    const {t} = useTranslation();
    const [showLess, setShowLess] = React.useState(false);
    const [sliceNumber, setSliceNumber] = React.useState(defaultLimit);

    let sliceNo = sliceNumber < (data.length);

    const handleIncSlice = () => {
        setSliceNumber(cnt);
        setShowLess(true);
    }

    const handleRedSlice = () => {
        setSliceNumber(defaultLimit);
        setShowLess(false);
    }

    useEffect(() => {
        setShowLess(show)
    }, [show])

    return (
        <Box padding="19px 16px">
            <FormControl fullWidth>
                <FormLabel id="industry-radio-buttons-group-label"
                           sx={{fontWeight: 500, pb: '13px', color: '#333333'}}>{t(name)}</FormLabel>
                <RadioGroup aria-labelledby="industry-radio-buttons-group-label"
                            name="industry-radio-buttons-group">
                    {
                        data.length > 0 && data.slice(0, sliceNumber).map(item => (
                            <FormControlLabel
                                key={item.uuid}
                                value={item.uuid}
                                control={
                                    <Radio
                                        size="small"
                                        name={item.title}
                                        checked={checked.includes(item)}
                                        onChange={() => changeItem(item, type)}
                                    />
                                }
                                label={item.title}
                                sx={{
                                    '.MuiFormControlLabel-label': {
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        color: '#333333',
                                        padding: '3px'
                                    },
                                }}
                            />
                        ))
                    }
                </RadioGroup>
            </FormControl>

            {
                data.length > 0 && sliceNo && !showLess ?
                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Link align="right" sx={{fontSize: '12px', color: 'primary'}} underline="none"
                              onClick={handleIncSlice}>&#x2B;&nbsp;{cnt}&nbsp;More</Link>
                    </Box> : null
            }

            {
                data.length > 0 && showLess ?
                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Link align="right" sx={{fontSize: '12px', color: 'primary'}} underline="none"
                              onClick={handleRedSlice}>&#x2212;&nbsp;Show&nbsp;Less</Link>
                    </Box> : null
            }
        </Box>
    );
}

export default FilterRadioGroup;