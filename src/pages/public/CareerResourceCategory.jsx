import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setProgress } from "../../store/slices/progress";
import ArticleService from "../../services/article.service";
import { Link as RouterLink } from "react-router-dom";
import { helper } from "../../helpers";
import SEO from "../../components/Common/SEO";
import SlideShowAd from "../../components/Home/SlideShowAd";
import bg from "../../assets/backgrounds/revert-curve-bg.png";

const CareerResourceCategory = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(setProgress(50));

    (async () => {
      await ArticleService.getCareerCategories().then((res) =>
        setCategories(res.data)
      );
    })();

    dispatch(setProgress(100));
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      backgroundColor="white"
    >
      <SEO title="Career Resources" />
      <Grid
        item
        xs={12}
        container
        sx={{
          zIndex: 3,
          position: "relative",
          backgroundSize: "100% auto",
          backgroundClip: "content-box",
          backgroundOrigin: "content-box",
        }}
      >
        <Grid
          item
          container
          xs={12}
          sx={{
            position: "relative",
            background: "rgba(33, 37, 41, 0.6)",
            height: {
              xs: "400px",
              sm: "396px",
              md: "450px",
              lg: "607px",
              xl: "646px",
            },
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              zIndex: -1,
            }}
          >
            <SlideShowAd isCareer={true} />
          </Grid>
          <Grid
            container
            item
            xs={12}
            zIndex={9}
            position="absolute"
            padding={0}
            height={{
              xs: "400px",
              sm: "400px",
              md: "400px",
              lg: "559px",
            }}
            justifyContent="center"
            alignItems="center"
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{
            marginTop: {
              xs: "-35px",
              sm: "-66px",
              md: "-88px",
              lg: "-121px",
              xl: "-164px",
            },
            position: "relative",
            backgroundSize: "100% auto",
            backgroundClip: "content-box",
            backgroundImage: `url(${bg})`,
            backgroundOrigin: "content-box",
            height: "100%",
            width: "100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid container width="100%">
            <Grid item xs={12} sx={{ marginTop: "160px" }}>
              <Grid container>
                <Grid item container xs={12} px="30px" pb={2}>
                  <Container maxWidth="xl">
                    <Grid
                      item
                      xs={12}
                      minHeight="180px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid container spacing={2}>
                        {categories.length > 0 && (
                          <Grid item xs={12}>
                            <Grid
                              container
                              spacing={4}
                              sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {categories.map((category, index) => {
                                return (
                                  <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    lg={2.5}
                                    key={category.uuid}
                                  >
                                    <Card
                                      elevation={2}
                                      sx={{
                                        borderRadius: "10px",
                                        mb: "20px",
                                        cursor: "pointer",
                                        "&:hover": {
                                          boxShadow: 7,
                                        },
                                        alignItems: "center",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <CardActionArea
                                        component={RouterLink}
                                        to={`/career-resources/${helper.slug(
                                          category?.title
                                        )}/${category.uuid}/articles`}
                                        sx={{
                                          justifyContent: "center",
                                          display: "flex",
                                          flexDirection: "column",
                                          pt: 3,
                                        }}
                                      >
                                        <CardMedia
                                          component="img"
                                          image={`${category.image}`}
                                          height="50%"
                                          alt="category"
                                          sx={{
                                            height: 100,
                                            width: 100,
                                            align: "center",
                                          }}
                                        />
                                        <CardContent>
                                          <Stack>
                                            <Box
                                              sx={{
                                                minHeight: "70px",
                                                maxHeight: "70px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                alignItems: "center",
                                                display: "flex",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <Typography
                                                sx={{ fontWeight: 500 }}
                                              >
                                                {category?.title}
                                              </Typography>
                                            </Box>
                                          </Stack>
                                        </CardContent>
                                      </CardActionArea>
                                    </Card>
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Container>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CareerResourceCategory;
