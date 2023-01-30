import React, {useEffect, useState} from 'react';
import {Autocomplete, Box, Button, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CompanyDataService from "../../services/companies.services";
import {Link} from "react-router-dom";

const FindAnotherCompany = () => {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        (async () => {
            await CompanyDataService.all().then(r => {
                setCompanies(r.data);
                setLoading(false);
            });
        })()
    }, [])

    const handleCompanyChange = (value) => {
        setSelectedCompany(value);
    }

    return (
        <Box
            sx={{
                backgroundColor: "#E8E8E8",
                borderRadius: "10px",
                mb: 3,
            }}
        >
            <Typography
                sx={{px: 4, pt: 4}}
                style={{
                    ...styles.tabHeader,
                    textDecoration: "underline",
                }}
            >
                Find Another Company
            </Typography>

            <Box sx={{px: 4, pt: 2, pb: 4}}>
                <Grid container spacing={2} alignItems="center" display="flex">
                    <Grid item xs={12} md={9}>
                        {!loading ?
                            <Autocomplete
                                fullWidth
                                disablePortal
                                id="combo-box-demo"
                                options={companies}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '6px',
                                    borderColor: 'white'
                                }}
                                getOptionLabel={option => option.company_name ? option.company_name : ''}
                                isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
                                renderInput={(params) =>
                                    <TextField
                                        fullWidth
                                        {...params}
                                        placeholder="Company"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: <InputAdornment position="start"><SearchOutlinedIcon
                                                color="secondary"/></InputAdornment>, style: {
                                                borderRadius: '5px',
                                                border: 0
                                            }
                                        }}
                                        sx={{
                                            fontSize: '12px',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'white',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'white',
                                                },
                                            },
                                        }}
                                    />}
                                onChange={(event, value) => handleCompanyChange(value)}
                            />
                            : <Typography>Loading...</Typography>}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box
                            display={"flex"}
                            justifyContent="center"
                            sx={{
                                height: "56px",
                            }}
                        >
                            {selectedCompany ? <Link to={`/companies/${selectedCompany.uuid}/details`}>
                                <Button
                                    varient="contained"
                                    size="small"
                                    sx={{
                                        background:
                                            "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                                        color: "#fff",
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        borderRadius: "6px",
                                        px: 5,
                                        py: 2,
                                        width: "100%"
                                    }}
                                >
                                    Search
                                </Button>
                            </Link> : <Button
                                varient="contained"
                                size="small"
                                sx={{
                                    background:
                                        "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                                    color: "#fff",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    borderRadius: "6px",
                                    px: 5,
                                    py: 2,
                                    width: "100%"
                                }}
                            >
                                Search
                            </Button>}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}


export default FindAnotherCompany;


const styles = {
    companyName: {
        fontSize: "24px",
        fontWeight: "500",
        color: "#FFFFF",
        fontStyle: "normal",
    },
    companyInfo: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#FFFFF",
    },
    package: {
        fontSize: "16px",
        fontWeight: " 300",
    },
    text: {
        fontSize: "16px",
        fontWeight: "400",
    },
    tabHeader: {
        fontSize: "20px",
        fontWeight: "500",
    },
    tabContent: {
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
    },
    sideContent: {
        fontSize: "14px",
    },
};