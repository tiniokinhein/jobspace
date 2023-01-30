import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AuthFormLayout } from "../../../components/FormLayout/AuthFormLayout";
import LeftMenu from "../../../components/FormLayout/LeftMenu";
import { RoundedFormLayout } from "../../../components/FormLayout/RoundedFormLayout";
import SocialLogin from "../../../components/FormLayout/SocialLogin";
import SeekerSignInForm from "../../../components/FormLayout/SeekerSignInForm";
import { useSelector } from "react-redux";
import { history } from "../../../helpers";

const SeekerSignInPage = () => {
  const title = "Log In to Post Your Resume, Search Jobs";

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) history.navigate("/");
  }, [isLoggedIn]);

  return (
    <AuthFormLayout>
      <LeftMenu title={title} />

      <RoundedFormLayout>
        <Box
          sx={{
            width: {
              sm: "400px",
              md: "400px",
              lg: "532px",
            },
          }}
        >
          <Grid
            spacing={{ xs: 4, sm: 2, xl: 4 }}
            container
            py={{ xs: "50px", sm: "20px", md: "50px" }}
            px={{ xs: "30px", md: "0px" }}
          >
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight={500}>
                Welcome!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <SocialLogin />
            </Grid>

            <Grid item xs={12}>
              <SeekerSignInForm />
            </Grid>
          </Grid>
        </Box>
      </RoundedFormLayout>
    </AuthFormLayout>
  );
};

export default SeekerSignInPage;