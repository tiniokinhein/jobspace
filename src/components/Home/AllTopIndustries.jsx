import React, {useEffect, useState} from "react";
import {Avatar, Container, Link, Stack, Typography, Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import TitleComponent from "../Common/TitleComponent";
import TopIndustryService from "../../services/top.industry.service";
import {setProgress} from "../../store/slices/progress";
import {useNavigate} from "react-router-dom";

const AllTopIndustries = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [topIndustries, setTopIndustries] = useState([])

    useEffect(() => {
        (async () => {
            dispatch(setProgress(50))
            await TopIndustryService.all().then(r => {
                setTopIndustries(r.data)
            })
        })().then(() => dispatch(setProgress(100)))

        // eslint-disable-next-line
    }, [])

    console.log(topIndustries.length);

    const handleClick = (uuid) => {
        navigate(`/find-jobs/?indId=${uuid}`, {replace: true});
    }

    return (
        <Container maxWidth="xl">
            <Grid container px={{lg: '30px', xl: 0}} py={3} minHeight="42.9vh">
                <Grid item xs={12} mb={'20px'} display="flex">
                    <TitleComponent title="top_industry"/>
                </Grid>
                {topIndustries.length > 0 && topIndustries.map((topIndustry) => (
                    <Grid item key={topIndustry.uuid} xs={6} sm={4} md={2} lg={2}>
                        <Stack direction="column" justifyItems="center" alignItems="center"
                                spacing={{sm: 3, md: 4}} minWidth="100px" sx={{paddingBottom: '24px'}}>
                            <Avatar
                                sx={{
                                    bgcolor: '#00A0DC',
                                    width: 110,
                                    height: 110,
                                    '&:hover': {
                                        boxShadow: 5
                                    }
                                }}
                            >
                                <Avatar
                                    sx={{bgcolor: '#EAF2F4', width: 100, height: 100, color: '#195DCC', boxShadow: 2}}
                                >
                                    <img src={topIndustry.image ?? null} alt="industry" width="40px" height="40px"/>
                                </Avatar>
                            </Avatar>
                            <Link
                                underline="none"
                                width='130px'
                                sx={{
                                    "&:hover": {
                                        fontWeight: 400,
                                        cursor: 'pointer'
                                    },
                                    fontWeight: 300,
                                    color: 'black'
                                }}
                                onClick={() => handleClick(topIndustry?.uuid)}
                            >
                                <Typography fontWeight="inherit" align="center"
                                            fontSize={14}>{topIndustry.title}</Typography>
                            </Link>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AllTopIndustries