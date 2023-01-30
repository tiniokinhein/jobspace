import React, {useEffect} from 'react';
import {Button, Card, CardMedia, Grid, Link, Typography, Paper, Avatar} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {userActions} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import ReactPlayer from "react-player";

const CompanyInfo = ({data}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_URL;
    const {isLoggedIn} = useSelector((state) => state.auth);
    const [follow, setFollow] = React.useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        if (data.is_followed) {
            setFollow(true);
        } else {
            setFollow(false);
        }
    }, [data, data.is_followed]);

    const handleFollow = () => {
        if (isLoggedIn) {
            const company = [];
            company['company_uuid'] = data.uuid;
            dispatch(userActions.followCompany(company)).then(r => {
                setFollow(!follow);
            });
        } else {
            navigate("/seekers/sign-in");
        }
    }
    const handleUnFollow = () => {
        if (isLoggedIn) {
            const company = [];
            company['company_uuid'] = data.uuid;
            dispatch(userActions.unFollowCompany(company)).then(r => {
                setFollow(!follow);
            });
        } else {
            navigate("/seekers/sign-in");
        }
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                my: '40px',
                padding: {xs: '10px', md: '30px'},
                borderRadius: '7px'
            }}
        >
            <Grid container alignItems="center" spacing={4}>
                <Grid item xs={12} sm={8} md={8}>
                    <Typography sx={{fontSize: '24px', fontWeight: 500}}>
                        <Typography variant="span">About</Typography>&nbsp;
                        <Typography variant="span" color="secondary">{data.company_name}</Typography>
                    </Typography>
                    {data.website && <Typography sx={{fontSize: '14px', fontWeight: 400}}>
                        <Typography variant="span" color="#A1A1A1">Website&nbsp;:&nbsp;</Typography>
                        <Typography variant="span">{data.website}</Typography>
                    </Typography>}
                </Grid>

                <Grid item xs={12} sm={4} md={4} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                    {follow ? <Button
                        variant="contained"
                        onClick={handleUnFollow}
                        sx={{
                            fontSize: '16px',
                            fontWeight: '400',
                            borderRadius: '10px',
                            width: "100%",
                            background: 'linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)',
                        }}
                    >
                        {/* Follow the company */}
                        {t('unfollow_company')}
                    </Button> : <Button
                        variant="contained"
                        onClick={handleFollow}
                        sx={{
                            fontSize: '16px',
                            fontWeight: '400',
                            borderRadius: '10px',
                            width: "100%",
                            background: 'linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)',
                        }}
                    >
                        {/* Follow the company */}
                        {t('follow_company')}
                    </Button>}
                </Grid>

                <Grid item xs={12}>
                    <Typography fontSize="14px" fontWeight={400}>{data.about_us}</Typography>
                </Grid>

                {data.job_count > 1 && <Grid item xs={12} alignItems="center" justifyContent="flex-end" display="flex">
                    <Typography sx={{fontSize: '14px', fontWeight: 400}}>
                        <Link component={RouterLink} to={`/companies/${data.uuid}/details#Jobs`} underline="always"
                              color="primary">
                            More {data.job_count - 1} Open Jobs from this employer
                        </Link>
                    </Typography>
                </Grid>}

                {data.company_images &&
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            {data.company_images.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.uuid}>
                                    <Card elevation={0}>
                                        <Avatar
                                            variant="rounded"
                                            alt={item.name ?? 'Title'}
                                            src={`${url}/storage/employerImage/${item.image}`}
                                            sx={{ width: {xs: 300, sm: 345, md: 335}, height: 188 }}
                                            loading="lazy"
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                }

                {data.company_videos && <Grid item xs={12}>
                    {data.company_videos.map((item) => (
                        <Grid item xs={12} key={item.uuid}>
                            <Card>
                                <CardMedia>
                                    <ReactPlayer
                                        url={item.url}
                                        width="100%"
                                        height="357px"
                                    />
                                </CardMedia>
                            </Card>
                        </Grid>
                    ))}
                </Grid>}
            </Grid>
        </Paper>
    )
}

export default CompanyInfo;