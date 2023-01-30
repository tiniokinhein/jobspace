import React, {Fragment, useCallback, useEffect, useState} from "react";
import {
    Avatar, 
    Badge, 
    Box, 
    Card, 
    CardMedia, 
    Divider, 
    Paper, 
    Skeleton, 
    Stack, 
    SvgIcon, 
    Typography,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";
import {NavLink} from "react-router-dom";
import {ReactComponent as DiamondIcon} from "../../assets/icons/bordered-diamond.svg";
import {useDispatch, useSelector} from "react-redux";
import {abilitiesActions, employerAuthActions} from "../../store";
import DashboardIcon from "../../assets/icons/Dashboard.png";
import AccountInformationIcon from "../../assets/icons/AccountInformation.png";
import CompanyInformationIcon from "../../assets/icons/CompanyInformation.png";
import PostaJobIcon from "../../assets/icons/PostaJob.png";
import PostedJobsIcon from "../../assets/icons/PostedJobs.png";
import VideosIcon from "../../assets/icons/Videos.png";
import ProductsAndPromotionsIcon from "../../assets/icons/Product&Promotions.png";
import ContactPersonIcon from "../../assets/icons/ContactPerson.png";
import AccountSetting from "../../assets/icons/AccountSetting.png";
import Applicants from "../../assets/icons/applicants.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SideMenu = () => {

    let menus = [
        {
            "name": "Dashboard",
            "route": "/employers/dashboard",
            "icon": <img src={DashboardIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Account Information",
            "route": "/employers/account-info",
            "icon": <img src={AccountInformationIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Company Information",
            "route": "/employers/company-info",
            "icon": <img src={CompanyInformationIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Post a Job",
            "route": "/employers/post-job",
            "icon": <img src={PostaJobIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Posted Jobs",
            "route": "/employers/posted-jobs",
            "icon": <img src={PostedJobsIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Videos of Your Organization",
            "route": "/employers/videos",
            "icon": <img src={VideosIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Photos of Your Organization",
            "route": "/employers/photos",
            "icon": <img src={PostedJobsIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Products & Promotions",
            "route": "/employers/promotions",
            "icon": <img src={ProductsAndPromotionsIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Contact Person",
            "route": "/employers/contact-person",
            "icon": <img src={ContactPersonIcon} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Account Setting",
            "route": "/employers/account-setting",
            "icon": <img src={AccountSetting} alt="Account Home" width="25" height="25"/>
        },
        {
            "name": "Applicants",
            "route": "/employers/applicants",
            "icon": <img src={Applicants} alt="Account Home" width="25" height="25"/>
        },
    ];

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {company} = useSelector((state) => state.empAuth);
    const [jobPostCnt, setJobPostCnt] = useState(0);
    const [photoCnt, setPhotoCnt] = useState(0);
    const [videoCnt, setVideoCnt] = useState(0);
    const [productCnt, setProductCnt] = useState(0);
    const [promotionCnt, setPromotionCnt] = useState(0);
    const [highlightCnt, setHighlightCnt] = useState(0);
    const [urgentCnt, setUrgentCnt] = useState(0);
    const [topCnt, setTopCnt] = useState(0);
    const [questionCnt, setQuestionCnt] = useState(0);

    const initFetch = useCallback(() => {
        dispatch(employerAuthActions.company());
    }, [dispatch]);

    const abilityFetch = useCallback(() => {
        dispatch(abilitiesActions.getAll()).then(res => {
            if (res.payload.data?.job_post?.count > 0) {
                setJobPostCnt(res.payload.data?.job_post?.count);
            }

            if (res.payload.data?.job_post?.highlight > 0) {
                setHighlightCnt(res.payload.data?.job_post?.highlight);
            }

            if (res.payload.data?.job_post?.urgent > 0) {
                setUrgentCnt(res.payload.data?.job_post?.urgent);
            }

            if (res.payload.data?.job_post?.top > 0) {
                setTopCnt(res.payload.data?.job_post?.top);
            }

            if (res.payload.data?.job_post?.question > 0) {
                setQuestionCnt(res.payload.data?.job_post?.question);
            }

            if (res.payload.data?.photo?.count > 0) {
                setPhotoCnt(res.payload.data?.photo?.count);
            }

            if (res.payload.data?.video?.count > 0) {
                setVideoCnt(res.payload.data?.video?.count);
            }

            if (res.payload.data?.promotion?.product_cnt > 0) {
                setProductCnt(res.payload.data?.promotion?.product_cnt);
            }

            if (res.payload.data?.promotion?.promotion_cnt > 0) {
                setPromotionCnt(res.payload.data?.promotion?.promotion_cnt);
            }
        });
    }, [dispatch])

    useEffect(() => {
        initFetch();
        abilityFetch();
        setLoading(false);
    }, [abilityFetch, initFetch])

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                // width: '300px',
                borderRadius: '10px',
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                marginBottom: 3
            }}
        >

            <Box height="129px" bgcolor={company.banner ? "white" : "#195DCC"} borderRadius="10px 10px 0 0">
                {company.banner &&
                    <Card sx={{width: '100%', height: '100%', borderRadius: "10px 10px 0 0"}}>
                        <CardMedia
                            component="img"
                            height="100%"
                            width="100%"
                            image={company.banner}
                            alt="Company Wallpaper"
                        />
                    </Card>
                }
            </Box>

            <Box sx={{marginTop: '-3.5rem'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Badge overlap="circular" sx={{backgroundColor: 'white', borderRadius: '50%'}}>
                        {!loading ?
                            <Avatar alt={company?.company_name} src={company?.logo}
                                    sx={{height: 80, width: 80, borderRadius: '50%'}}/> :
                            <Skeleton variant="circular" width={80} height={80}/>
                        }
                    </Badge>
                </Box>

                <Box sx={{py: '15px'}}>
                    <Stack spacing={1.5}>
                        {company?.company_name ?
                            <Fragment>
                                <Typography fontSize="18px" component="div" fontWeight={500}
                                            align="center">{company?.company_name}</Typography>
                                <Typography fontSize="15px" component="div" fontWeight={400}
                                            align="center" color='#767676'>
                                    {company?.region?.title}&nbsp;|&nbsp;{company?.township?.title}
                                </Typography>
                            </Fragment> : <Typography align="center">---</Typography>
                        }
                    </Stack>
                </Box>

                <Divider variant="middle"/>

                {(window.screen.width <= 900) ?
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
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '15px',
                            }}>
                                <Box className="side-menu">
                                    {menus.map((menu, index) => (
                                        <NavLink
                                            style={({isActive}) => {
                                                return {
                                                    display: "block",
                                                    margin: "0.25rem 0",
                                                    textDecoration: "none",
                                                    color: isActive ? "white" : "black",
                                                    borderRadius: isActive ? "5px" : "",
                                                    backgroundColor: isActive ? "#195DCC" : "",
                                                    padding: '0.75rem 1.5rem',
                                                };
                                            }}
                                            to={`${menu.route}`}
                                            key={index}
                                        >
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                {menu.icon}
                                                <Typography fontSize="14px" color="inherit">{menu.name}</Typography>
                                            </Stack>
                                        </NavLink>
                                    ))}
                                </Box>

                                {
                                    !(jobPostCnt && photoCnt && videoCnt && productCnt &&
                                    promotionCnt && highlightCnt && urgentCnt && topCnt && questionCnt) &&
                                    <Box>
                                        <NavLink
                                            style={{
                                                display: "block",
                                                margin: "0.25rem 0",
                                                textDecoration: "none",
                                                backgroundColor: "#F7F5F5",
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: "5px",
                                                border: '0.5px dashed #00A0DC',
                                                color: '#000000'
                                            }}
                                            to="/coming-soon">
                                            <Typography color="secondary" fontWeight={300}
                                                        fontSize="14px">Upgrade</Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                my: 1,
                                                alignContent: 'center',
                                            }}>
                                                <Stack spacing={1.5} direction="row" justifyContent="center"
                                                    display="flex" alignItems="center">
                                                    <SvgIcon fontSize="14px"><DiamondIcon width="100%"
                                                                                        height="100%"/></SvgIcon>
                                                    <Typography fontSize="14px" fontWeight={500}
                                                                color="inherit">Try Premium</Typography>
                                                </Stack>
                                            </Box>
                                        </NavLink>
                                    </Box>
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion> :
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '15px',
                    }}>
                        <Box className="side-menu">
                            {menus.map((menu, index) => (
                                <NavLink
                                    style={({isActive}) => {
                                        return {
                                            display: "block",
                                            margin: "0.25rem 0",
                                            textDecoration: "none",
                                            color: isActive ? "white" : "black",
                                            borderRadius: isActive ? "5px" : "",
                                            backgroundColor: isActive ? "#195DCC" : "",
                                            padding: '0.75rem 1.5rem',
                                        };
                                    }}
                                    to={`${menu.route}`}
                                    key={index}
                                >
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {menu.icon}
                                        <Typography fontSize="14px" color="inherit">{menu.name}</Typography>
                                    </Stack>
                                </NavLink>
                            ))}
                        </Box>

                        {
                            !(jobPostCnt && photoCnt && videoCnt && productCnt &&
                            promotionCnt && highlightCnt && urgentCnt && topCnt && questionCnt) &&
                            <Box>
                                <NavLink
                                    style={{
                                        display: "block",
                                        margin: "0.25rem 0",
                                        textDecoration: "none",
                                        backgroundColor: "#F7F5F5",
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: "5px",
                                        border: '0.5px dashed #00A0DC',
                                        color: '#000000'
                                    }}
                                    to="/coming-soon">
                                    <Typography color="secondary" fontWeight={300}
                                                fontSize="14px">Upgrade</Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        my: 1,
                                        alignContent: 'center',
                                    }}>
                                        <Stack spacing={1.5} direction="row" justifyContent="center"
                                            display="flex" alignItems="center">
                                            <SvgIcon fontSize="14px"><DiamondIcon width="100%"
                                                                                height="100%"/></SvgIcon>
                                            <Typography fontSize="14px" fontWeight={500}
                                                        color="inherit">Try Premium</Typography>
                                        </Stack>
                                    </Box>
                                </NavLink>
                            </Box>
                        }
                    </Box>
                }
            </Box>
        </Paper>
    )
}

export default SideMenu;