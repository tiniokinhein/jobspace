import React from 'react'
import {Box, Container, Grid, Stack, styled, Typography, Link} from '@mui/material'
import logo from '../../assets/images/logo.svg';
import footerBackground from '../../assets/backgrounds/footer-bg.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import FooterScrollButton from './FooterScrollButton';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {Link as RouterLink} from 'react-router-dom';
import HighLightImg from "../../assets/icons/hightlight.svg";
import ViberIcon from "../../assets/icons/Viber.svg";
import {useTranslation} from "react-i18next";
import {LinkedIn} from "@mui/icons-material";
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSelector } from 'react-redux';

const Footer = () => {

    const {t} = useTranslation();

    const companyUrl = `/companies/${process.env.REACT_APP_COMPANY_UUID}/details`;

    const {isEmpLoggedIn} = useSelector((state) => state.empAuth);

    return (
        <Box
            flexGrow={1}
            width="100%"
            sx={{
                backgroundImage: `url(${footerBackground})`,
                backgroundPosition: "top",
                backgroundSize: '100% 100%',
                backgroundRepeat: "no-repeat",
            }}
        >
            <Grid container item xs={12} sx={{
                display: 'flex',
                alignItems: 'center',
                background: "linear-gradient(270.23deg, #F2F2F2 4.22%, #FFFFFF 60.89%, #EBEBEB 99.85%)",
                minHeight: '97px'
            }}
                  alignItems="center"
                  justifyContent="center"
            >
                <Stack direction="row" alignItems="center" justifyContent="center">
                    <Stack paddingBottom={{xs: 0.5, md: 0}}>
                        <img alt="logo" src={logo} className="App-logo"/>
                    </Stack>
                    <Stack direction="column" spacing={1} alignItems="center" justifycontent="center">
                        <Typography color="#163560" fontWeight={700} variant="span"
                                    fontSize={{xs: '12px', sm: '18px'}}>သင့်အနာဂတ်ဖန်တီးယူ JobSpace
                            နှင့်အတူ</Typography>
                        <img src={HighLightImg} alt="primary star" width="124px"/>
                    </Stack>
                </Stack>
            </Grid>

            <Container maxWidth="xl">
                <Box flexGrow={1} width="100%" minHeight="380px" alignItems="center" justifyContent="center"
                     display="flex" py={3}>
                    <Grid container spacing={2}
                          sx={{textAlign: 'start', pl: {lg: '30px', xl: 0}, position: 'relative'}}>
                        <Grid item sm={6} md={6} lg={3} xs={12}>
                            <StyledTitle>{t('about_jobSpace')}</StyledTitle>
                            <Link component={RouterLink} to={'about-us'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('about_us')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={`${companyUrl}`} style={{textDecoration: 'none'}}>
                                <StyledFooterText> {t('career_at_jobSpace')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'contact-us'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('contact_us')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'news-and-events'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('news_&_events')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'faq'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('faq')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'/terms-of-service'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('terms_of_service')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'privacy-and-policy'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('privacy_and_policy')}</StyledFooterText>
                            </Link>
                        </Grid>

                        <Grid item sm={6} md={6} lg={3} xs={12}>
                            <StyledTitle>{t('features')}</StyledTitle>

                            <Link component={RouterLink} to={'find-jobs'} style={{textDecoration: 'none'}}>
                                <StyledFooterText> {t('jobs_by_categories')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'find-jobs'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('jobs_by_company_name')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'/career-resources'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('career_programs')}</StyledFooterText>
                            </Link>

                            <Link component={RouterLink} to={'testimonials'} style={{textDecoration: 'none'}}>
                                <StyledFooterText>{t('testimonials')}</StyledFooterText>
                            </Link>

                        </Grid>

                        <Grid item sm={6} md={6} lg={3} xs={12}>
                            <StyledTitle>{t('employers')}</StyledTitle>

                            <Link 
                                to={isEmpLoggedIn ? '/employers/post-job' : '/employers/sign-in'} 
                                component={RouterLink}
                                style={{textDecoration: 'none'}}
                            >
                                <StyledFooterText>{t('post_a_job_ad')}</StyledFooterText>
                            </Link>

                            <Link 
                                to={isEmpLoggedIn ? '/employers/applicants' : '/employers/sign-in'}
                                component={RouterLink}
                                style={{textDecoration: 'none'}}
                            >
                                <StyledFooterText>{t('search_for_cv')}</StyledFooterText>
                            </Link>

                            <Link 
                                to={'contact-us'} 
                                style={{textDecoration: 'none'}}
                                component={RouterLink}
                            >
                                <StyledFooterText>{t('advertise_with_us')}</StyledFooterText>
                            </Link>

                            <Link 
                                to={isEmpLoggedIn ? '/employers/company-info' : '/employers/sign-in'}
                                style={{textDecoration: 'none'}}
                                component={RouterLink}
                            >
                                <StyledFooterText>{t('company_profile')}</StyledFooterText>
                            </Link>

                        </Grid>

                        <Grid item sm={6} md={6} lg={3} xs={12} mb={2}>
                            <StyledTitle>{t('stay_connected')}</StyledTitle>

                            <a href="https://www.facebook.com/JobSpacecommm-103208719124989" target="_blank"
                               rel="noreferrer"
                               style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <FacebookIcon sx={{mt: 2, mr: 2}}/>
                                    <StyledFooterText>Facebook</StyledFooterText>
                                </StyledBox>
                            </a>

                            <a href="https://t.me/jobspacemyanmar" target="_blank" rel="noreferrer"
                               style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <TelegramIcon sx={{mt: 2, mr: 2}}/>
                                    <StyledFooterText>Telegram</StyledFooterText>
                                </StyledBox>
                            </a>

                            <a href="https://wa.me/message/XI7RIUPF55RHI1" target="_blank" rel="noreferrer"
                               style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <WhatsAppIcon sx={{mt: 2, mr: 2}}/>
                                    <StyledFooterText>WhatsApp</StyledFooterText>
                                </StyledBox>
                            </a>

                            <a href="https://invite.viber.com/?g2=AQBdu6zB5LBTmU90aKyDg%2BiDnnqwirBlK6YwQnBQmrb%2F1BxeNQbE6YLzr48%2FrO7R"
                               target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <Box sx={{
                                        marginTop: '16px',
                                        marginRight: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#7360f2'
                                    }}>
                                        <img src={ViberIcon} alt='viber icon' width="22" height="22"/>
                                    </Box>
                                    <StyledFooterText>Viber</StyledFooterText>
                                </StyledBox>
                            </a>

                            <a href="https://twitter.com/JobspaceMyanmar?t=vj85l6do4_AcpUMaPyQWMg&s=09" target="_blank" rel="noreferrer"
                               style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <TwitterIcon sx={{mt: 2, mr: 2}}/>
                                    <StyledFooterText>Twitter</StyledFooterText>
                                </StyledBox>
                            </a>

                            <a href="https://www.linkedin.com/company/jobspace-com-mm/" target="_blank" rel="noreferrer"
                               style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <LinkedIn sx={{mt: 2, mr: 2}}/>
                                    <StyledFooterText>LinkedIn</StyledFooterText>
                                </StyledBox>
                            </a>

                            <a href="https://googleplay.com" target="_blank" rel="noreferrer"
                               style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <AndroidIcon sx={{mt: 2, mr: 2}}/>
                                    <StyledFooterText>JobSpace @ Google Play</StyledFooterText>
                                </StyledBox>
                            </a>

                            <a href="https://appstore.com" target="_blank" rel="noreferrer"
                               style={{textDecoration: 'none'}}>
                                <StyledBox>
                                    <AppleIcon sx={{mt: 2, mr: 2}}/>
                                    <StyledFooterText>JobSpace @ App Store</StyledFooterText>
                                </StyledBox>
                            </a>
                        </Grid>

                        <Grid container item spacing={2} sx={{textAlign: 'start'}}>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    fontSize: '14px',
                                    color: '#FFFFFF'
                                }}>
                                    © 2022-23 JOBSPACE. All rights reserved.
                                </Typography>
                            </Grid>
                            <FooterScrollButton/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer;

const StyledTitle = styled(Typography)(({theme}) => ({
    fontSize: "20px !important",
    color: "#FFFFFF",
    fontWeight: "bold !important",
    [theme.breakpoints.down('lg')]: {
        marginTop: '1rem !important',
    },
}))

const StyledFooterText = styled(Typography)(() => ({
    fontSize: '16px !important',
    marginTop: '16px !important',
    color: '#FFFFFF !important',
    alignItems: 'center !important',
}))

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF'
}))
