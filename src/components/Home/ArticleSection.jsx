import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import RightStar from "../../assets/images/right-pm-star.svg";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PromotedArticleService from "../../services/promoted.article.service";
import { helper } from "../../helpers";

const ArticleSection = ({ isShowBorder, isShowBtn }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [articles, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleClick = (article) => {
    navigate(
      `/news-and-events/${helper.slug(article?.name)}/${article.uuid}/detail`
    );
  };

  useEffect(() => {
    (async () => {
      await PromotedArticleService.all({ limit: 3, offset: 0 }).then((res) => {
        setArticle(res.data);
        setLoading(false);
      });
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {articles.length > 0 && (
        <Box
          sx={{
            py: 2,
            borderRadius: "5px",
            border: isShowBorder ? "1px solid #EBEBEB" : "0px",
          }}
        >
          <Grid container py={2}>
            <Grid item xs={12} width="100%" px={{ lg: "30px", xl: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="column" spacing={1} alignItems="center">
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      spacing={0}
                    >
                      <Typography align="center" variant="h6">
                        Read
                      </Typography>
                      <img src={RightStar} alt="primary star" width="100%" />
                    </Stack>
                    <Typography
                      variant="h3"
                      pt="20px"
                      fontWeight={500}
                      fontSize={{ xs: "2rem", md: "3rem" }}
                      color="#FF9635"
                    >
                      {t("trending_topic")}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={300}
                      fontSize={{ xs: "0.75rem", md: "1.25rem" }}
                    >
                      {t("stay_informed")}
                    </Typography>
                  </Stack>
                </Grid>

                {loading && (
                  <Grid item xs={12}>
                    <Grid container>
                      <Stack spacing={1}>
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={118}
                        />
                        <Skeleton variant="text" />
                      </Stack>
                    </Grid>
                  </Grid>
                )}

                {!loading && articles.length > 0 && (
                  <Grid item xs={12}>
                    <Grid container spacing={6}>
                      {articles.map((article) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          key={article.uuid}
                          onClick={() => {
                            handleClick(article);
                          }}
                        >
                          <Card
                            sx={{
                              mb: "20px",
                              border: 0,
                              "&:hover": {
                                boxShadow: 5,
                              },
                              borderRadius: "10px",
                            }}
                            elevation={2}
                          >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                image={article.image}
                                alt={article.name}
                                height="300"
                              />
                            </CardActionArea>
                          </Card>
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: 500,
                              textAlign: "center",
                              "&:hover": {
                                fontWeight: 600,
                                cursor: "pointer",
                              },
                            }}
                          >
                            {article.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}

                <Grid item xs={12}>
                  {isShowBtn ? (
                    <Button
                      sx={{
                        background:
                          "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                      }}
                      variant="contained"
                    >
                      View More New&nbsp;&nbsp;&gt;&gt;
                    </Button>
                  ) : (
                    <Typography align="center">
                      <Link
                        to="/news-and-events"
                        component={RouterLink}
                        color="inherit"
                        underline="hover"
                      >
                        Show All&nbsp;&nbsp;&gt;&gt;
                      </Link>
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Fragment>
  );
};

export default ArticleSection;