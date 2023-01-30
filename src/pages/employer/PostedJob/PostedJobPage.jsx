import React, {useEffect, useState} from 'react';
import {Box, Grid, Tab} from '@mui/material';
import AllListing from "./AllListing";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import TabTitle from "../../../components/Employer/PostedJob/TabTitle";
import PublicListing from "./PublicListing";
import EmpJobCountDataService from "../../../services/emp.job.count.service";
import DraftListing from "./DraftListing";
import PendingListing from "./PendingListing";
import OfflineListing from "./OfflineListing";
import {history} from "../../../helpers";

function PostedJobPage() {

    const [analysis, setAnalysis] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [value, setValue] = useState('all-listing');
    const tabs = ['all-listing', 'public', 'draft', 'awaiting-approval', 'offline'];

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        history.navigate(`${window.location.pathname}#${newValue}`);
    };

    useEffect(() => {
        let hashVal = window.location.hash;

        if (hashVal) {
            hashVal = hashVal.substring(1);
            if (tabs.includes(hashVal.toLowerCase())) {
                setValue(hashVal.toLowerCase());
            }
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        (async () => {
            await EmpJobCountDataService.get().then(res => {
                setAnalysis(res.data);
            });
        })()
    }, [refresh]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TabContext value={value}>
                    <Box
                        sx={{
                            borderRadius: '10px',
                            background: '#FFFFFF',
                            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        px: 1
                                    }}
                                >
                                    <TabList
                                        onChange={handleTabChange}
                                        aria-label="posted jobs"
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
                                            label={<TabTitle title="All Listing" count={analysis?.all}/>}
                                            value="all-listing"
                                        />

                                        <Tab
                                            sx={{minWidth: 'fit-content', flex: 1}}
                                            label={<TabTitle title="Active" count={analysis?.public}/>}
                                            value="public"
                                        />

                                        <Tab
                                            sx={{minWidth: 'fit-content', flex: 1}}
                                            label={<TabTitle title="Draft" count={analysis?.draft}/>}
                                            value="draft"
                                        />

                                        <Tab
                                            sx={{minWidth: 'fit-content', flex: 1}}
                                            label={<TabTitle title="Awaiting Approval" count={analysis?.pending}/>}
                                            value="awaiting-approval"
                                        />

                                        <Tab
                                            sx={{minWidth: 'fit-content', flex: 1}}
                                            label={<TabTitle title="Offline" count={analysis?.offline}/>}
                                            value="offline"
                                        />
                                    </TabList>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box
                        sx={{
                            borderRadius: '10px',
                            background: '#FFFFFF',
                            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
                            mt: 3
                        }}
                    >
                        <Grid container px={5}>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TabPanel value="all-listing" sx={{px: 0}}>
                                            <AllListing setRefresh={setRefresh}/>
                                        </TabPanel>
                                        <TabPanel value="public" sx={{px: 0}}>
                                            <PublicListing setRefresh={setRefresh}/>
                                        </TabPanel>
                                        <TabPanel value="draft" sx={{px: 0}}>
                                            <DraftListing setRefresh={setRefresh}/>
                                        </TabPanel>
                                        <TabPanel value="awaiting-approval" sx={{px: 0}}>
                                            <PendingListing/>
                                        </TabPanel>
                                        <TabPanel value="offline" sx={{px: 0}}>
                                            <OfflineListing setRefresh={setRefresh}/>
                                        </TabPanel>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </TabContext>
            </Grid>
        </Grid>
    )
}

export default PostedJobPage