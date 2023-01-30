import React, {useEffect, useState} from 'react';
import {Box, FormControl, FormControlLabel, FormLabel, Link, Paper, Radio, RadioGroup, Stack} from "@mui/material";
import JobCategoryDataService from "../../services/job.category.service";
import IndustryDataService from "../../services/industry.service";
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

const defaultLimit = 4;

const JobFilter = ({changeItem, checked}) => {

    const {t} = useTranslation();
    const location = useLocation();
    const [catTotCnt, setCatTotCnt] = useState();
    const [indTotCnt, setIndTotCnt] = useState();
    const [categories, setCategories] = useState({});
    const [industries, setIndustries] = useState({});
    const [showCatLess, setShowCatLess] = useState(false);
    const [showIndLess, setShowIndLess] = useState(false);
    const query = new URLSearchParams(location.search);
    const catId = query.get('catId') ?? null;
    const indId = query.get('indId') ?? null;

    const [catSliceNo, setCatSliceNo] = useState(defaultLimit);
    const [indSliceNo, setIndSliceNo] = useState(defaultLimit);

    const catSlice = catSliceNo < (categories.length);
    const indSlice = indSliceNo < (industries.length);

    const handleIndIncSlice = () => {
        setIndSliceNo(indTotCnt);
        setShowIndLess(true);
    }

    const handleIndRedSlice = () => {
        setIndSliceNo(defaultLimit);
        setShowIndLess(false);
    }

    const handleCatIncSlice = () => {
        setCatSliceNo(indTotCnt);
        setShowCatLess(true);
    }

    const handleCatRedSlice = () => {
        setCatSliceNo(defaultLimit);
        setShowCatLess(false);
    }

    useEffect(() => {
        (async () => {
            await JobCategoryDataService.get().then(r => {
                setCategories(r.data);
                setCatTotCnt(r.metadata.info?.total);
            });

            await IndustryDataService.all().then(r => {
                setIndustries(r.data);
                setIndTotCnt(r.metadata.info?.total);
            });
        })();

        if (catId) {
            setShowCatLess(true);
            setCatSliceNo(categories.length);
        }

        if (indId) {
            setShowIndLess(true);
            setIndSliceNo(industries.length);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Paper
            elevation={1}
            sx={{
                borderRadius: '10px',
                alignItems: 'center',
                display: 'flex'
            }}
        >
            <Stack spacing={0}>
                <Box padding="19px 16px">
                    <FormControl fullWidth>
                        <FormLabel id="industry-radio-buttons-group-label"
                                   sx={{fontWeight: 500, pb: '13px', color: '#333333'}}>{t("job_industry")}</FormLabel>
                        <RadioGroup aria-labelledby="industry-radio-buttons-group-label"
                                    name="industry-radio-buttons-group">
                            {
                                industries.length > 0 && industries.slice(0, indSliceNo).map(item => (
                                    <FormControlLabel
                                        key={item.uuid}
                                        value={item.uuid}
                                        control={
                                            <Radio
                                                size="small"
                                                name={item.title}
                                                checked={checked.some(value => value.uuid === item.uuid)}
                                                onChange={() => changeItem(item, 1)}
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
                        industries.length > 0 && indSlice && !showIndLess ?
                            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                                <Link align="right" sx={{fontSize: '12px', color: 'primary'}} underline="none"
                                      onClick={handleIndIncSlice}>&#x2B;&nbsp;{indTotCnt}&nbsp;More</Link>
                            </Box> : null
                    }
                    {
                        industries.length > 0 && showIndLess ?
                            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                                <Link align="right" sx={{fontSize: '12px', color: 'primary'}} underline="none"
                                      onClick={handleIndRedSlice}>&#x2212;&nbsp;Show&nbsp;Less</Link>
                            </Box> : null
                    }

                    <FormControl fullWidth>
                        <FormLabel id="category-radio-buttons-group-label"
                                   sx={{fontWeight: 500, pb: '13px', color: '#333333'}}>{t("job_category")}</FormLabel>
                        <RadioGroup aria-labelledby="category-radio-buttons-group-label"
                                    name="category-radio-buttons-group">
                            {
                                categories.length > 0 && categories.slice(0, catSliceNo).map(item => (
                                    <FormControlLabel
                                        key={item.uuid}
                                        value={item.uuid}
                                        control={
                                            <Radio
                                                size="small"
                                                name={item.title}
                                                checked={checked.some(value => value.uuid === item.uuid)}
                                                onChange={() => changeItem(item, 2)}
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
                        categories.length > 0 && catSlice && !showCatLess ?
                            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                                <Link align="right" sx={{fontSize: '12px', color: 'primary'}} underline="none"
                                      onClick={handleCatIncSlice}>&#x2B;&nbsp;{catTotCnt}&nbsp;More</Link>
                            </Box> : null
                    }
                    {
                        categories.length > 0 && showCatLess ?
                            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                                <Link align="right" sx={{fontSize: '12px', color: 'primary'}} underline="none"
                                      onClick={handleCatRedSlice}>&#x2212;&nbsp;Show&nbsp;Less</Link>
                            </Box> : null
                    }
                </Box>
            </Stack>
        </Paper>
    )
};

export default JobFilter;