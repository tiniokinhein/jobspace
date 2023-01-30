import React, {Fragment} from 'react';
import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";

const CircularProfileProgress = ({progress}) => {
    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress
                    variant="determinate" {...props}
                    sx={{
                        width: "96px !important",
                        height: "96px !important",
                        color: "#FF9635 !important"
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" fontSize="20px" fontWeight="600" color="#FF9635">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    CircularProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };

    return (
        <Fragment>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <Box
                    sx={{
                        backgroundColor: 'white',
                        border: "1px solid #C4C4C4",
                        width: 110,
                        height: 110,
                        borderRadius: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    { progress ? <CircularProgressWithLabel value={progress}/> : console.log(progress) }
                </Box>
            </Stack>
        </Fragment>
    );
}

export default CircularProfileProgress;