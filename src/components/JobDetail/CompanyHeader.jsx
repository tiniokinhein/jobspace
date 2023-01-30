import React, { Fragment } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import ClickAwayService from "../../services/click.away.service";

const CompanyHeader = ({ jobDetail }) => {
    const handleClickAway = (url) => {
    if (url && jobDetail.company?.uuid) {
      ClickAwayService.get(jobDetail.company?.uuid).then(() => {
        window.open(url, "_blank");
      });
    }
  };

  return (
    <>
      {Object.keys(jobDetail).length > 0 && (
        <Fragment>
          {jobDetail.company && (
            <Grid
              item
              xs={12}
              justifyContent="flex-start"
              alignItems="flex-end"
              display="flex"
              sx={{
                height: jobDetail.company?.banner ? "363px" : "auto",
                background: jobDetail.company?.banner
                  ? `url(
                                    ${process.env.REACT_APP_URL}/storage/banner/${jobDetail.company?.banner} )`
                  : "linear-gradient(90.48deg, rgba(45, 93, 212, 0.2) 0%, rgba(33, 39, 127, 0.2) 99.91%)",
                backgroundPosition: "center",
                backgroundSize: "100% auto",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Container maxWidth="xl">
                <Box paddingY={3} sx={{ paddingX: { lg: "30px", xl: 0 } }}>
                  <Card
                    sx={{
                      display: "flex",
                      minWidth: "300px",
                      alignItems: "center",
                      padding: "15px",
                      maxWidth: "470px",
                      borderRadius: "10px",
                    }}
                    elevation={1}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={3}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Avatar
                          sx={{
                            background: "#FFFFFF",
                            width: "100px",
                            height: "100px",
                            borderRadius: "5px",
                          }}
                          variant="square"
                          src={`${process.env.REACT_APP_URL}/storage/logo/${jobDetail.company?.logo}`}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Box sx={{ display: "flex", height: "100%" }}>
                          <CardContent sx={{ p: 0, height: "100%" }}>
                            <Stack
                              sx={{
                                justifyContent: "flex-start",
                                height: "100%",
                                display: "flex",
                                alignItems: "flex-start",
                              }}
                              spacing={1}
                            >
                              <Typography fontSize="18px" component="div">
                                <Link
                                  component={RouterLink}
                                  to={`/companies/${jobDetail.company?.uuid}/details`}
                                  underline="hover"
                                  fontWeight={600}
                                  color="inherit"
                                >
                                  {jobDetail.company?.company_name}
                                </Link>
                              </Typography>

                              {jobDetail.company?.township &&
                              jobDetail.company?.region ? (
                                <Stack
                                  direction="row"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                  }}
                                >
                                  <PlaceIcon fontSize="12px" />
                                  &nbsp;
                                  <Typography
                                    variant="span"
                                    fontSize="14px"
                                    color="text.secondary"
                                    component="div"
                                    fontWeight={500}
                                  >
                                    {jobDetail.company?.township?.title}
                                    &nbsp;,&nbsp;
                                    {jobDetail.company?.region?.title}
                                  </Typography>
                                </Stack>
                              ) : null}

                              {jobDetail.company?.website && (
                                <Typography
                                  variant="span"
                                  fontSize="14px"
                                  color="secondary"
                                  sx={{
                                    cursor: "pointer",
                                    ":hover": { textDecoration: "underline" },
                                    fontWeight: 500,
                                  }}
                                  onClick={() =>
                                    handleClickAway(jobDetail.company?.website)
                                  }
                                >
                                  {jobDetail.company.website}
                                </Typography>
                              )}
                            </Stack>
                          </CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pb: 1,
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>
              </Container>
            </Grid>
          )}
        </Fragment>
      )}
    </>
  );
};

export default CompanyHeader;
