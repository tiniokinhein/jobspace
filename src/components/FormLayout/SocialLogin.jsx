import React, { useCallback, useEffect } from "react";
import { Button, Divider, Grid, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/icons/linkedin.svg";
import { useDispatch, useSelector } from "react-redux";
import { socialUrlActions } from "../../store";

const SocialLogin = () => {
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(socialUrlActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const { social_urls: SocialUrls } = useSelector((x) => x.social_urls);

  const handleClickGoogleLogin = () => {
    const url = SocialUrls && (SocialUrls.google ?? null);

    if (url) {
      window.location.href = url;
    }
  };

  const handleClickFacebookLogin = () => {
    const url = SocialUrls && (SocialUrls.facebook ?? null);

    if (url) {
      window.location.href = url;
    }
  };

  const handleClickLinkedInLogin = () => {
    const url = SocialUrls && (SocialUrls.linkedin ?? null);

    if (url) {
      window.location.href = url;
    }
  };

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Typography fontSize={16} color="text.secondary">Sign in with</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="outlined"
          color="grey"
          size="large"
          onClick={handleClickGoogleLogin}
          startIcon={
            <SvgIcon>
              <GoogleIcon width={25} height={25} />
            </SvgIcon>
          }
        >
          Google
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="outlined"
          color="grey"
          onClick={handleClickFacebookLogin}
          size="large"
          startIcon={
            <SvgIcon>
              <FacebookIcon width={25} height={25} />
            </SvgIcon>
          }
        >
          Facebook
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="outlined"
          color="grey"
          onClick={handleClickLinkedInLogin}
          size="large"
          startIcon={
            <SvgIcon>
              <LinkedInIcon width={25} height={25} />
            </SvgIcon>
          }
        >
          LinkedIn
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider spacing={2} style={{ width: "100%" }}>
          <Typography sx={{ color: "#A1A1A1" }}>OR</Typography>
        </Divider>
      </Grid>
    </Grid>
  );
};

export default SocialLogin;
