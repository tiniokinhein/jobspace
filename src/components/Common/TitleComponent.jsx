import React from "react";
import {SvgIcon, Typography, Stack, Box} from "@mui/material";
import {ReactComponent as StartIcon} from "../../assets/icons/golden-star.svg";
import HighLightImg from "../../assets/icons/hightlight.svg";
import {useTranslation} from "react-i18next";

const TitleComponent = ({title, disableP = false}) => {

    const {t} = useTranslation();

    return (
        <Stack direction="column" spacing={0} alignItems="center" justifyContent="center">
            <Stack spacing={1} direction="row" alignItems="center" display="flex" justifyContent="flex-start">
                <SvgIcon><StartIcon/></SvgIcon>
                <Typography
                    fontWeight={400}
                    fontSize={{xs: '1rem', sm: '1.5rem'}}
                    lineHeight="36px"
                    component="span"
                >
                    {t(title)}
                </Typography>
                <SvgIcon><StartIcon/></SvgIcon>
            </Stack>

            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: `${disableP ? "center" : "flex-start"}`,
                    width: '100%',
                    paddingLeft: `${disableP ? '0' : '10%'}`,
                    paddingTop: '5px'
                }}
            >
                <img src={HighLightImg} alt="primary star" width="159px" height="100%" align="center"/>
            </Box>
        </Stack>
    );
}

export default TitleComponent;