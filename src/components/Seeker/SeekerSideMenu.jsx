import React, {Fragment, useCallback, useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Badge,
    Box,
    Divider,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {latestExperienceActions, personalInfoActions} from "../../store";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SeekerSideMenuItem from "./SideMenu/SeekerSideMenuItem";
import StringAvatar from "../Common/StringAvatar";

const SeekerSideMenu = ({isJobPostSide = false}) => {

    const dispatch = useDispatch();
    const {user} = useSelector(x => x.auth);
    const [loading, setLoading] = useState(true);
    const {personal_info} = useSelector((state) => state.personal_info);
    const {latest_experience} = useSelector((state) => state.latest_experience);
    const {isLoggedIn} = useSelector((state) => state.auth)

    const initFetch = useCallback(() => {
        if (isLoggedIn) {
            dispatch(personalInfoActions.get());
            dispatch(latestExperienceActions.get());
        }
        setLoading(false);
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        initFetch();
    }, [initFetch])

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            borderRadius="10px"
            backgroundColor="white"
            marginBottom={3}
            sx={{
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Box height="129px" bgcolor="#195DCC" borderRadius="10px 10px 0 0"/>
            <Box sx={{marginTop: '-3.5rem'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Badge overlap="circular">
                        {!loading ?
                            (personal_info?.full_name ?
                                <Avatar alt={personal_info?.full_name} src={personal_info?.profile_img}
                                        sx={{height: 80, width: 80, borderRadius: '50%'}}/> :
                                <StringAvatar name={user?.full_name} width={80} height={80}/>) :
                            <Skeleton variant="circular" width={80} height={80}/>
                        }
                    </Badge>
                </Box>

                <Box sx={{py: '15px'}}>
                    <Stack spacing={1} alignItems="center" justifyContent="center">
                        {personal_info || isLoggedIn ?
                            <Fragment>
                                {!loading ?
                                    <Fragment>
                                        <Typography fontSize="18px" component="div" fontWeight={500}
                                                    align="center">{personal_info?.full_name || user?.full_name}</Typography>
                                        {(latest_experience?.job_title && latest_experience?.company_name) &&
                                            <Typography fontSize="15px" component="div" fontWeight={400}
                                                        align="center" color='#767676'>
                                                {latest_experience?.job_title + ' : ' + latest_experience?.company_name}
                                            </Typography>
                                        }
                                    </Fragment> :
                                    <Fragment>
                                        <Skeleton width="50%"/>
                                        <Skeleton width="40%"/>
                                    </Fragment>
                                }
                            </Fragment>
                             :
                            <Typography align="center">---</Typography>
                        }
                    </Stack>
                </Box>

                <Divider variant="middle"/>

                {isJobPostSide || (window.screen.width <= 900) ?
                    <Accordion
                        expanded={expanded === 'panel1'}
                        onChange={handleChange('panel1')}
                        elevation={0}
                        sx={{
                            '&.MuiAccordion-root:before': {
                                display: 'none',
                            },
                            '&.MuiPaper-root': {
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                            }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography fontWeight={500}>Profile Functions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SeekerSideMenuItem/>
                        </AccordionDetails>
                    </Accordion> :
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '15px',
                    }}>
                        <SeekerSideMenuItem/>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default SeekerSideMenu;