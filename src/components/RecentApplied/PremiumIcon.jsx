import React from "react";
import {Stack, SvgIcon, Typography} from "@mui/material";
import {ReactComponent as PremiumImg} from "../../assets/icons/premium.svg";

const PremiumIcon = ({isPremium}) => {

    return (
        <>
            {isPremium ?
                <Stack direction="row"
                       alignItems="center">
                    <SvgIcon sx={{fontSize: '1rem'}}><PremiumImg/></SvgIcon>&nbsp;&nbsp;
                    <Typography
                        variant="caption"
                        display="block"
                        color="error"
                        alignItems="center"
                    >
                        Premium
                    </Typography>
                </Stack> : null}
        </>
    )
};

export default PremiumIcon;