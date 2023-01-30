import React, {Fragment, useEffect, useState} from 'react';
import {Avatar, Box, Card, Grid, Stack, Typography} from "@mui/material";
import CompanyPromotionService from "../../services/company.promotion.service";
import ReactPlayer from "react-player";
import StyledPagination from "../Common/StyledPagination";

const CompanyPromotion = ({ companies, borderRadius = true }) => {
  const limit = 9;
  const url = process.env.REACT_APP_URL;
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [count, setCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [productPageCnt, setProductPageCnt] = useState(1);
  const [showPagination, setShowPagination] = useState(false);
  const [showProductPagination, setShowProductPagination] = useState(false);

  useEffect(() => {
    (async () => {
      if (companies.uuid) {
        const params = requestParams(limit, pageCnt);
        await CompanyPromotionService.all(companies.uuid, params).then((r) => {
          const limit = r?.metadata.info?.limit;
          const total = r?.metadata.info?.total;

          setPromotions(r?.data);

          setCount(Math.ceil(total / limit));

          if (total > limit) {
            setShowPagination(true);
          }
        });
      }
    })().then(() => setLoading(false));
  }, [companies.uuid, pageCnt]);

  useEffect(() => {
    (async () => {
      if (companies.uuid) {
        const params = requestParams(limit, productPageCnt);
        await CompanyPromotionService.getProducts(companies.uuid, params).then(
          (r) => {
            const limit = r?.metadata.info?.limit;
            const total = r?.metadata.info?.total;

            setProducts(r?.data);

            setProductCount(Math.ceil(total / limit));

            if (total > limit) {
              setShowProductPagination(true);
            }
          }
        );
      }
    })().then(() => setLoading(false));
  }, [companies.uuid, productPageCnt]);

  const requestParams = (limit, pageCnt) => {
    let params = {};

    if (limit) {
      params["limit"] = limit;
    }

    if (pageCnt) {
      params["offset"] = (pageCnt - 1) * limit;
    }

    return params;
  };

  const handlePageChange = (event, value) => {
    setPageCnt(value);
  };

  const handleProductPageChange = (event, value) => {
    setProductPageCnt(value);
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        borderRadius: borderRadius ? "10px" : "0",
        boxShadow: borderRadius
          ? "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)"
          : "0",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      {!loading && promotions.length > 0 ? (
        <Grid container sx={{ padding: 0, mb: 2, my: 2 }}>
          <Grid item xs={12}>
            <Typography
              sx={{ pb: 2, textDecoration: "underline" }}
              variant="h6"
            >
              Company Promotions
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {promotions.map((item) => (
                <Fragment key={item.uuid}>
                  {item.type === 2 ? (
                    <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 3 }}>
                      <Stack>
                        <Card
                          variant="outlined"
                          sx={{ borderRadius: "10px", height: "188px" }}
                        >
                          <ReactPlayer
                            url={item.video_link}
                            width="100%"
                            height="100%"
                          />
                        </Card>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            textAlign: "center",
                            fontWeight: "300",
                            mt: 2.3,
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Stack>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 3 }}>
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
                          <Card
                            variant="outlined"
                            sx={{ borderRadius: "10px", height: "188px" }}
                          >
                            <Avatar
                              variant="rounded"
                              alt={item.title ?? "Title"}
                              src={`${url}/storage/promotions/${item.file_name}`}
                              sx={{
                                width: { xs: 300, sm: 345, md: 335 },
                                height: 188,
                              }}
                              loading="lazy"
                            />
                          </Card>
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

          {showPagination && (
            <Grid item xs={12}>
              <Box justifyItems="right" display="flex" justifyContent="right">
                <StyledPagination
                  count={count}
                  pageCnt={pageCnt}
                  handlePageChange={handlePageChange}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container sx={{ padding: 0, mb: 2 }}>
          <Grid item xs={12}>
            <Typography
              sx={{ pb: 2, textDecoration: "underline" }}
              variant="h6"
            >
              Company Promotions
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h6">There is no data.</Typography>
          </Grid>
        </Grid>
      )}

      {!loading && products.length > 0 ? (
        <Grid container mb={1} sx={{ padding: 0 }}>
          <Grid item xs={12}>
            <Typography
              sx={{ pb: 2, textDecoration: "underline" }}
              variant="h6"
            >
              Company Products
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {products.map((item) => (
                <Fragment key={item.uuid}>
                  {item.type === 2 ? (
                    <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 3 }}>
                      <Stack>
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: "10px",
                            width: "100%",
                            height: "188px",
                          }}
                        >
                          <ReactPlayer
                            url={item.video_link}
                            width="100%"
                            height="100%"
                          />
                        </Card>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            textAlign: "center",
                            fontWeight: "300",
                            mt: 2.3,
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Stack>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={6} md={4} sx={{ marginBottom: 3 }}>
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
                          <Card
                            variant="outlined"
                            sx={{ borderRadius: "10px", width: "100%" }}
                          >
                            <Avatar
                              variant="rounded"
                              alt={item.title ?? "Title"}
                              src={`${url}/storage/promotions/${item.file_name}`}
                              sx={{
                                width: { xs: 300, sm: 345, md: 335 },
                                height: 188,
                              }}
                              loading="lazy"
                            />
                          </Card>
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

          {showProductPagination && (
            <Grid item xs={12}>
              <Box justifyItems="right" display="flex" justifyContent="right">
                <StyledPagination
                  count={productCount}
                  pageCnt={productPageCnt}
                  handlePageChange={handleProductPageChange}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid container sx={{ padding: 0, mb: 1 }}>
          <Grid item xs={12}>
            <Typography
              sx={{ pb: 2, textDecoration: "underline" }}
              variant="h6"
            >
              Company Products
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h6">There is no data.</Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CompanyPromotion;