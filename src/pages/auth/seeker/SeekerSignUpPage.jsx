import React from 'react';
import {Box, Grid, Link, Typography} from "@mui/material";
import {AuthFormLayout} from "../../../components/FormLayout/AuthFormLayout";
import SeekerSignUpForm from "../../../components/FormLayout/SeekerSignUpForm";
import SocialLogin from "../../../components/FormLayout/SocialLogin";
import LeftMenu from "../../../components/FormLayout/LeftMenu";
import {RoundedFormLayout} from "../../../components/FormLayout/RoundedFormLayout";
import { Link as RouterLink } from "react-router-dom";

const SeekerSignUpPage = () => {
  const title =
    "Create your fantastic profile to come true your dream. Register Now!";

  return (
    <AuthFormLayout>
      <LeftMenu title={title} />

      <RoundedFormLayout>
        <Box
          sx={{
            width: {
              sm: "500px",
              md: "500px",
              lg: "541px",
              xl: "600px",
            },
          }}
        >
          <Grid
            container
            spacing={{ xs: 3, md: 0.5, xl: 2 }}
            py={{ xs: "50px", sm: "10px", xl: "30px" }}
            px={{ xs: "30px", md: "0px" }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={700}>
                Create Account
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography fontSize={16} color="text.secondary">
                Get started - it's free.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <SocialLogin />
            </Grid>

            <Grid item xs={12}>
              <SeekerSignUpForm />
            </Grid>

            <Grid item xs={12}>
              <Typography color="text.secondary" align="center">
                Already have an account yet ?&nbsp;&nbsp;
                <Link
                  to="/seekers/sign-in"
                  component={RouterLink}
                  color="secondary"
                  underline="none"
                >
                  Login
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                color="#333333"
                align="center"
                fontWeight={300}
                fontSize={12}
              >
                By creating an account, you agree to our&nbsp;
                <Link to="/terms-of-service" component={RouterLink} color="inherit">
                  Terms of Service
                </Link>
                &nbsp;and&nbsp;
                <Link
                  to="/privacy-and-policy"
                  component={RouterLink}
                  color="inherit"
                >
                  Privacy & Cookie
                </Link>
                &nbsp;Statement.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </RoundedFormLayout>
    </AuthFormLayout>
  );
};

export default SeekerSignUpPage;