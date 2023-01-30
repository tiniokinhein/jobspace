import React, {useEffect, useState} from 'react';
import {Avatar, Box, Card, CardActionArea, Grid, Stack, Typography} from '@mui/material';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CompanyJobPostDataService from "../../services/company.job.post.service";
import {Link as RouterLink} from 'react-router-dom';
import StyledPagination from "../Common/StyledPagination";

const CompanyJob = ({companies, borderRadius = true}) => {
    const limit = 10;
    const url = process.env.REACT_APP_URL;
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState([]);
    const [showPagination, setShowPagination] = useState(false);
    const [count, setCount] = useState(0);
    const [pageCnt, setPageCnt] = useState(1);

    useEffect(() => {
        (async () => {
            if (companies.uuid) {
                const params = requestParams(limit, pageCnt);
                await CompanyJobPostDataService.all(companies.uuid, params).then(r => {
                    const limit = r?.metadata.info?.limit;
                    const total = r?.metadata.info?.total;
                    setJobPosts(r?.data);
                    setCount(Math.ceil(total / limit));
                    if (total > limit) {
                        setShowPagination(true)
                    }
                })
            }
        })().then(() => setLoading(false))
    }, [companies.uuid, pageCnt]);

    const requestParams = (limit, pageCnt) => {
        let params = {};

        if (limit) {
            params['limit'] = limit;
        }

        if (pageCnt) {
            params['offset'] = (pageCnt - 1) * limit;
        }

        return params;
    }

    const handlePageChange = (event, value) => {
        setPageCnt(value);
    }

    return (
        <Box
            sx={{
                p: {xs: 1, sm: 3},
                borderRadius: borderRadius ? '10px' : '0',
                boxShadow: borderRadius ? '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)' : '0',
                backgroundColor: 'white',
                width: '100%'
            }}
        >
            {(!loading) &&
            jobPosts.length > 0 ?
                <Grid container mb={1} spacing={3}>
                    {jobPosts.map((item) => (
                        <Grid item xs={12} sm={12} md={6} key={item.uuid}>
                            <Card
                                elevation={1}
                                sx={{
                                    borderRadius: "10px",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                }}
                            >
                                <CardActionArea component={RouterLink} to={`/jobs/${item.uuid}/detail`}>
                                    <Grid container spacing={2} paddingX={2}>
                                        <Grid item xs={4} md={4} display={'flex'} justifyContent={'center'}
                                              alignItems={'center'}>
                                            <Box sx={{width: '110px', minHeight: '80px', maxHeight: '110px'}}>
                                                <Card elevation={0} sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Avatar
                                                        sx={{
                                                            background: '#FFFFFF',
                                                            width: '100px',
                                                            height: '100px',
                                                            borderRadius: '4px'
                                                        }}
                                                        variant="square"
                                                        src={`${url}/storage/logo/${item.company.logo}`}
                                                    />
                                                </Card>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={8} md={8}>
                                            <Stack
                                                direction={"row"}
                                                alignItems="center"
                                                justifyContent="space-between"
                                                sx={{py: 3}}
                                                maxHeight="167px"
                                                minHeight="167px"
                                            >
                                                <Box sx={{ maxWidth: "90%" }}>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "500",
                                                            color: "#000000",
                                                            fontSize: "20px",
                                                            maxHeight: '90px',
                                                            overflow: 'hidden',
                                                            maxWidth: '100%'
                                                        }}
                                                        noWrap={true}
                                                    >
                                                        {item.job_title}
                                                    </Typography>
                                                    {(item.region?.title || item.township?.title) &&
                                                        <Typography
                                                            sx={{
                                                                color: "#A1A1A1",
                                                                fontSize: "14px",
                                                                fontWeight: "400",
                                                                lineHeight: "20px",
                                                            }}
                                                        >
                                                            {item.township?.title} | {item.region?.title}
                                                        </Typography>
                                                    }
                                                </Box>
                                                <ArrowForwardIosIcon
                                                    sx={{
                                                        color: "#000000",
                                                        fontWeight: "200",
                                                    }}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}

                    {showPagination &&
                        <Grid item xs={12}>
                            <Box justifyItems="right" display="flex" justifyContent="right">
                                <StyledPagination
                                    count={count}
                                    pageCnt={pageCnt}
                                    handlePageChange={handlePageChange}
                                />
                            </Box>
                        </Grid>
                    }
                </Grid> :
                <Grid item xs={12}>
                    <Typography variant="h6">There is no data.</Typography>
                </Grid>
            }
        </Box>
    )
}

export default CompanyJob;