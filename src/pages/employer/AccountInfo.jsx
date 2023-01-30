import React, {useCallback, useEffect} from 'react';
import {Avatar, Box, Card, Grid, Link, Stack, Tab, Typography} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {employerAuthActions} from "../../store";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CompanyHome from "../../components/Company/CompanyHome";
import CompanyJob from "../../components/Company/CompanyJob";
import CompanyImage from "../../components/Company/CompanyImage";
import CompanyVideo from "../../components/Company/CompanyVideo";
import CompanyPromotion from "../../components/Company/CompanyPromotion";
import InsertPhotoTwoToneIcon from '@mui/icons-material/InsertPhotoTwoTone';

const AccountInfo = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);
    const {company} = useSelector(state => state.empAuth);

    const fetchDt = useCallback(() => {
        dispatch(employerAuthActions.company());
    }, [dispatch]);

    useEffect(() => {
        fetchDt();
        setLoading(false);
    }, [fetchDt]);

    const [value, setValue] = React.useState("Home");

    const handleChange = (event, newValue) => {
        setValue(newValue);
        scrollToTop();
    };

    const changeTab = (value) => {
        setValue(value);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: "250",
            behavior: "smooth",
        });
    };

    return (
        <Box backgroundColor="white"
             sx={{borderRadius: '10px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'}}>
            <Grid container item xs={12}>
                {company.banner &&
                    <Grid
                        item
                        xs={12}
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        display="flex"
                        sx={{
                            height: (company.banner) ? '226px' : 'auto',
                            display: {xs: 'none', sm: 'block'},
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '227px',
                                maxHeight: '227px',
                                background: `url(${company.banner})`,
                                backgroundSize: '100% auto',
                                backgroundPosition: 'top',
                                backgroundRepeat: 'no-repeat',
                                borderRadius: '10px 10px 0 0'
                            }}
                        />
                    </Grid>
                }

                <Grid item xs={12}>
                    <Box
                        sx={{
                            height: '120px',
                            maxHeight: '120px',
                            width: '100%',
                            background: {
                                xs: "linear-gradient(90.48deg, #2D5DD4 0%, #21277F 99.91%)",
                                md: "linear-gradient(90.48deg, #2D5DD4 0%, #21277F 99.91%)",
                            },
                            borderRadius: {xs: '10px 10px 0 0', sm: '0 0 0 0'}
                        }}
                    >
                        <Grid
                            container
                            sx={{
                                padding: '0 30px',
                                height: '100%'
                            }}
                            alignItems="center"
                            justifyContent="center"
                            display="flex"
                        >
                            <Grid item container xs={12} md={12} spacing={2} alignItems="center" display="flex">
                                <Grid md={2} xl={1.5} item>
                                    <Box
                                        sx={{
                                            display: {xs: "none", sm: "block"},
                                            maxWidth: '100px',
                                            maxHeight: '100px'
                                        }}
                                    >
                                        <Card
                                            sx={{
                                                padding: 1,
                                                maxWidth: '100px',
                                                maxHeight: '100px',
                                                display: 'flex',
                                            }}
                                        >
                                            {company.logo ?
                                                <Grid container display={'flex'} justifyContent={'center'}>
                                                    <Avatar src={company.logo} variant="square"
                                                            sx={{height: 80, width: 80}}/>
                                                </Grid>
                                                :
                                                <Grid container display={'flex'} justifyContent={'center'}>
                                                    <Avatar sx={{height: 80, width: 80}}>
                                                        <InsertPhotoTwoToneIcon fontSize="large"/>
                                                    </Avatar>
                                                </Grid>
                                            }
                                        </Card>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={10} xl={10.5}>
                                    <Stack spacing={0.5}>
                                        <Typography
                                            style={styles.companyName}
                                            sx={{
                                                color: {xs: "#fff", md: "#fff"},
                                            }}
                                        >
                                            {company.company_name ? company.company_name : ""}
                                        </Typography>

                                        {(company.township || company.region) &&
                                            <Typography
                                                style={styles.companyInfo}
                                                sx={{
                                                    color: "#FFFF",
                                                    display: {xs: "none", md: "block"},
                                                }}
                                            >
                                                {company.township ? company.township.title : ""}
                                                {company.region ? ", " + company.region.title : ""}
                                            </Typography>
                                        }

                                        {company.website &&
                                            <Typography
                                                style={styles.companyInfo}
                                                sx={{
                                                    color: "#FFFF",
                                                    display: {xs: "none", md: "block"},
                                                }}
                                            >
                                                Website :&nbsp;{" "}
                                                <Link
                                                    href={company.website ? company.website : "#"}
                                                    sx={{color: "#FFFFFF"}}
                                                    underline="none"
                                                    target={company.website ? "_blank" : "_self"}
                                                >
                                                    {company.website ? company.website : ""}
                                                </Link>
                                            </Typography>
                                        }

                                        {company.website &&
                                            <Typography
                                                style={styles.companyInfo}
                                                sx={{
                                                    color: "#FFFF",
                                                    display: {xs: "none", md: "block"},
                                                }}
                                            >
                                                Total Views: {company.employee_view}
                                            </Typography>
                                        }
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={12}
                    container
                    height="100%"
                    alignItems="flex-start"
                    justifyContent="center"
                    display="flex"
                >
                    <Grid item xs={12} md={12}>
                        <TabContext value={value}>
                            <Grid container sx={{py: 2}}>
                                <Grid item xs={12}>
                                    <Box sx={{borderBottom: 1, borderColor: 'divider', px: {xs: 2, sm: 4}}}>
                                        <TabList
                                            onChange={handleChange}
                                            aria-label="tabs"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            allowScrollButtonsMobile
                                        >
                                            <Tab label={<Typography fontWeight={500}>Home</Typography>}
                                                 value="Home"/>
                                            <Tab label={<Typography fontWeight={500}>Jobs</Typography>}
                                                 value="Jobs"/>
                                            <Tab label={<Typography fontWeight={500}>Photos</Typography>}
                                                 value="Photos"/>
                                            <Tab label={<Typography fontWeight={500}>Video</Typography>}
                                                 value="Video"/>
                                            <Tab label={<Typography fontWeight={500}>Products &
                                                Promotions</Typography>}
                                                 value="Products & Promotions"/>
                                        </TabList>
                                    </Box>
                                </Grid>

                                <TabPanel
                                    value="Home"
                                    sx={{
                                        px: {xs: 2, sm: 4},
                                        borderRadius: "10px",
                                        width: '100%'
                                    }}
                                >
                                    {(!loading && company.uuid) &&
                                        <CompanyHome company={company} changeTab={changeTab} borderRadius={false}/>
                                    }
                                </TabPanel>

                                <TabPanel
                                    value="Jobs"
                                    sx={{
                                        px: {xs: 2, sm: 4},
                                        borderRadius: "10px",
                                        width: '100%'
                                    }}
                                >
                                    {!loading &&
                                        <CompanyJob companies={company} borderRadius={false}/>
                                    }
                                </TabPanel>

                                <TabPanel
                                    value="Photos"
                                    sx={{
                                        px: {xs: 2, sm: 4},
                                        borderRadius: "10px",
                                        width: '100%'
                                    }}
                                >
                                    {!loading &&
                                        <CompanyImage companies={company} borderRadius={false}/>
                                    }
                                </TabPanel>

                                <TabPanel
                                    value="Video"
                                    sx={{
                                        px: {xs: 2, sm: 4},
                                        borderRadius: "10px",
                                        width: '100%'
                                    }}
                                >
                                    {!loading &&
                                        <CompanyVideo companies={company} borderRadius={false}/>
                                    }
                                </TabPanel>

                                <TabPanel
                                    value="Products & Promotions"
                                    sx={{
                                        px: {xs: 2, sm: 4},
                                        borderRadius: "10px",
                                        width: '100%'
                                    }}
                                >
                                    {!loading &&
                                        <CompanyPromotion companies={company} borderRadius={false}/>
                                    }
                                </TabPanel>
                            </Grid>
                        </TabContext>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AccountInfo;


const styles = {
    companyName: {
        fontSize: "20px",
        fontWeight: "500",
        color: "#FFFFF",
        fontStyle: "normal",
    },
    companyInfo: {
        fontSize: "13px",
        fontWeight: "400",
        color: "#FFFFF",
    },
    package: {
        fontSize: "16px",
        fontWeight: " 300",
    },
    text: {
        fontSize: "16px",
        fontWeight: "400",
    },
    tabHeader: {
        fontSize: "20px",
        fontWeight: "500",
    },
    tabContent: {
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
    },
    sideContent: {
        fontSize: "14px",
        // fontWeight: 500
    },
};