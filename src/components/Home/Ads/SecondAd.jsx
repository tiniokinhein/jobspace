import React from 'react';
import {Box, Card, CardMedia} from "@mui/material";

const SecondAd = ({data}) => {
    return (
        <React.Fragment>
            {Object.keys(data).length > 0 &&
                <Box maxHeight="469px">
                    {data.type === 2 ?
                        <Card
                            elevation={2}
                            sx={{
                                maxHeight: '400px',
                                borderRadius: '10px',
                            }}
                        >
                            <CardMedia
                                component="video"
                                width="100%"
                                height="100%"
                                loop autoPlay muted
                                image={`${data.file}`}
                            />
                        </Card> :
                        <Card
                            elevation={2}
                            sx={{
                                maxHeight: '400px',
                                maxWidth: '321px',
                                borderRadius: '10px',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    objectFit: 'fill',
                                    borderRadius: '5px',
                                    minHeight: '400px',
                                }}
                                width="100%"
                                height="100%"
                                image={data.file ?? '#'}
                                alt="ADS"
                            />
                        </Card>
                    }
                </Box>
            }
        </React.Fragment>
    )
}

export default SecondAd;