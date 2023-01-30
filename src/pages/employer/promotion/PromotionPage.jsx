import React, { useCallback, useEffect, useState } from "react";
import SEO from "../../../components/Common/SEO";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { companyPromotionActions } from "../../../store";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import ReactPlayer from "react-player";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WarnDialog from "../../../components/Common/WarnDialog";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {helper} from "../../../helpers";
import StyledPagination from "../../../components/Common/StyledPagination";

const PromotionPage = () => {

  const limit = 2;
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.companyPromotions);
  const { promotions } = useSelector((state) => state.companyPromotions);

  const [promoCount, setPromoCount] = useState(0);
  const [promoPageCnt, setPromoPageCnt] = useState(1);

  const [productCount, setProductCount] = useState(0);
  const [productPageCnt, setProductPageCnt] = useState(1);

  const [openProductWarn, setOpenProductWarn] = useState(false);
  const [openPromotionWarn, setOpenPromotionWarn] = useState(false);

  const [productUuid, setProductUuid] = useState(null);
  const [promotionUuid, setPromotionUuid] = useState(null);

  const fetchPromotions = useCallback((limit, promoPageCnt) => {
    dispatch(companyPromotionActions.getPromotions(helper.postJobParams(limit, promoPageCnt))).then((res) => {
      const total = res.payload.metadata?.info?.total;
      setPromoCount(Math.ceil(total / limit));
    });

    // eslint-disable-next-line
  }, [dispatch]);

  const fetchProducts = useCallback((limit, productPageCnt) => {
    dispatch(companyPromotionActions.getProducts(helper.postJobParams(limit, productPageCnt))).then((res) => {
      const total = res.payload.metadata?.info?.total;
      setProductCount(Math.ceil(total / limit));
    });

    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    fetchPromotions(limit, promoPageCnt);
    // eslint-disable-next-line
  }, [fetchPromotions, promoPageCnt]);

  useEffect(() => {
    fetchProducts(limit, productPageCnt);
    // eslint-disable-next-line
  }, [fetchProducts, productPageCnt]);

  const handleProductTrashClick = (uuid) => {
    if (uuid) {
      setOpenProductWarn(true);
      setProductUuid(uuid);
    }
  };

  const handlePromotionTrashClick = (uuid) => {
    if (uuid) {
      setOpenPromotionWarn(true);
      setPromotionUuid(uuid);
    }
  };

  const handleProductDelete = () => {
    if (productUuid) {
      dispatch(companyPromotionActions.deleteProducts(productUuid)).then(() => {
        dispatch(companyPromotionActions.getProducts());
        setOpenProductWarn(false);
      });
    }
  };

  const handlePromotionDelete = () => {
    if (promotionUuid) {
      dispatch(companyPromotionActions.deletePromotions(promotionUuid)).then(
        () => {
          dispatch(companyPromotionActions.getPromotions());
          setOpenPromotionWarn(false);
        }
      );
    }
  };

  const handlePromoPageChange = (event, value) => {
    setPromoPageCnt(value);
  }

  const handleProductPageChange = (event, value) => {
    setProductPageCnt(value);
  }

  const handleProductWarnOpen = () => {
    setOpenProductWarn(false);
  };

  const handlePromotionWarnOpen = () => {
    setOpenPromotionWarn(false);
  };

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "10px",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <SEO title="Products & Promotion" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" py={3} px={4} color="primary">
          Products & Promotion
        </Typography>
        <Divider />
        <Box sx={{ px: 4, py: 3 }}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    fontSize="16px"
                    color="#585858"
                    fontWeight={400}
                    component="span"
                  >
                    Company Products
                  </Typography>
                  <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                    component={RouterLink}
                    to="/employers/products/create"
                  >
                    Add Company Product
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    {products.length > 0 &&
                      products.map((item) => (
                        <Grid item xs={12} md={4} key={item.uuid}>
                          <Card elevation={2} sx={{ maxWidth: 345, borderRadius: '10px' }}>
                            {item.type === 1 ? (
                              <CardMedia
                                component="img"
                                height="224px"
                                image={`${process.env.REACT_APP_URL}/storage/promotions/${item.file_name}`}
                                alt="company image"
                              />
                            ) : (
                              <CardMedia>
                                <ReactPlayer
                                  url={item.video_link}
                                  width="100%"
                                  height="224px"
                                />
                              </CardMedia>
                            )}
                            <CardActions disableSpacing>
                              <Stack
                                direction="column"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                display="flex"
                                width="100%"
                                spacing={1}
                              >
                                <Stack
                                  spacing={1}
                                  justifyContent="space-between"
                                  alignItems="flex-start"
                                  display="flex"
                                  width="100%"
                                  direction="row"
                                >
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      fontSize="15px"
                                      fontWeight={500}
                                    >
                                      {item.title}
                                    </Typography>
                                    {item.status === 0 && (
                                      <Stack
                                        direction="row"
                                        sx={{
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          display: "flex",
                                        }}
                                      >
                                        <PendingIcon
                                          sx={{
                                            fontSize: "15px",
                                            marginRight: "4px",
                                          }}
                                          color="primary"
                                        />
                                        <Typography
                                          fontSize="12px"
                                          fontWeight={500}
                                          color="#A1A1A1"
                                        >
                                          Awaiting Approval
                                        </Typography>
                                      </Stack>
                                    )}

                                    {item.status === 1 && (
                                      <Stack
                                        direction="row"
                                        sx={{
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          display: "flex",
                                        }}
                                      >
                                        <CheckCircleIcon
                                          color="success"
                                          sx={{
                                            fontSize: "15px",
                                            marginRight: "4px",
                                          }}
                                        />
                                        <Typography
                                          fontSize="12px"
                                          fontWeight={500}
                                          color="#A1A1A1"
                                        >
                                          Approved
                                        </Typography>
                                      </Stack>
                                    )}

                                    {item.status === 2 && (
                                      <Stack
                                        direction="row"
                                        sx={{
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          display: "flex",
                                        }}
                                      >
                                        <CancelIcon
                                          color="error"
                                          sx={{
                                            fontSize: "15px",
                                            marginRight: "4px",
                                          }}
                                        />
                                        <Typography
                                          fontSize="12px"
                                          fontWeight={500}
                                          color="#A1A1A1"
                                        >
                                          Rejected
                                        </Typography>
                                      </Stack>
                                    )}
                                  </Stack>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() =>
                                      handleProductTrashClick(item.uuid)
                                    }
                                  >
                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                                <Typography fontSize="13px" color="#A1A1A1">
                                  Posted on {item.published_date}
                                </Typography>
                              </Stack>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    <Grid item xs={12}>
                      <StyledPagination count={productCount} pageCnt={productPageCnt} handlePageChange={handleProductPageChange} align="center"/>
                    </Grid>
                  </Grid>
                </Grid>

                {products.length < 1 && (
                  <Grid
                    item
                    xs={12}
                    minHeight="50px"
                    alignItems="center"
                    justifyContent="flex-start"
                    display="flex"
                  >
                    <Typography
                      color="#585858"
                      fontSize="14px"
                      component="span"
                      fontWeight={500}
                    >
                      There is no company product.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography fontSize="16px" color="#585858" fontWeight={400}>
                    Company Promotions
                  </Typography>

                  <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                    component={RouterLink}
                    to="/employers/promotions/create"
                  >
                    Add Company Promotion
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    {promotions.length > 0 &&
                      promotions.map((item) => (
                        <Grid item xs={12} md={4} key={item.uuid}>
                          <Card sx={{ maxWidth: 345, borderRadius: '10px' }} elevation={2}>
                            {item.type === 1 ? (
                              <CardMedia
                                component="img"
                                height="224px"
                                image={`${process.env.REACT_APP_URL}/storage/promotions/${item.file_name}`}
                                alt="company image"
                              />
                            ) : (
                              <CardMedia>
                                <ReactPlayer
                                  url={item.video_link}
                                  width="100%"
                                  height="224px"
                                />
                              </CardMedia>
                            )}
                            <CardActions disableSpacing>
                              <Stack
                                direction="column"
                                justifyContent="space-between"
                                alignItems="flex-start"
                                display="flex"
                                width="100%"
                                spacing={1}
                              >
                                <Stack
                                  spacing={1}
                                  justifyContent="space-between"
                                  alignItems="flex-start"
                                  display="flex"
                                  width="100%"
                                  direction="row"
                                >
                                  <Stack direction="column" spacing={1}>
                                    <Typography
                                      fontSize="15px"
                                      fontWeight={500}
                                    >
                                      {item.title}
                                    </Typography>
                                    {item.status === 0 && (
                                      <Stack
                                        direction="row"
                                        sx={{
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          display: "flex",
                                        }}
                                      >
                                        <PendingIcon
                                          sx={{
                                            fontSize: "15px",
                                            marginRight: "4px",
                                          }}
                                          color="primary"
                                        />
                                        <Typography
                                          fontSize="12px"
                                          fontWeight={500}
                                          color="#A1A1A1"
                                        >
                                          Awaiting Approval
                                        </Typography>
                                      </Stack>
                                    )}

                                    {item.status === 1 && (
                                      <Stack
                                        direction="row"
                                        sx={{
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          display: "flex",
                                        }}
                                      >
                                        <CheckCircleIcon
                                          color="success"
                                          sx={{
                                            fontSize: "15px",
                                            marginRight: "4px",
                                          }}
                                        />
                                        <Typography
                                          fontSize="12px"
                                          fontWeight={500}
                                          color="#A1A1A1"
                                        >
                                          Approved
                                        </Typography>
                                      </Stack>
                                    )}

                                    {item.status === 2 && (
                                      <Stack
                                        direction="row"
                                        sx={{
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          display: "flex",
                                        }}
                                      >
                                        <CancelIcon
                                          color="error"
                                          sx={{
                                            fontSize: "15px",
                                            marginRight: "4px",
                                          }}
                                        />
                                        <Typography
                                          fontSize="12px"
                                          fontWeight={500}
                                          color="#A1A1A1"
                                        >
                                          Rejected
                                        </Typography>
                                      </Stack>
                                    )}
                                  </Stack>
                                  <IconButton
                                    aria-label="delete"
                                    size="large"
                                    onClick={() =>
                                      handlePromotionTrashClick(item.uuid)
                                    }
                                  >
                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                                <Typography fontSize="13px" color="#A1A1A1">
                                  Posted on {item.published_date}
                                </Typography>
                              </Stack>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}

                    <Grid item xs={12}>
                      <StyledPagination count={promoCount} pageCnt={promoPageCnt} handlePageChange={handlePromoPageChange} align="center"/>
                    </Grid>
                  </Grid>
                </Grid>

                {promotions.length < 1 && (
                  <Grid
                    item
                    xs={12}
                    minHeight="50px"
                    alignItems="center"
                    justifyContent="flex-start"
                    display="flex"
                  >
                    <Typography
                      color="#585858"
                      fontSize="14px"
                      component="span"
                      fontWeight={500}
                    >
                      There is no company promotion.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/*{!loading && promotions.length > 0 ? <PromotionShow data={promotions}/> : <PromotionForm/>}*/}
      </Box>

      <WarnDialog
        open={openProductWarn}
        handleClose={handleProductWarnOpen}
        handleDelete={handleProductDelete}
      />
      <WarnDialog
        open={openPromotionWarn}
        handleClose={handlePromotionWarnOpen}
        handleDelete={handlePromotionDelete}
      />
    </Box>
  );
};

export default PromotionPage;
