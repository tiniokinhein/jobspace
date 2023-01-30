import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import cardBg from "../../../assets/images/card-bg.png";
import startLogo from "../../../assets/images/star-logo.png";
import { ReactComponent as RocketIcon } from "../../../assets/icons/rocket.svg";
import { useSelector } from "react-redux";
import AdDataService from "../../../services/ad.service";
import { history } from "../../../helpers";

const FirstAd = () => {
  const [ad, setAd] = useState({});
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isEmpLoggedIn } = useSelector((state) => state.empAuth);

  useEffect(() => {
    (async () => {
      await AdDataService.get("/first-ad").then((r) => setAd(r.data));
    })();
  }, []);

  const handleClick = () => {
    if (isEmpLoggedIn) {
      history.navigate("/employers/post-job");
    } else {
      if (isLoggedIn) {
        history.navigate("/seekers/upload-cv");
      } else {
        history.navigate("/seekers/sign-in");
      }
    }
  };

  return (
    <Box
      item
      md={3}
      xl={3}
      width="100%"
      component={Grid}
      justifyContent="flex-end"
      display={{ xs: "none", md: "flex" }}
    >
      {Object.keys(ad).length > 0 ? (
        <Box>
          {ad.type === 2 ? (
            <Card
              elevation={0}
              sx={{
                maxHeight: "469px",
                maxWidth: "321px",
                width: "321px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0px 9px 15px 1px rgba(0,0,0,0.1)",
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
              elevation={0}
              variant="outlined"
              sx={{
                maxHeight: "435px",
                maxWidth: "321px",
                width: "321px",
                borderRadius: "10px",
                boxShadow: "0px 10px 13px -2px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  objectFit: "fill",
                  borderRadius: "5px",
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
        <Card
          sx={{
            backgroundImage: `url(${cardBg})`,
            backgroundSize: "100% 100%",
            align: "right",
            minHeight: "393px",
            width: "321px",
            borderRadius: "10px",
            boxShadow: "0px 9px 15px 1px rgba(0,0,0,0.1)",
          }}
          elevation={0}
        >
          <CardContent sx={{ height: "100%" }}>
            <Stack
              direction="column"
              spacing={4}
              alignItems="center"
              justifyContent="space-between"
              height="100%"
            >
              <CardMedia
                component="img"
                sx={{ width: 205, pt: "30px" }}
                image={startLogo}
                alt="ad logo"
              />
              <Typography
                variant="h6"
                color="white"
                align="center"
                lineHeight={2.5}
                letterSpacing={1.5}
              >
                {isEmpLoggedIn ? (
                  <Fragment>
                    Get Best Matched
                    <br />
                    Candidates On your Email.
                    <br />
                    Post Jobs NOW!!
                  </Fragment>
                ) : (
                  <Fragment>
                    Get Best Matched Jobs
                    <br />
                    On your Email. Add
                    <br />
                    CV NOW!!
                  </Fragment>
                )}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
                startIcon={
                  <SvgIcon>
                    <RocketIcon width={25} height={25} />
                  </SvgIcon>
                }
                sx={{ borderRadius: '7px' }}
              >
                {isEmpLoggedIn ? "Post A Job" : "ADD CV"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FirstAd;