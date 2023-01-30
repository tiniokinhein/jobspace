import React, { useEffect, useState } from "react";
import {
  ButtonBase,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import TotalApplicationLogo from "../../assets/icons/tot_application.svg";
import NewApplicationLogo from "../../assets/icons/new_application.svg";
import VacanciesLogo from "../../assets/icons/vacancy.svg";
import AppInfoDataService from "../../services/app.info.service";
import { Link as RouterLink } from "react-router-dom";

const StyledCard = styled(Card)(() => ({
  maxHeight: 150,
  minHeight: 150,
  borderRadius: "10px",
  textDecoration: "none",
  "&:hover": {
    boxShadow:
      "0px 6px 30px 2px rgb(163 191 255 / 50%)," +
      "0px 10px 14px 1px rgb(163 191 255 / 40%)," +
      "0px 4px 18px 3px rgb(163 191 255 / 37%);",
  },
  border: "none",
  boxShadow:
    "0px 6px 30px 2px rgb(163 191 255 / 30%)," +
    "0px 10px 14px 1px rgb(163 191 255 / 20%)," +
    "0px 4px 18px 3px rgb(163 191 255 / 17%);",
}));

const StyledTitle = styled(Typography)(() => ({
  display: {
    sm: "none",
    md: "block",
  },
  fontWeight: 300,
  color: "#333333",
  fontSize: 16,
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineClamp: 1,
  width: "160px",
}));

const ApplicationList = () => {
  const [appInfo, setAppInfo] = useState();

  useEffect(() => {
    (async () => {
      await AppInfoDataService.get().then((r) => {
        setAppInfo(r.data);
      });
    })();
  }, []);

  return (
    <Grid item container xs={12} px="30px" py={4}>
      <Container maxWidth="xl">
        <Grid
          item
          xs={12}
          container
          spacing={3}
          minHeight="180px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4} md={3} mt={0}>
            <StyledCard>
              <ButtonBase
                sx={{
                  width: "100%",
                  "&:hover": { background: "transparent" },
                }}
                component={RouterLink}
                to="/employers/applicants"
              >
                <CardContent>
                  <Stack
                    direction="column"
                    height={120}
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      alt="total application"
                      src={TotalApplicationLogo}
                      width="35"
                      height="35"
                    />
                    <StyledTitle noWrap align="center">
                      Total Applications
                    </StyledTitle>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      fontSize="12px"
                    >
                      ({appInfo?.total_application} Applications)
                    </Typography>
                  </Stack>
                </CardContent>
              </ButtonBase>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={4} md={3} mt={0}>
            <StyledCard>
              <ButtonBase
                sx={{
                  width: "100%",
                  "&:hover": { background: "transparent" },
                }}
                component={RouterLink}
                to="/employers/applicants"
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack
                    direction="column"
                    height={120}
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      alt="total application"
                      src={NewApplicationLogo}
                      width="35"
                      height="35"
                    />
                    <StyledTitle noWrap align="center">
                      New Applications
                    </StyledTitle>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      fontSize="12px"
                    >
                      ({appInfo?.new_application} Applications)
                    </Typography>
                  </Stack>
                </CardContent>
              </ButtonBase>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={4} md={3} mt={0}>
            <StyledCard>
              <ButtonBase
                sx={{
                  width: "100%",
                  "&:hover": { background: "transparent" },
                }}
                component={RouterLink}
                to="/employers/posted-jobs#all-listing"
              >
                <CardContent>
                  <Stack
                    direction="column"
                    height={120}
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      alt="total application"
                      src={VacanciesLogo}
                      width="35"
                      height="35"
                    />
                    <StyledTitle noWrap align="center">
                      Total Job Post
                    </StyledTitle>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                      fontSize="12px"
                    >
                      ({appInfo?.total_job_post} Vacancies)
                    </Typography>
                  </Stack>
                </CardContent>
              </ButtonBase>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default ApplicationList;