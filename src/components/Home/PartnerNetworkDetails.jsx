import React, {Fragment, useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Divider,
    Grid,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import {history} from "../../helpers";
import ArticleService from "../../services/article.service";
import {setProgress} from "../../store/slices/progress";
import {Link as RouterLink, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Parser} from "html-to-react";

const PartnerNetworkDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const type = 3;
  const [articleDetail, setArticleDetail] = useState({});
  const [apiData, setApiData] = useState("");
  const [dataLimit, setDataLimit] = useState(5);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const url = process.env.REACT_APP_URL;

  const fetchArticles = async () => {
    await ArticleService.getByUuid(params.articleId)
      .then((r) => {
        setArticleDetail(r.data);
      })
      .catch((e) => {
        if (e.response.status === 404) history.navigate("/404");
      });
    await ArticleService.all({
      limit: dataLimit,
      offset: 0,
      type: type,
      except: params.articleId,
    }).then((res) => {
      const metadata = res.metadata;

      setApiData(res.data);
      setDataLimit(metadata.info.limit);
    });
  };

  useEffect(() => {
    dispatch(setProgress(0));
    fetchArticles();
    dispatch(setProgress(100));

    // eslint-disable-next-line
  }, [params.articleId]);

  function format(date) {
    date = new Date(date);

    var day = ("0" + date.getDate()).slice(-2);
    var month = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[month] + " " + year;
  }

  return (
    <Fragment>
      {articleDetail && (
        <>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-end"
            display="flex"
            sx={{
              height: articleDetail.image ? "363px" : "auto",
              background: articleDetail.image
                ? `url(${url}/storage/articles/${articleDetail.image})`
                : "linear-gradient(90.48deg, rgba(45, 93, 212, 0.2) 0%, rgba(33, 39, 127, 0.2) 99.91%)",
              backgroundPosition: "center",
              backgroundSize: "100% auto",
              backgroundRepeat: "no-repeat",
            }}
          ></Grid>
          <Container maxWidth="xl">
            <Box paddingY={3} sx={{ paddingX: { lg: "30px", xl: 0 } }}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Card elevation={1}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {articleDetail.name}
                      </Typography>
                      <Box sx={{ fontSize: "14px" }}>
                        {Parser().parse(articleDetail.content)}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card elevation={1}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Recent Posts
                      </Typography>
                      <Divider />
                      {apiData.length > 0 &&
                        apiData.map((item) => (
                          <Box key={item.uuid} my={2}>
                            <CardActionArea
                              component={RouterLink}
                              to={`/partner-networks/${item.uuid}/detail`}
                            >
                              <ListItem>
                                <ListItemAvatar sx={{ minWidth: 150 }}>
                                  <Avatar
                                    src={`${url}/storage/articles/${item.image}`}
                                    alt={item.name}
                                    sx={{ width: 110, height: 60 }}
                                    variant="square"
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={item.name}
                                  secondary={format(item.updated_at)}
                                />
                              </ListItem>
                            </CardActionArea>
                            <Divider variant="inset" sx={{ marginTop: 2 }} />
                          </Box>
                        ))}
                      <Stack display="flex" flexDirection="row-reverse">
                        <Link
                          component={RouterLink}
                          to={`/partner-networks`}
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
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      )}
    </Fragment>
  );
};

export default PartnerNetworkDetails;