import React, {useEffect, useState} from "react";
import {Box, CardContent, CardMedia, Container, Grid, Pagination, Paper, Skeleton, Stack, Typography, Card} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import ArticleService from "../../services/article.service";
import {useDispatch} from "react-redux";
import {setProgress} from "../../store/slices/progress";
import SEO from "../Common/SEO";

const Articles = () => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const type = useState(1);
    const [apiData, setApiData] = useState('');
    const [dataLimit, setDataLimit] = useState(20);
    const [totalData, setTotalData] = useState(0);

    const [pageNo, setPageNo] = useState(1);
    const [offset, setOffset] = useState(0);
    const url = process.env.REACT_APP_URL;

    useEffect(() => {

        dispatch(setProgress(50));

        (async () => {
            await ArticleService.all({
                limit: dataLimit, offset: offset, type: type
            }).then(res => {
                const metadata = res.metadata;
                setDataLimit(metadata.info.limit)
                setApiData(res.data)
                setTotalData(metadata.info.total)
            })
        })().then(() => dispatch(setProgress(100)));

        // eslint-disable-next-line
    }, [pageNo])

    const pageCount = Math.ceil(totalData / dataLimit);

    const navigate = useNavigate();

    const handleClick = (article) => {
        navigate('/article-details', {state: article});
    }

    const handleChange = (event, value) => {
        setPageNo(value);
        setOffset(value * 20 - 20)
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function format(date) {
        date = new Date(date);

        var day = ('0' + date.getDate()).slice(-2);
        var month = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[month] + ' ' + year;
    }

    return (
        <Container maxWidth="xl">
            <SEO title="Career Resource"/>
            <Grid container px={{lg: '30px', xl: 0}} py={3} minHeight="42.9vh" spacing={3}>
                <Grid item xs={12}>
                    <Typography p={1} sx={{
                        color: "#000000",
                        fontWeight: 600,
                        fontSize: '24px',
                        mb: '12px',
                        background: 'none',
                        textAlign: 'start',
                        lineBreak: 'anywhere'
                    }}>{t('career_programs')}</Typography>
                </Grid>

                {apiData ? apiData.map((article) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={article.uuid} onClick={() => {handleClick(article)}}>
                            <Card elevation={1}
                                sx={{
                                    borderRadius: "5px",
                                    mb: '20px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
                                    }
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={`${url}/storage/articles/${article.image}`}
                                        height="300"
                                        alt="green iguana"
                                        sx={{objectFit: 'cover'}}
                                    />
                                    <CardContent>
                                        <Stack direction="column" spacing={2}>

                                            <Box sx={{minHeight: '85px'}}>
                                                <Typography sx={{textAlign: "start", fontSize: "18px", fontWeight: 600}}>
                                                    {article.name}
                                                </Typography>
                                            </Box>

                                            <Stack direction="row" justifyContent="start" alignItems="center">
                                                <Typography fontSize="12px" fontWeight="500" color="#A1A1A1">
                                                    Posted on&nbsp;{format(article.updated_at)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                            </Card>
                        </Grid>
                    )) :
                    <Grid p={3} item xs={12} sm={6} md={3} lg={3}>
                        <Paper elevation={1} sx={{borderRadius: "26px", mb: '20px'}}>
                            <Stack direction="column" spacing={2} sx={{padding: '16px'}}>

                                <Skeleton variant="rounded" width={'100%'} height={180}/>

                                <Skeleton variant="rounded" width={'100%'} height={30}/>

                                <Skeleton variant="rounded" width={'70%'} height={15}/>
                            </Stack>
                        </Paper>
                    </Grid>
                }

                <Grid item xs={12} sx={{py: 4}}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Pagination count={pageCount} size="medium" variant="outlined" shape="rounded"
                                    onChange={handleChange}/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Articles;