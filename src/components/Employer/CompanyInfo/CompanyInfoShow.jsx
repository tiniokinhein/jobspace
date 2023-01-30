import React from "react";
import {Avatar, Box, Button, Card, Grid, Typography} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {Link as RouterLink} from "react-router-dom";

const CompanyInfoShow = ({company}) => {
    return (
        <Box sx={{
            background: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
            width: '100%'
        }}>
            <Grid container>
                <Grid item xs={12} md={12} width="100%">
                    <Box
                        sx={{
                            borderRadius: '10px 10px 0 0',
                            background: `url(${company.banner})`,
                            backgroundSize: '100% auto',
                            backgroundPosition: 'top',
                            backgroundRepeat: 'no-repeat',
                            height: '227px',
                            maxHeight: '227px',
                            minHeight: '227px',
                            position: 'relative'
                        }}
                    >
                        <Box px={4} pb={1.5} width="100%" height="100%" alignItems="flex-end" display="flex">
                            <Card sx={{
                                height: 131,
                                width: 131,
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex'
                            }}>
                                <Button component="label">
                                    <Avatar src={company.logo} variant="square"
                                            sx={{height: 120, width: 120}}/>
                                </Button>
                            </Card>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={8} lg={8} xl={8}>
                    <Grid container py={4} spacing={3.5} px={4}>
                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Company Name :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.company_name}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Number of Employees :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.employee_count?.title}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Company's Email :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.email ?? '---'}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Company's Mobile Number :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.mobile_no ?? '---'}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Company's Website :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography
                                sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.website ?? '---'}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Company's Industry :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.industry?.title ?? '---'}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Founded Since :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.founded_since ?? '---'}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                Address :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.street ? company?.street + ', ' : null}
                                {company?.township?.title}, {company?.region?.title}, {company?.country?.title}
                            </Typography>
                        </Grid>

                        <Grid item sm={5} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#333333'}}>
                                About Our Company :
                            </Typography>
                        </Grid>
                        <Grid item sm={7} sx={{py: 1}}>
                            <Typography sx={{fontSize: '15px', fontWeight: 500, color: '#585858'}}>
                                {company?.about_us ?? '---'}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="text"
                                startIcon={<BorderColorIcon/>}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                }}
                                component={RouterLink}
                                to="/employers/company-info/update"
                            >
                                Edit Account Information
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CompanyInfoShow;