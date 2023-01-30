import React, {Fragment, useEffect, useState} from 'react'
import {Box, Grid, Stack, Typography} from '@mui/material';
import AppliedPhoto from '../../../assets/images/Frame.svg';
import JobPost from "../../../components/FindJob/JobPost";
import IndustryList from "../../../components/Home/IndustryList";
import SimilarJobDataService from "../../../services/similar.jobs.service";

function ApplyJobSuccess({jobDetail}) {

    const [loading, setLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);
    const [similarJobs, setSimilarJobs] = useState([]);

    useEffect(() => {
        if (Object.keys(jobDetail).length > 0) {
            (async () => {
                await SimilarJobDataService.getByUuid(jobDetail.uuid).then(r => {
                    setSimilarJobs(r.data)
                    setLoading(false);
                })
            })();
        }

        setIsApplied(jobDetail.is_applied ?? false)
    }, [jobDetail]);

    return (
        <Fragment>
            <Box
                sx={{
                    mt: 2,
                    mb: 4,
                    height: '342px',
                    borderRadius: '5px',
                    backgroundColor: '#195DCC',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <Stack alignItems="center" justifyContent="center" display="flex" spacing={3}>
                    <Box>
                        <img src={AppliedPhoto} alt="Applied Jobs"/>
                    </Box>
                    <Box>
                        <Typography fontSize="20px" color="white" align="center" lineHeight="30px">
                            {isApplied ?
                                `Already applied your application.`:
                                `Your application has been sent successfully to ${jobDetail.company?.company_name}.`
                            }
                        </Typography>

                        <Typography fontSize="16px" color="white" align="center" paddingTop="10px" lineHeight="30px">
                            The employer will contact you if you are short-listed. Thank you and good luck in your
                            application!
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {similarJobs.length > 0 &&
                <Fragment>
                    <Box sx={{textAlign: 'center', py: 2}}>
                        <Typography sx={{color: '#000000', fontSize: '24px', mt: 1}}>
                            More Similar Jobs....
                        </Typography>
                    </Box>

                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={9.5}>
                            <JobPost
                                loading={loading}
                                data={similarJobs}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2.5}>
                            <IndustryList/>
                        </Grid>
                    </Grid>
                </Fragment>
            }
        </Fragment>
    )
}

export default ApplyJobSuccess