import React, {useCallback, useEffect, useState} from "react";
import {Box, Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {testimonialActions} from "../../store";
import {setProgress} from "../../store/slices/progress";
import TestimonialService from "../../services/testimonial.service";

const Testimonials = () => {

    const dispatch = useDispatch();

    const [testimonials, setTestimonials] = useState([]);

    const initFetch = useCallback(() => {
        dispatch(testimonialActions.getAll())
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            dispatch(setProgress(50))
            await TestimonialService.all().then(r => setTestimonials(r.data));
            dispatch(setProgress(100))
        })()
        // eslint-disable-next-line
    }, [initFetch])

    const url = process.env.REACT_APP_URL;

    return (
        <Container maxWidth="xl">
            <Grid container py={3} px={{sm: '30px', md: '30px', lg: '76px', xl: 0}}>
                <Grid item xs={12}>
                    <Typography p={1} sx={{
                        color: "#000000",
                        fontWeight: 600,
                        fontSize: '24px',
                        mb: '8px',
                        background: 'none',
                        lineBreak: 'anywhere'
                    }}>Testimonials</Typography>
                </Grid>
                {testimonials.length > 0 && testimonials.map((testimonial) => (
                    <Grid item xs={12} md={6} lg={6} p={3} key={testimonial.uuid}>
                        <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent sx={{flex: '1 0 auto'}}>
                                    <Typography component="div" mb={2} sx={{fontSize: '18px', fontWeight: 500}}>
                                        {testimonial.title}
                                    </Typography>
                                    <Typography color="text.secondary" component="div" sx={{fontSize: '14px'}}>
                                        {testimonial.description}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardMedia
                                sx={{display: {xs: 'none', md: 'block'}}}
                            >
                                <Card sx={{
                                    width: 200,
                                    height: 300,
                                    boxShadow: 'none',
                                    borderRadius: '0px',
                                    position: 'relative'
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            objectFit: 'contain',
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                            margin: 'auto',
                                        }}
                                        image={`${url}/storage/testimonials/` + testimonial.image}
                                        alt={testimonial.title}
                                    />
                                </Card>
                            </CardMedia>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Testimonials;