import React, {useEffect, useState} from 'react';
import {Box, Card, CardMedia, Container, Grid} from "@mui/material";
import AdDataService from "../../services/ad.service";

const TopAd = () => {

    const [ad, setAd] = useState({});

    useEffect(() => {
        (async () => {
            await AdDataService.get('/fourth-ad').then(r => setAd(r.data));
        })();
    }, [])

    return (
        <>
            {Object.keys(ad).length > 0 &&
                <Grid item xs={12}>
                    <Container maxWidth="xl">
                        <Box
                            minHeight="246px"
                            maxHeight="246px"
                            justifyContent="center"
                            alignItems="center"
                            display="flex"
                        >
                            {
                                ad.type === 1 ?
                                    <Card
                                        elevation={0}
                                        variant="outlined"
                                        sx={{
                                            maxHeight: '211',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                objectFit: 'fill',
                                                borderRadius: '5px'
                                            }}
                                            width="100%"
                                            height="211"
                                            image={ad.file ?? '#'}
                                            alt="ADS"
                                        />
                                    </Card> :
                                    <Card
                                        elevation={0}
                                        variant="outlined"
                                        sx={{
                                            maxHeight: '211px',
                                            padding: '5px'
                                        }}
                                    >
                                        <CardMedia
                                            component="video"
                                            sx={{
                                                objectFit: 'fill',
                                                borderRadius: '5px'
                                            }}
                                            width="100%"
                                            image={ad.file ?? '#'}
                                            alt="ADS"
                                        />
                                    </Card>
                            }
                        </Box>
                    </Container>
                </Grid>
            }
        </>
    )
}

export default TopAd;