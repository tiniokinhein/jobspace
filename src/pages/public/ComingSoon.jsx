import {Box, Typography, Grid, Card, CardMedia} from "@mui/material";
import React from "react";
import RocketGif from "../../assets/images/rocket.gif";

function ComingSoon() {
    return (
            <Box height={'100%'} 
                py={3} 
                px={{sm: '30px', md: '30px', lg: '76px', xl: 0}} 
                sx={{
                    backgroundColor: '#FFFFFF',
                    top: 0, 
                    right: 0,
                    position: 'absolute',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                    }}
            >
                <Grid container spacing={2} py={5} my={8}>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'start'}>
                        <Card elevation={0} sx={{minWidth: {xs: 300, sm: 400}}}>
                            <CardMedia
                                component="img"
                                image={RocketGif}
                                alt="Rocket Gif"
                                sx={{height: {xs: 200, sm: 300}}}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography fontSize={{xs: 20, sm: 40}} align={'center'}>
                            <span className="primary-gradient-text">Great things coming soon</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Typography fontSize={{xs: 12, sm: 16}} fontWeight={400} align={'center'}>
                            We are a small and growing consulting firm with big ideas!
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
    );
}

export default ComingSoon;
