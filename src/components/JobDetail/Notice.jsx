import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AdDataService from "../../services/ad.service";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NoticeBg from "../../assets/backgrounds/notice-bg.png";

const Notice = ({ warn }) => {
  const [ad, setAd] = useState({});
  const { isLoggedIn } = useSelector((x) => x.auth);

  useEffect(() => {
    (async () => {
      await AdDataService.get("/fifth-ad").then((r) => setAd(r.data));
    })();
  }, []);

  return (
    <Fragment>
      {(warn || Object.keys(ad).length > 0) && (
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              marginTop: { xs: 3, md: 0 },
              display: { xs: "none", md: "flex" },
            }}
          >
            {Object.keys(ad).length > 0 ? (
              <Box width="100%" height="auto">
                {ad.type === 2 ? (
                  <Card
                    elevation={2}
                    sx={{
                      maxHeight: "469px",
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  >
                    <CardMedia
                      component="video"
                      width="100%"
                      height="100%"
                      loop
                      autoPlay
                      muted
                      image={`${ad.file}`}
                    />
                  </Card>
                ) : (
                  <Card
                    elevation={2}
                    sx={{
                      width: "100%",
                      maxHeight: "435px",
                      borderRadius: "10px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        objectFit: "fill",
                        borderRadius: "10px",
                      }}
                      width="100%"
                      height="100%"
                      image={ad.file ?? "#"}
                      alt="ADS"
                    />
                  </Card>
                )}
              </Box>
            ) : (
              warn &&
              (isLoggedIn ? (
                <Box
                  sx={{
                    borderRadius: "10px",
                    maxWidth: "343px",
                    height: "358px",
                    maxHeight: "358px",
                    backgroundImage: `url(${NoticeBg})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    boxShadow: 2,
                  }}
                >
                  <Stack
                    spacing={3}
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                    sx={{ height: '100%', px: 1.2 }}
                  >
                    <Typography
                      fontWeight={500}
                      fontSize="24px"
                      color="error"
                      align="center"
                    >
                      Update Your Profile!
                    </Typography>

                    <Typography
                      fontSize="18px"
                      color="error"
                      align="center"
                      lineHeight="30px"
                    >
                      Sorry, unable to apply, your CV Profile has to be over 60%
                      and MUST include (1) Any Working History and (2) What You
                      Can Work - so more Employers can offer you jobs!
                    </Typography>

                    <Button
                      component={RouterLink}
                      variant="contained"
                      size="large"
                      color="success"
                      sx={{ width: "170px", borderRadius: "8px" }}
                      to="/seekers/account"
                    >
                      Update Profile
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Box
                  sx={{
                    py: 3,
                    background: "#FF9635",
                    boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "8px",
                    maxWidth: "343px",
                    width: "343px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        md: "25px",
                        lg: "30px",
                        xl: "30px",
                      },
                      fontWeight: "500",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    Employers ‘ll
                    <br />
                    Get You Noticed
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#fff",
                      textAlign: "center",
                      my: 2,
                    }}
                  >
                    NEW TO JOBSPACE?
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#fff",
                      textAlign: "center", // marginTop: '10px'
                      my: 2,
                    }}
                  >
                    REGISTER WITH US
                  </Typography>

                  <Divider
                    color="#FFFFF"
                    spacing={2}
                    style={{ width: "100%" }}
                    sx={{ my: 2 }}
                  >
                    <Typography sx={{ color: "#FFFF" }}>OR</Typography>
                  </Divider>

                  <Box display={"flex"} justifyContent="center" sx={{ py: 2 }}>
                    <Button
                      align="center"
                      sx={{
                        background:
                          "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "500",
                        borderRadius: "5px",
                        py: {
                          md: 2,
                          lg: 3,
                        },
                        px: {
                          md: 3,
                          lg: 4,
                        },
                      }}
                      component={RouterLink}
                      to="/seekers/upload-cv"
                    >
                      Upload Your CV
                    </Button>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    We will create your profile
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Grid>
      )}
    </Fragment>
  );
};

export default Notice;
