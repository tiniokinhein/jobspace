import React, {useCallback, useEffect} from "react";
import {Avatar, Box, Card, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {personalInfoActions} from "../../../store";

const SeekerProfileShow = () => {
  const dispatch = useDispatch();

  const { personal_info: PersonalInfo } = useSelector(
    (state) => state.personal_info
  );

  const initFetch = useCallback(() => {
    dispatch(personalInfoActions.get());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="start"
      alignItems="center"
      sx={{
        px: { xs: 2, sm: 4 },
        py: 3,
      }}
    >
      <Grid item xs={12} md={8} lg={8} xl={8}>
        <Box mb={3}>
          {PersonalInfo?.profile_img && (
            <Card
              sx={{
                maxWidth: 134,
                maxHeight: 134,
                minWidth: 134,
                minHeight: 134,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  background: "#FFFFFF",
                  width: "134px",
                  height: "134px",
                }}
                variant="square"
                src={PersonalInfo?.profile_img}
              />
            </Card>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={8} lg={8} xl={8} container pt={2} spacing={3}>
        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Full Name
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.full_name}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Email ID
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 500,
              color: "#585858",
              lineBreak: "anywhere",
            }}
          >
            {PersonalInfo?.email}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Mobile Number
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.phone_no}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            NRC or Passport Number
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.nrc ?? "---"}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Nationality
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.nationality?.title ?? "---"}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Date of Birth
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.dob ?? "---"}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Address
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.street ? PersonalInfo?.street + ", " : null}
            {PersonalInfo?.township?.title
              ? PersonalInfo.township.title + ", "
              : null}
            {PersonalInfo?.region?.title
              ? PersonalInfo?.region?.title + ", "
              : null}
            {PersonalInfo?.country?.title ? PersonalInfo?.country?.title : null}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Short Bio
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.short_bio ?? "---"}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Marital Status
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.marital === 1 ? "Single" : "Married"}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#333333" }}
          >
            Gender
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ py: 1 }}>
          :
        </Grid>
        <Grid item xs={7} sx={{ py: 1 }}>
          <Typography
            sx={{ fontSize: "15px", fontWeight: 500, color: "#585858" }}
          >
            {PersonalInfo?.gender === 1 ? "Male" : "Female"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SeekerProfileShow;