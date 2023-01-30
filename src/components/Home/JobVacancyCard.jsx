import * as React from "react";
import {Stack, Typography, Grid} from "@mui/material";
import RightStar from "../../assets/images/right-pm-star.svg";

const JobVacancyCard = () => {
    return (
        <Grid
            item
            pt={3}
            xs={12}
            container
            width="100%"
            justifyContent="center"
            px={{sm: '50px', md: '50px', lg: '76px'}}
        >
            <Grid item xs={12}>
                <Stack direction="column" spacing={1} alignItems="center">
                    <Stack direction="column" alignItems="center" spacing={1}>
                        <Typography align="center" variant="h6" fontWeight={400}>Find the right job vacancies in Myanmar</Typography>
                        <img src={RightStar} alt="primary star" width="110px"/>
                    </Stack>
                </Stack>
            </Grid>

            {/*<Grid*/}
            {/*    container*/}
            {/*    item xs={12}*/}
            {/*    spacing={0}*/}
            {/*    width="100%"*/}
            {/*    maxHeight={{*/}
            {/*        sm: "50px",*/}
            {/*        md: "150px"*/}
            {/*    }}*/}
            {/*    minHeight={{*/}
            {/*        sm: "50px",*/}
            {/*        md: "150px",*/}
            {/*        xl: "250px",*/}
            {/*    }}*/}
            {/*    paddingTop="20px">*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <Box*/}
            {/*            width="100%"*/}
            {/*            height="100%"*/}
            {/*            display="flex"*/}
            {/*            alignItems="flex-end"*/}
            {/*            justifyContent="center"*/}
            {/*            sx={{*/}
            {/*                cursor: 'pointer',*/}
            {/*                borderRadius: "10px 0 0 10px",*/}
            {/*                background: "linear-gradient(272.38deg, #FFF979 0.44%, #FFD15C 99.57%)",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <img src={CandidateEnImg} alt="candidate" width="57%"/>*/}
            {/*        </Box>*/}
            {/*    </Grid>*/}

            {/*    <Grid item xs={6}>*/}
            {/*        <Box*/}
            {/*            width="100%"*/}
            {/*            height="100%"*/}
            {/*            display="flex"*/}
            {/*            alignItems="flex-end"*/}
            {/*            justifyContent="center"*/}
            {/*            sx={{*/}
            {/*                cursor: 'pointer',*/}
            {/*                borderRadius: "0 10px 10px 0",*/}
            {/*                background: "linear-gradient(272.25deg, #146ACF 11.67%, #029ADA 111.28%)",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <img src={EmployerEnImg} alt="employer" width="67.9%"/>*/}
            {/*        </Box>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </Grid>
    );
}

export default JobVacancyCard