import React, {Fragment, useEffect, useState} from 'react';
import AdDataService from "../../../services/ad.service";
import {Card, CardMedia, Grid} from "@mui/material";

const BannerAd = () => {

    const [bannerAd, setBannerAd] = useState({});

    useEffect(() => {
        (async () => {
            await AdDataService.get('/banner-ad').then(r => setBannerAd(r.data))
        })();
    }, [])

    return (
        <Fragment>
            {Object.keys(bannerAd).length > 0 &&
                <Grid
                    item
                    xs={12}
                    display="flex"
                    px={{lg: '30px', xl: 0}}
                    width="100%"
                    marginBottom={3}
                >
                    <Card
                        elevation={0}
                        sx={{
                            minHeight: '100px',
                            maxHeight: '320px',
                            width: '100%',
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={bannerAd.file ?? '#'}
                            sx={{
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                            alt="banner"
                        />
                    </Card>
                </Grid>
            }
        </Fragment>
    );
}

export default BannerAd;