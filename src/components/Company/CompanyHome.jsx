import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CompanyImageDataService from "../../services/company.image.service";
import CompanyVideoDataService from "../../services/company.video.service";
import CompanyJobPostDataService from "../../services/company.job.post.service";
import CompanyPromotionService from "../../services/company.promotion.service";
import { Link as RouterLink } from "react-router-dom";
import ReactPlayer from "react-player";

const CompanyHome = ({ company, changeTab, borderRadius = true }) => {
  const jobsTab = "Jobs";
  const videoTab = "Video";
  const photosTab = "Photos";
  const url = process.env.REACT_APP_URL;
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (company.uuid) {
      (async () => {
        await CompanyImageDataService.all(company.uuid, {
          limit: 3,
          offset: 0,
        }).then((r) => setImages(r.data));

        await CompanyVideoDataService.all(company.uuid, {
          limit: 1,
          offset: 0,
        }).then((r) => setVideos(r.data));

        await CompanyPromotionService.all(company.uuid, {
          limit: 3,
          offset: 0,
        }).then((r) => setPromotions(r.data));

        await CompanyJobPostDataService.all(company.uuid, {
          limit: 4,
          offset: 0,
        }).then((r) => setJobPosts(r.data));
      })().then(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [company.uuid]);

  const Image = React.memo(({ src, alt }) => {
    return (
      <Avatar
        variant="rounded"
        alt={alt}
        src={`${url}/storage/employerImage/${src}`}
        sx={{
          width: { xs: 300, sm: 225, md: 240, lg: 270, xl: 335 },
          height: { xs: 200, sm: 150, md: 160, lg: 170, xl: 200 },
          borderRadius: '10px'
        }}
        loading="lazy"
      />
    );
  });

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        borderRadius: borderRadius ? "10px" : "0",
        boxShadow: borderRadius
          ? "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)"
          : "0",
        backgroundColor: "white",
      }}
    >
      <Grid container mb={2}>
        <Grid item xs={12}>
          <Typography
            style={{
              textDecoration: "underline",
              color: "#333333",
            }}
            variant="h6"
          >
            About Company
          </Typography>

          <Typography sx={{ py: 2 }} style={styles.tabContent}>
            {company.about_us}
          </Typography>

          <Divider />
        </Grid>
      </Grid>

      {!loading && images.length > 0 && (
        <Grid container mb={1}>
          <Grid container item xs={12} spacing={3}>
            {images.map((item) => (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                key={item.uuid}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image src={item.image} alt={item.name} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems={"center"} justifyContent="center">
              <Button onClick={() => changeTab(photosTab)} variant="text">
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    py: 2,
                    textAlign: "center",
                    color: "#000000",
                    pr: 1,
                  }}
                  style={{ cursor: "pointer" }}
                >
                  See all photos
                </Typography>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "small",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {!loading && videos.length > 0 && (
        <Grid container mb={1}>
          <Grid item xs={12}>
            {videos.map((item) => (
              <Card
                key={item.uuid}
                sx={{
                  height: {
                    xs: "170px",
                    sm: "400px",
                    lg: "455px",
                    xl: "590px",
                  },
                  borderRadius: '10px'
                }}
              >
                <ReactPlayer
                  url={item.url}
                  width="100%"
                  key={item.uuid}
                  height="100%"
                />
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} mt={1}>
            <Box display="flex" alignItems={"center"} justifyContent="center">
              <Button onClick={() => changeTab(videoTab)} variant="text">
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    py: 2,
                    textAlign: "center",
                    color: "#000000",
                    pr: 1,
                  }}
                  style={{ cursor: "pointer" }}
                >
                  See all videos
                </Typography>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "small",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {!loading && jobPosts.length > 0 && (
        <Grid container mb={1}>
          <Grid item xs={12} mb={3}>
            <Typography sx={{ textDecoration: "underline" }} variant="h6">
              {company.company_name} Jobs
            </Typography>
          </Grid>

          <Grid item container spacing={3} xs={12}>
            {jobPosts.map((item) => (
              <Grid item xs={12} sm={12} md={6} key={item.uuid}>
                <Card
                  elevation={1}
                  sx={{
                    borderRadius: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <CardActionArea
                    component={RouterLink}
                    to={`/jobs/${item.uuid}/detail`}
                  >
                    <Grid container spacing={2} paddingX={2}>
                      <Grid
                        item
                        xs={4}
                        md={4}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Box
                          sx={{
                            width: "110px",
                            minHeight: "80px",
                            maxHeight: "110px",
                          }}
                        >
                          <Card
                            elevation={0}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              sx={{
                                background: "#FFFFFF",
                                width: "100px",
                                height: "100px",
                                borderRadius: "4px",
                              }}
                              variant="square"
                              src={`${url}/storage/logo/${item.company.logo}`}
                            />
                          </Card>
                        </Box>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <Stack
                          direction={"row"}
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ p: 3 }}
                          maxHeight="167px"
                          minHeight="167px"
                        >
                          <Box sx={{ maxWidth: "90%" }}>
                            <Typography
                              style={styles.tabHeader}
                              sx={{
                                fontWeight: "500",
                                color: "#000000",
                                fontSize: "20px",
                                maxHeight: "90px",
                                overflow: "hidden",
                                maxWidth: "100%",
                              }}
                              noWrap={true}
                            >
                              {item.job_title}
                            </Typography>
                            {(item.region?.title || item.township?.title) && (
                              <Typography
                                style={styles.tabContent}
                                sx={{ color: "#A1A1A1" }}
                              >
                                {item.township?.title} | {item.region?.title}
                              </Typography>
                            )}
                          </Box>
                          <ArrowForwardIosIcon
                            sx={{
                              color: "#000000",
                              fontWeight: "200",
                            }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} mt={1}>
            <Box display="flex" alignItems={"center"} justifyContent="center">
              <Button onClick={() => changeTab(jobsTab)}>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    py: 2,
                    textAlign: "center",
                    color: "#000000",
                    pr: 1,
                  }}
                  style={{ cursor: "pointer" }}
                >
                  See all jobs
                </Typography>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "small",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {!loading && promotions.length > 0 && (
        <Grid container mb={1}>
          <Grid item xs={12} mb={3}>
            <Typography sx={{ textDecoration: "underline" }} variant="h6">
              {company.company_name} Products & Promotions
            </Typography>
          </Grid>

          <Grid container item xs={12} spacing={3}>
            {promotions.map((item) => (
              <Fragment key={item.uuid}>
                {item.type === 2 ? (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    key={item.uuid}
                    sx={{ marginBottom: 3 }}
                  >
                    <Stack>
                      <Card sx={{ borderRadius: '10px' }}>
                        <CardMedia>
                          <ReactPlayer
                            url={item.video_link}
                            width="100%"
                            height="220px"
                          />
                        </CardMedia>
                      </Card>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          textAlign: "center",
                          fontWeight: "400",
                          mt: 2.3,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Stack>
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    key={item.uuid}
                    sx={{ marginBottom: 3 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Grid
                        container
                        item
                        xs={12}
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          variant="rounded"
                          alt={item.title ?? "Title"}
                          src={`${url}/storage/promotions/${item.file_name}`}
                          sx={{
                            width: {
                              xs: 300,
                              sm: 225,
                              md: 240,
                              lg: 270,
                              xl: 335,
                            },
                            height: {
                              xs: 200,
                              sm: 150,
                              md: 160,
                              lg: 170,
                              xl: 200,
                            },
                            borderRadius: '10px'
                          }}
                          loading="lazy"
                        />
                      </Grid>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          textAlign: "center",
                          fontWeight: "400",
                          mt: 2.3,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Fragment>
            ))}
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2}>
        <Grid xs={12} item>
          <Typography
            style={{
              ...styles.tabHeader,
              textDecoration: "underline",
            }}
          >
            Location
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
            {company.street ? company.street + ', ' : null }
            {company?.township?.title ? company.township.title + ', ' : null}
            {company?.region?.title ? company.region.title + ', ' : null}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyHome;

const styles = {
  companyName: {
    fontSize: "24px",
    fontWeight: "500",
    color: "#FFFFF",
    fontStyle: "normal",
  },
  companyInfo: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#FFFFF",
  },
  package: {
    fontSize: "16px",
    fontWeight: " 300",
  },
  text: {
    fontSize: "16px",
    fontWeight: "400",
  },
  tabHeader: {
    fontSize: "20px",
    fontWeight: "500",
  },
  tabContent: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "20px",
  },
  sideContent: {
    fontSize: "14px"
  },
};