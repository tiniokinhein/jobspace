import React from 'react';
import {Box, Container, Grid, Skeleton, Stack} from "@mui/material";

const Fallback = () => {

    return (
        <Grid container sx={{
            backgroundColor: "#F8F9FA",
            minHeight: "100vh"
        }}>
            <Grid item xs={12}>
                <Box backgroundColor="white"
                     boxShadow="rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px">
                    <Container maxWidth="xl">
                        <Stack
                            direction="row"
                            sx={{
                                padding: {
                                    lg: '0px 30px', xl: 0
                                },
                                alignItems: 'center',
                                display: 'flex',
                                justifyItems: 'center',
                                height: '80px'
                            }}
                            spacing={2}
                        >
                            <Skeleton variant="rounded" width={120} height={50}/>
                            <Skeleton width="5%"/>
                            <Skeleton width="5%"/>
                            <Skeleton width="5%"/>
                        </Stack>
                    </Container>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Fallback;
