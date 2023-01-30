import React from "react";
import { Box, Grid, Link, Stack, Typography } from "@mui/material";
import WhiteLogo from "../../assets/images/white-logo.png";
import WhiteStar from "../../assets/images/white-star.svg";
import Mobile from "../../assets/images/mobile.png";
import { Link as RouterLink } from "react-router-dom";

const LeftMenu = (props) => {
  return (
    <Grid
      item
      md={5}
      sx={{
        display: {
          xs: "none",
          md: "flex",
        },
      }}
      alignItems="center"
      justifyContent="center"
      position="sticky"
    >
      <Box width="70%">
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: "100%",
          }}
          spacing={3}
        >
          <Link component={RouterLink} to="/">
            <img src={WhiteLogo} alt="sign in" />
          </Link>

          <Stack
            spacing={2.8}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Typography
              fontWeight={500}
              color="white"
              align="center"
              fontSize={{ md: '1.5rem', lg: '2.25rem' }}
            >
                Myanmar’s Most
              <br />
              <span style={{ fontWeight: 700 }}>Reliable Job Site</span>
            </Typography>

            <img src={WhiteStar} alt="start" width="40%" />

            <Typography variant="body1" fontWeight={500} color="white" fontSize={{ md: '14px', lg: '16px' }}>
              {props.title}
            </Typography>
          </Stack>

          <Box
            sx={{
              marginLeft: {
                md: "-150px",
                lg: "-150px",
              },
              width: "100%",
              paddingTop: 3
            }}
          >
            <img src={Mobile} alt="mobile" style={{ height: "30vw" }} />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};

export default LeftMenu