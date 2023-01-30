import React, {useCallback, useEffect} from 'react';
import {Box, Container, Grid, Tab, Typography} from "@mui/material";
import {TabList} from "@mui/lab";
import TabTitle from "../PostedJob/TabTitle";
import {useDispatch, useSelector} from "react-redux";
import {recruitmentActions} from "../../../store";

const DetailTab = ({uuid, handleTabChange}) => {

    const dispatch = useDispatch();
    const {analysis} = useSelector((state) => state.recruitment)

    const fetchAnalysis = useCallback(() => {
        dispatch(recruitmentActions.getAnalysis(uuid))
        // eslint-disable-next-line
    }, [dispatch]);

    useEffect(() => {
        fetchAnalysis();
    }, [fetchAnalysis]);

    return (
        <Box
            sx={{
                height: '67px',
                background: '#ffffff',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                alignItems: 'center',
                display: 'flex',
                mt: 2
            }}
        >
            <Container maxWidth="xl">
                <Grid container sx={{padding: {lg: '0px 30px', xl: 0}}}>
                    <Grid item xs={12}>
                        <TabList
                            onChange={handleTabChange}
                            aria-label="Posted Job Details"
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            textColor="inherit"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: '#ED9624',
                                }
                            }}
                            sx={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                width: '100%',
                                py: 2,
                            }}
                        >
                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<Typography sx={{fontSize: '16px', fontWeight: 500}}>Overview</Typography>}
                                value="overview"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Total Applicants" count={analysis?.applied ?? 0}
                                                 isDetail={true}/>}
                                value="applicants"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Candidate" count={analysis?.candidate ?? 0}
                                                 isDetail={true}/>}
                                value="candidates"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Prescreen" count={analysis?.prescreens ?? 0} isDetail={true}/>}
                                value="prescreen"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Considering" count={analysis?.considering ?? 0}
                                                 isDetail={true}/>}
                                value="considering"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Shortlisted" count={analysis?.shortlists ?? 0}
                                                 isDetail={true}/>}
                                value="shortlisted"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Interview" count={analysis?.interviews ?? 0} isDetail={true}/>}
                                value="interview"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Hired" count={analysis?.hired ?? 0} isDetail={true}/>}
                                value="hired"
                            />

                            <Tab
                                sx={{minWidth: 'fit-content', flex: 1}}
                                label={<TabTitle title="Not Suitable" count={analysis?.not_suitable ?? 0}
                                                 isDetail={true}/>}
                                value="not-suitable"
                            />
                        </TabList>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default DetailTab;