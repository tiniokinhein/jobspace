import React from "react";
import SEO from "./SEO";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { helper } from "../../helpers";

const ArticleCardList = ({
  title,
  data,
  pageCnt,
  handleChange,
  totCnt,
  limit,
  loading,
  pageTitle,
  type
}) => {
  const url = process.env.REACT_APP_URL;

  return (
    <Container maxWidth="xl">
      <SEO title={pageTitle ?? null} />
      <Grid
        container
        px={{ lg: "30px", xl: 0 }}
        py={3}
        minHeight="42.9vh"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography
            p={1}
            sx={{
              color: "#000000",
              fontWeight: 600,
              fontSize: "24px",
              mb: "12px",
              background: "none",
              textAlign: "start",
              lineBreak: "anywhere",
            }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            {data.length > 0 &&
              data.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.uuid}>
                  <CardActionArea
                    component={RouterLink}
                    to={`${
                      parseInt(type) === 1 ? "/career-resources" : "/news-and-events"
                    }/${helper.slug(item?.name)}/${item.uuid}/detail`}
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
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={`${url}/storage/articles/${item.image}`}
                        height="200"
                        alt="green iguana"
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Stack direction="column" spacing={2}>
                          <Box
                            sx={{
                              minHeight: "70px",
                              maxHeight: "70px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <Typography
                              sx={{ textAlign: "start", fontWeight: 500 }}
                            >
                              {item.name}
                            </Typography>
                          </Box>

                          <Stack
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                          >
                            <Typography
                              fontSize="12px"
                              fontWeight="500"
                              color="#A1A1A1"
                            >
                              Posted on&nbsp;{helper.dateString(item.updated_at)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
          </Grid>
        </Grid>

        {loading && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper elevation={2} sx={{ borderRadius: "10px", mb: "20px" }}>
              <Stack direction="column" spacing={2} sx={{ padding: "16px" }}>
                <Skeleton variant="rounded" width={"100%"} height={180} />

                <Skeleton variant="rounded" width={"100%"} height={30} />

                <Skeleton variant="rounded" width={"70%"} height={15} />
              </Stack>
            </Paper>
          </Grid>
        )}

        {totCnt > limit && (
          <Grid item xs={12} sx={{ py: 4 }}>
            <Box display={"flex"} justifyContent={"center"}>
              <Pagination
                count={pageCnt}
                size="medium"
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ArticleCardList;
