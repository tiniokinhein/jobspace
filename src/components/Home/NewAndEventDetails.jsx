import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { helper, history } from "../../helpers";
import ArticleService from "../../services/article.service";
import { setProgress } from "../../store/slices/progress";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Parser } from "html-to-react";
import SEO from "../Common/SEO";
import BackgroundImg from "../../assets/backgrounds/dot-bg.png";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTranslation } from "react-i18next";

const NewAndEventDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const path = window.location.href;
  const url = process.env.REACT_APP_URL;
  const [type, setType] = useState(0);
  const [apiData, setApiData] = useState("");
  const [dataLimit, setDataLimit] = useState(5);
  const [articleDetail, setArticleDetail] = useState({});
  const [description, setDescription] = useState(null);

  const title = path.includes("news-and-events")
    ? t("news_&_events")
    : path.includes("partner-networks")
    ? t("partner_networks")
    : t("career_programs");

  useEffect(() => {
    if (!params.articleId) {
      history.navigate("/404");
    }
    dispatch(setProgress(50));

    (async () => {
      await ArticleService.getByUuid(params.articleId)
        .then((r) => {
          setArticleDetail(r.data);
          setType(r?.data?.type);

          let doc = new DOMParser().parseFromString(r.data.content, 'text/html')

          setDescription(doc.querySelector('p').textContent);

          ArticleService.all({
            limit: dataLimit,
            type: r?.data?.type,
            except: params.articleId,
          }).then((res) => {
            const metadata = res.metadata;
            setDataLimit(metadata.info.limit);
            setApiData(res.data);
          });
        })
        .catch((e) => {
          if (e.response.status === 404) history.navigate("/404");
        });
    })();

    dispatch(setProgress(100));

    // eslint-disable-next-line
  }, [params.articleId]);

  return (
    <Fragment>
      <SEO title={articleDetail?.name ?? ""} description={description} image={`${url}/storage/articles/${articleDetail?.image}`}/>
      {articleDetail && (
        <Box
          sx={{
            backgroundImage: `url(${BackgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "content-box",
          }}
        >
          <Container maxWidth="xl">
            <Box paddingY={3} sx={{ paddingX: { lg: "30px", xl: 0 } }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card elevation={2} sx={{ borderRadius: "10px" }}>
                    <CardContent sx={{ p: "30px" }}>
                      <Stack direction="column" spacing={3}>
                        <Stack sx={{ height: "100%" }} spacing={6}>
                          <Typography
                            gutterBottom
                            variant="span"
                            sx={{
                              position: "relative",
                              fontWeight: 600,
                              fontSize: "0.9em",
                              textTransform: "uppercase",
                              letterSpacing: "0.3em",
                              overflow: "hidden",
                              "&:before": {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                bottom: 0,
                                height: "2px",
                                width: "4em",
                                backgroundColor: "#000000",
                                animation: "slide-in 1s ease-in both 0.5s",
                              },
                            }}
                          >
                            {title}
                          </Typography>

                          <Box>
                            <Typography
                              gutterBottom
                              variant="span"
                              sx={{
                                display: "inline-block",
                                marginBottom: "0.5em",
                                fontWeight: 600,
                                fontSize: "0.8em",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                              }}
                            >
                              {helper.dateString(articleDetail.updated_at)}
                            </Typography>

                            <Stack direction="row">
                              <Box sx={{ width: "85%" }}>
                                <Typography
                                  gutterBottom
                                  variant="h4"
                                  fontWeight={900}
                                >
                                  {articleDetail.name}
                                </Typography>
                              </Box>

                              <Stack
                                direction="row"
                                sx={{
                                  height: "100%",
                                  width: "15%",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <FacebookShareButton
                                  url={path}
                                  quote={articleDetail?.name ?? ""}
                                  hashtag={"#JobSpace"}
                                  description={
                                    "Myanmar’s Fastest Growing Job Site"
                                  }
                                  className="share-btn"
                                >
                                  <Tooltip title="Share on Facebook">
                                    <FacebookIcon
                                      sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                                    />
                                  </Tooltip>
                                </FacebookShareButton>

                                <LinkedinShareButton
                                  url={path}
                                  quote={title}
                                  hashtag={"#JobSpace"}
                                  description={
                                    "Myanmar’s Fastest Growing Job Site"
                                  }
                                  className="share-btn"
                                >
                                  <Tooltip title="Share on LinkedIn">
                                    <LinkedInIcon
                                      sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                                    />
                                  </Tooltip>
                                </LinkedinShareButton>

                                <TwitterShareButton
                                  url={path}
                                  quote={title}
                                  hashtag={"#JobSpace"}
                                  description={
                                    "Myanmar’s Fastest Growing Job Site"
                                  }
                                  className="share-btn"
                                >
                                  <Tooltip title="Share on Twitter">
                                    <TwitterIcon
                                      sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                                    />
                                  </Tooltip>
                                </TwitterShareButton>
                              </Stack>
                            </Stack>
                          </Box>
                        </Stack>

                        <Card
                          sx={{ maxHeight: "350px", height: "350px" }}
                          elevation={0}
                        >
                          <CardMedia
                            component="img"
                            image={`${url}/storage/articles/${articleDetail.image}`}
                            sx={{
                              height: "100%",
                              width: "100%",
                              objectFit: "contain",
                              borderRadius: "20px",
                            }}
                          />
                        </Card>

                        <Box>{Parser().parse(articleDetail.content)}</Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Box
                  component={Grid}
                  item
                  md={4}
                  display={{ xs: "none", md: "block" }}
                >
                  <Card elevation={2} sx={{ borderRadius: "10px" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Recent Posts
                      </Typography>
                      <Divider />
                      {apiData.length > 0 &&
                        apiData.map((item) => (
                          <Box key={item.uuid} my={2} sx={{ width: "100%" }}>
                            <CardActionArea
                              component={RouterLink}
                              to={`${
                                type === 2
                                  ? "/news-and-events/"
                                  : "/career-resources/"
                              }${helper.slug(item?.name)}/${item.uuid}/detail`}
                              sx={{ px: 1, borderRadius: "4px" }}
                            >
                              <ListItem sx={{ px: 0 }}>
                                <ListItemAvatar sx={{ minWidth: 150 }}>
                                  <Avatar
                                    src={`${url}/storage/articles/${item.image}`}
                                    alt={item.name}
                                    sx={{ width: 110, height: 60 }}
                                    variant="rounded"
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  sx={{
                                    ".MuiListItemText-primary": {
                                      mb: 1,
                                    },
                                  }}
                                  primary={item.name}
                                  secondary={helper.dateString(item.updated_at)}
                                />
                              </ListItem>
                            </CardActionArea>
                            <Divider sx={{ marginTop: 2, width: "100%" }} />
                          </Box>
                        ))}
                      <Stack display="flex" flexDirection="row-reverse">
                        <Link
                          component={RouterLink}
                          to={`${
                            type === 2
                              ? "/news-and-events"
                              : type === 3
                              ? "/partner-networks"
                              : "/career-resources"
                          }`}
                          sx={{
                            fontSize: "14px",
                            textAlign: "right",
                            padding: 2,
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                        >
                          Show More
                        </Link>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Box>
          </Container>
        </Box>
      )}
    </Fragment>
  );
};

export default NewAndEventDetails;
