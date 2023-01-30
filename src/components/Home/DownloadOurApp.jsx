import {Box, Grid, Stack, Typography, Link} from "@mui/material";
import {useCallback, useEffect,  useState} from "react";
import MobileIcon from "../../assets/images/Mobiles.svg";
import AndroidAppIcon from "../../assets/images/AndroidApp.svg";
import AppleAppIcon from "../../assets/images/AppleApp.svg";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {appActions} from "../../store";

function DownloadOurApp() {
    const dispatch = useDispatch();
    const {links} = useSelector(x => x.app);

    const [loading, setLoading] = useState(true);

    const initFetch = useCallback(() => {
        dispatch(appActions.get()).then(r => {
            setLoading(false);
        });
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const {t} = useTranslation()

    return (
            <Grid
                item
                xs={12}
                width="100%"
                justifyContent="center"
                display="flex"
                paddingX="16px"
            >
                <Box pb="10px">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <Stack>
                                    <img src={MobileIcon} alt="mobile" width="100%"/>
                                </Stack>
                                <Stack direction="column" spacing={1} justifyContent="center" alignItems="center" mx={{xs: 2, sm: 0}}>
                                    <Typography fontSize={{xs: '16px', md: '18px'}} fontWeight="300" color="#6D6969" textTransform="uppercase" 
                                        sx={{lineBreak: 'anywhere'}}>
                                        {/*Download Our App*/}
                                        {t('download_our_app')}
                                    </Typography>
                                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                        {!loading ? <Link href={links.appstore_url} target="_blank" underline="none">
                                            <Stack direction="row" spacing={1} alignItems="center" cursor="pointer">
                                                    <img src={AppleAppIcon} alt="apple" width="100%"/>
                                                    <Typography fontSize={{xs: '12px', md: '15px'}} fontWeight="300" color="#6D6969">
                                                        iPhone
                                                    </Typography>
                                            </Stack>
                                        </Link> : null}
                                        {!loading ? <Link href={links.playstore_url} target="_blank" underline="none">
                                            <Stack direction="row" spacing={1} alignItems="center" cursor="pointer">
                                                <img src={AndroidAppIcon} alt="apple" width="100%"/>
                                                <Typography fontSize="15px" fontWeight="300" color="#6D6969">
                                                    Android
                                                </Typography>
                                            </Stack>
                                        </Link> : null}
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
    );
}

export default DownloadOurApp;