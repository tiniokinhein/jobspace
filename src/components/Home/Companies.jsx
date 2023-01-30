import React, {useCallback, useEffect, useState} from "react";
import {Avatar, Box, Container, Link, Paper, Skeleton, Stack, Typography, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {companiesActions} from "../../store";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {setProgress} from "../../store/slices/progress";
import SEO from "../Common/SEO";
import DFlogo from '../../assets/images/default-company-logo.jpg'

const Companies = () => {

    const {t} = useTranslation();

    const url = process.env.REACT_APP_URL;
    const dispatch = useDispatch();

    const {companies} = useSelector(x => x.companies);

    const [loading, setLoading] = useState(true);

    const initFetch = useCallback(() => {
        dispatch(companiesActions.getAll()).then(() => {
            setLoading(false)
            dispatch(setProgress(100));
        });
    }, [dispatch]);

    useEffect(() => {
        dispatch(setProgress(50))

        initFetch()
        // eslint-disable-next-line
    }, [initFetch])

    return (
        <Container maxWidth="xl">
            <SEO title="All Hiring Companies"/>
            <Grid container px={{lg: '30px', xl: 0}} py={3} minHeight="42.9vh" spacing={3}>
                <Grid item xs={12}>
                    <Typography p={1} sx={{
                        color: "#000000",
                        fontWeight: 600,
                        fontSize: '24px',
                        mb: '8px',
                        background: 'none',
                        lineBreak: 'anywhere'
                    }}>{t('companies')}</Typography>
                </Grid>

                {companies.length > 0 && companies.map((company) => (
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={2} key={company.uuid}>
                        <Link component={RouterLink} to={`/companies/${company.uuid}/details`} underline="none"
                              key={company.uuid}>
                            <Paper elevation={1}
                                   sx={{
                                       marginBottom: '20px',
                                       border: 'none',
                                       padding: '20px',
                                       borderRadius: '8px',
                                       '&:hover': {
                                           boxShadow: "rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px",
                                       },
                                   }}
                            >
                                <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        {loading ?
                                            <Skeleton variant="circular" width={100} height={100}/> :
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={company.logo ? `${url}/storage/logo/${company.logo}` : DFlogo}
                                                sx={{width: 100, height: 100, border: '1px solid #C4C4C4'}}
                                            />
                                        }
                                    </Stack>
                                
                                    {loading ? <Skeleton variant="rounded" width={120} height={12} /> :
                                        <Box sx={{minHeight: '45px'}}>
                                            <Typography sx={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textAlign: 'center',
                                            }}>{company.company_name}</Typography>
                                        </Box>
                                    }

                                    {loading ?
                                        <Skeleton variant="rounded" width={90} height={10} /> :
                                        <Box sx={{minHeight: '40px'}}>
                                            <Typography sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                textAlign: 'center',
                                                color: "#A1A1A1"
                                            }}>{company.industry ? `(${company.industry?.title})` : null}</Typography>
                                        </Box>
                                    }
                                </Stack>
                            </Paper>
                        </Link>
                    </Grid>
                ))}

            </Grid>
        </Container>
    );

}

export default Companies;