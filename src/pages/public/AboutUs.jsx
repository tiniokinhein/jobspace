import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Parser } from "html-to-react";
import { useDispatch } from "react-redux";
import { setProgress } from "../../store/slices/progress";
import SiteContentService from "../../services/site.content.service";
import BackgroundImg from "../../assets/backgrounds/dot-bg.png";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import AboutUsLogo from "../../assets/images/about_us_logo.png";

const AboutUs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const urls = [
    {
      name: t("contact_us"),
      path: "/contact-us",
    },
    {
      name: t("privacy_and_policy"),
      path: "/privacy-and-policy",
    },
    {
      name: t("terms_of_service"),
      path: "/terms-of-service",
    },
    {
      name: t("testimonials"),
      path: "/testimonials",
    },
  ];

  useEffect(() => {
    dispatch(setProgress(50));

    (async () => {
      await SiteContentService.all({ type: 1 }).then((r) => setData(r.data));
    })();

    dispatch(setProgress(100));

    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "content-box",
      }}
    >
      <Box>
        {Object.keys(data).length > 0 && !loading ? (
          <Card
            sx={{ maxHeight: "366px", height: "366px", borderRadius: "0" }}
            elevation={0}
          >
            <CardMedia
              component="img"
              alt={data.name}
              image={data.wallpaper}
              sx={{ width: "100%", height: "100%" }}
            />
          </Card>
        ) : null}
      </Box>
      {Object.keys(data).length > 0 && !loading && (
        <Container maxWidth={"xl"}>
          <Box
            sx={{
              padding: {
                lg: "0px 30px",
                xl: 0,
              },
            }}
          >
            <Grid container>
              <Grid item xs={12} sx={{ my: 4 }}>
                <Grid container sx={{ justifyContent: "space-between" }}>
                  <Grid item xs={10}>
                    <Paper elevation={0} sx={{ p: 5, borderRadius: "10px" }}>
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        color="secondary"
                      >
                        {t("about_us")}
                      </Typography>

                      <Box
                        sx={{
                          marginBottom: 6,
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography sx={{ lineHeight: "30px" }}>
                          <img
                            alt="about us"
                            src={AboutUsLogo}
                            style={{ float: "right", margin: "10px" }}
                          />
                          {Parser().parse(data?.content)}
                        </Typography>
                      </Box>

                      <Grid container sx={{ justifyContent: "space-between" }}>
                        <Grid item xs={12} md={5}>
                          <Stack
                            sx={{
                              justifyContent: "flex-start",
                              display: "flex",
                              alignItems: "flex-start",
                              width: "100%",
                            }}
                            spacing={2}
                          >
                            <Typography
                              variant="h6"
                              color="#15247A"
                              fontWeight={700}
                            >
                              Vision
                            </Typography>
                            <Divider
                              sx={{
                                background: "#15247A",
                                width: "10%",
                                height: "2px",
                              }}
                            />
                            <Typography align="left" lineHeight="28px">
                              {data?.vision}
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={5}>
                          <Stack
                            sx={{
                              justifyContent: "flex-end",
                              display: "flex",
                              alignItems: "flex-end",
                              width: "100%",
                            }}
                            spacing={2}
                          >
                            <Typography
                              variant="h6"
                              color="#15247A"
                              fontWeight={700}
                            >
                              Mission
                            </Typography>
                            <Divider
                              sx={{
                                background: "#15247A",
                                width: "10%",
                                height: "2px",
                              }}
                            />
                            <Typography align="right" lineHeight="28px">
                              {data?.mission}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Grid item xs={1.8}>
                    <Paper elevation={0} sx={{ borderRadius: "10px" }}>
                      <List sx={{ width: "100%" }} aria-labelledby="subheader">
                        <ListItemButton>
                          <Stack>
                            <ListItemText
                              sx={{
                                ".MuiListItemText-primary": {
                                  fontSize: "14px",
                                  fontWeight: 700,
                                  color: "#195DCC",
                                },
                              }}
                            >
                              {t("about_us")}
                            </ListItemText>
                            <Divider sx={{ background: "#195DCC" }} />
                          </Stack>
                        </ListItemButton>

                        {urls.map((url) => {
                          return (
                            <ListItemButton
                              component={RouterLink}
                              to={url.path}
                            >
                              <StyledLitItemText>{url.name}</StyledLitItemText>
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </Box>
  );
};

const StyledLitItemText = styled(ListItemText)(() => ({
    '.MuiListItemText-primary': {fontSize: '14px', fontWeight: 700, color: '#A1A1A1'}
}));

export default AboutUs;