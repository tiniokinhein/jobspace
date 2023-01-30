import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SEO from "../../../components/Common/SEO";
import PackageService from "../../../services/package.service";
import { helper, history } from "../../../helpers";
import { grey } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link as RouterLink } from "react-router-dom";
import PaymentMethodDataService from "../../../services/payment.method.service";
import BlockQuote from "../../../components/Common/BlockQuote";
import CouponDataService from "../../../services/coupon.service";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import OrderDataService from "../../../services/order.service";
import TransactionDataService from "../../../services/transaction.service";

const BuyNow = () => {
  const [warn, setWarn] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [packages, setPackages] = useState([]);
  const [totPrices, setTotPrices] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [couponData, setCouponData] = useState([]);
  const [oldCouponData, setOldCouponData] = useState([]);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [checkOutLoading, setCheckOutLoading] = useState(true);
  const [invalidCoupon, setInvalidCoupon] = useState(false);
  const [oldCoupon, setOldCoupon] = useState(null);
  const [reducePrices, setReducePrices] = useState(0);
  const [methodWarn, setMethodWarn] = useState(false);
  const [methodId, setMethodId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [kbzTrx, setKbzTrx] = useState([]);
  const [trxStatus, setTrxStatus] = useState(false);

  const fetchPaymentMethods = useCallback(async () => {
    await PaymentMethodDataService.all().then((res) =>
      setPaymentMethods(res.data)
    );
    setCheckOutLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await PackageService.all().then((res) => setPackages(res.data));
    })();
  }, []);

  useEffect(() => {
    if (selectedItems.length > 0 && !warn) {
      setDisabled(false);
    }
  }, [selectedItems, warn]);

  const handleBuyNow = () => {
    if (selectedItems.length > 0) {
      const totPrices = selectedItems.reduce((item, current) => {
        return item + current.price;
      }, 0);

      setTotPrices(totPrices);

      fetchPaymentMethods();

      setIsCheckOut(true);
    }
  };

  const handlePayNow = () => {
    if (!methodId) {
      setMethodWarn(true);
    } else {
      setMethodWarn(false);
      setProcessing(true);

      let payload = getOrderPayload();

      OrderDataService.create(payload).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          TransactionDataService.create({
            method_id: methodId,
            transaction_id: res.data?.id,
          }).then((res) => {
            if (res?.data?.channel === 1) {
              const data = res.data;
              const form = document.createElement("form");

              form.method = "post";
              form.action = res?.data?.action;

              for (const key in data) {
                if (
                  data.hasOwnProperty(key) &&
                  !["channel", "action"].includes(key)
                ) {
                  const hiddenField = document.createElement("input");
                  hiddenField.id = key;
                  hiddenField.name = key;
                  hiddenField.type = "hidden";
                  hiddenField.value = data[key];

                  // console.log(`${key} - ${data[key]}`);

                  form.appendChild(hiddenField);
                }
              }

              document.body.appendChild(form);

              form.submit();
            } else if (res?.data?.channel === 2) {
              setKbzTrx(res.data);
            }
          });
        }
      });
    }
  };

  const getOrderPayload = () => {
    let orderPayload = {};

    if (Object.keys(oldCouponData).length > 0) {
      orderPayload["coupon_id"] = oldCouponData.uuid;

      console.log(orderPayload);
    }

    if (selectedItems.length > 0 && !warn) {
      orderPayload["package_ids"] = selectedItems.map(
        (item) => item.uuid ?? null
      );
    }

    if (methodId) {
      orderPayload["method_id"] = methodId;
    }

    return orderPayload;
  };

  const handleSelectItem = (event, item) => {
    if (item && event.target.checked) {
      const pkg = {
        uuid: item?.uuid,
        name: item?.name,
        price: item?.pricing,
        currency: item?.package_currency?.name,
      };

      setSelectedItems((prevState) => [...prevState, pkg]);

      const data = [...selectedItems];

      if (data[0]) {
        if (data.every((value) => value.currency === pkg?.currency)) {
          setWarn(false);
          setDisabled(false);
        } else {
          setWarn(true);
          setDisabled((prevState) => !prevState);
        }
      }
    }

    if (!event.target.checked && item) {
      const data = [...selectedItems];
      const part = data.filter((value) => value.uuid === item.uuid);
      if (part.length > 0) {
        const index = selectedItems.indexOf(part[0]);
        if (index > -1) {
          data.splice(index, 1);

          if (data.length < 1) {
            setDisabled(true);
          }

          setSelectedItems(data);

          if (
            data.every(
              (value) => value.currency !== item?.package_currency?.name
            )
          ) {
            setWarn(false);
            setDisabled(false);
          }
        }
      }
    }
  };

  const handleBackClick = () => {
    setTotPrices(0);
    setCoupon(null);
    setCouponData([]);
    setOldCoupon(null);
    setReducePrices(0);
    setSelectedItems([]);
    setIsCheckOut(false);
    setProcessing(false);
    setKbzTrx([]);
  };

  const handleCouponApply = () => {
    if (coupon && coupon !== oldCoupon && !processing) {
      (async () => {
        await CouponDataService.get(coupon).then((res) => {
          if (Object.keys(res.data).length) {
            setCouponData(res.data);
            setOldCouponData(res.data);
            setReducePrices(totPrices - (res?.data?.amount ?? 0));
            setOldCoupon(coupon);
          } else {
            setInvalidCoupon(true);
          }
        });
      })();
    }
  };

  const handleCouponChange = (event) => {
    if (event.target.value) {
      setCoupon(event.target.value);
    }

    setInvalidCoupon(false);
  };

  const handleMethodChange = (event) => {
    setMethodId(event.target.value);
    if (event.target.value) {
      setMethodWarn(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(kbzTrx).length > 0 && !trxStatus) {
        (async () => {
          await TransactionDataService.kbzVerify({
            transaction_id: kbzTrx?.id,
          }).then((res) => {
            if (!res.error) {
              const data = res.data;

              if (data.status !== 0) {
                setTrxStatus(true);
                history.navigate(`/employers/payment?verify=${data?.token}`);
              }
            }
          });
        })();
      }
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [kbzTrx]);

  return (
    <Container maxWidth="xl">
      <SEO title="Buy Now" />
      <Box sx={{ padding: { lg: "0px 30px", xl: 0 } }}>
        {!isCheckOut && (
          <Grid
            container
            spacing={5}
            alignContent="center"
            alignItems="center"
            display="flex"
          >
            <Grid
              item
              xs={12}
              mt={6}
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <Box
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                {warn && (
                  <Box sx={{ mb: 1 }}>
                    <BlockQuote>
                      <Typography sx={{ pr: 2 }}>
                        You can't buy different currency items
                      </Typography>
                    </BlockQuote>
                  </Box>
                )}

                <Typography variant="h6" align="center">
                  Upgrade to unlock access to all candidate signals.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                display="flex"
                alignItems="flex-start"
                justifyContent="center"
                spacing={4}
                sx={{ maxWidth: "100%", minWidth: "100%" }}
              >
                {packages.length > 0 &&
                  packages.map((item) => (
                    <Grid item xs={4} md={3} key={ item.uuid }>
                      <Box
                        sx={{
                          boxShadow:
                            "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                          borderRadius: "10px",
                          background: "white",
                          minHeight: "100px",
                        }}
                        key={item.uuid}
                      >
                        <Box
                          sx={{
                            minHeight: "9px",
                            borderTopLeftRadius: "inherit",
                            borderTopRightRadius: "inherit",
                            background:
                              "linear-gradient(90.1deg, #78ABFD 0%, #195DCC 100%)",
                          }}
                        />

                        <Box sx={{ px: 2, py: 1 }} flexDirection="column">
                          <Box flexDirection="row" mb={1.5}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    sx={{ color: grey[500] }}
                                    onChange={(event) =>
                                      handleSelectItem(event, item)
                                    }
                                    checked={selectedItems.some(
                                      (value) => value.uuid === item.uuid
                                    )}
                                  />
                                }
                                label={item.name}
                              />
                            </FormGroup>
                          </Box>
                          <Divider/>

                          <Box mt={2}>
                            <List>
                              {(item?.package_features).length > 0 &&
                                item.package_features.map(
                                  (feature) =>
                                    feature?.is_show === 1 &&
                                    feature?.description && (
                                      <ListItem
                                        disablePadding
                                        sx={{ mb: 1 }}
                                        key={feature.uuid}
                                      >
                                        <Box
                                          flexDirection="row"
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <CheckIcon
                                            sx={{ fontSize: "12px" }}
                                          />
                                          <Typography
                                            fontSize="13px"
                                            color="text.secondary"
                                            ml={1}
                                          >
                                            {feature?.description}
                                          </Typography>
                                        </Box>
                                      </ListItem>
                                    )
                                )}
                            </List>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box flexDirection="row">
                <Button
                  variant="outlined"
                  color="secondary"
                  component={RouterLink}
                  to="/contact-us"
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "7px",
                    mr: 2,
                  }}
                >
                  Contact with us.
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: "14px",
                    borderRadius: "7px",
                    background:
                      "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                  }}
                  startIcon={<ShoppingBagIcon />}
                  disabled={disabled}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {isCheckOut && !checkOutLoading && !warn && (
          <Grid container spacing={2.5} my={6}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary">
                Select your payment method
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  background: "white",
                  borderRadius: "10px",
                  minHeight: "138px",
                  boxShadow:
                    "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <RadioGroup
                  row
                  name="method"
                  aria-labelledby="method-radio-buttons-group-label"
                  sx={{ px: 4, width: "24%", justifyContent: "space-between" }}
                  onChange={handleMethodChange}
                >
                  {paymentMethods.length > 0 &&
                    paymentMethods.map((paymentMethod) => (
                      <FormControlLabel
                        value={paymentMethod.uuid}
                        id={paymentMethod.name}
                        control={<Radio />}
                        label={
                          <Avatar
                            alt={paymentMethod.name}
                            src={paymentMethod.image}
                            sx={{ width: "100%", height: "100%" }}
                            variant="rounded"
                          />
                        }
                        key={paymentMethod.uuid}
                        sx={{
                          ".MuiFormControlLabel-label": {
                            marginLeft: 1,
                          },
                        }}
                      />
                    ))}
                </RadioGroup>

                {methodWarn && (
                  <Typography
                    sx={{ px: 4, pt: 1 }}
                    variant="body1"
                    color="error"
                    component="span"
                  >
                    Please select the payment method
                  </Typography>
                )}
              </Box>
            </Grid>

            {Object.keys(kbzTrx).length > 0 && (
              <Grid item xs={12} mt={2}>
                <Box
                  sx={{
                    width: "100%",
                    background: "white",
                    borderRadius: "10px",
                    minHeight: "138px",
                    boxShadow:
                      "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    display: "flex",
                  }}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      px: 4,
                      py: 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">
                      Scan QR Code To Pay With{" "}
                      <Typography
                        variant="span"
                        fontWeight={500}
                        color="primary"
                      >
                        KBZPay
                      </Typography>
                    </Typography>

                    <Card sx={{ borderRadius: "10px" }} elevation={2}>
                      <CardMedia
                        height="250"
                        alt="qr code"
                        component="img"
                        image={`${kbzTrx?.path}`}
                      />
                    </Card>

                    <Typography fontSize="14px" color="error" fontWeight={500}>
                      QR Code Will Be Expire At {kbzTrx?.expired_at}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            )}
            <Grid item xs={12} mt={2}>
              <Typography variant="h6" color="primary">
                Order Summary
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                flexDirection="column"
                sx={{
                  width: "100%",
                  background: "white",
                  borderRadius: "10px",
                  minHeight: "138px",
                  boxShadow:
                    "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    minHeight: "130px",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    display: "flex",
                    px: 4,
                  }}
                  flexDirection="column"
                >
                  <Typography variant="body1" mb={2}>
                    Add Gift Coupon Code
                  </Typography>
                  <Box flexDirection="row" height="auto">
                    <TextField
                      id="coupon"
                      placeholder="Enter Coupon Code"
                      variant="outlined"
                      color="secondary"
                      error={invalidCoupon}
                      sx={{
                        ".MuiOutlinedInput-root": {
                          borderRadius: "7px",
                          paddingY: 0.5,
                        },
                      }}
                      size="small"
                      onChange={handleCouponChange}
                      helperText={
                        invalidCoupon ? "Coupon code is invalid." : null
                      }
                    />
                    <Button
                      variant="contained"
                      sx={{
                        background:
                          "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                        borderRadius: "7px",
                        paddingY: 1.2,
                        paddingX: 4,
                        ml: 2,
                        fontSize: "16px",
                      }}
                      size="small"
                      onClick={handleCouponApply}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
                <Divider sx={{ boxShadow: 1 }} />
                <Box
                  sx={{ display: "flex", px: 4, py: 3, width: "35.8%" }}
                  flexDirection="column"
                >
                  {selectedItems.length > 0 &&
                    selectedItems.map((selectedItem) => (
                      <Box
                        sx={{
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          display: "flex",
                          width: "100%",
                          py: 1,
                        }}
                        flexDirection="row"
                        key={selectedItem.uuid}
                      >
                        <Typography color="text.secondary">
                          {selectedItem.name}
                        </Typography>
                        <Typography color="text.secondary">
                          {selectedItem.currency}{" "}
                          {helper.nFormat(selectedItem.price)}
                        </Typography>
                      </Box>
                    ))}

                  {Object.keys(couponData).length > 0 && (
                    <Box
                      sx={{
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        display: "flex",
                        width: "100%",
                        py: 1,
                      }}
                      flexDirection="row"
                    >
                      <Typography color="text.secondary">
                        Gift Coupon
                      </Typography>
                      <Typography color="text.secondary">
                        {couponData?.package_currency?.name}{" "}
                        {couponData?.amount
                          ? "-" + helper.nFormat(couponData.amount)
                          : null}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ bgcolor: "#989494" }} />
                </Box>
                <Box
                  sx={{ display: "flex", px: 4, py: 0, width: "35.8%" }}
                  flexDirection="column"
                >
                  <Box
                    sx={{
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      display: "flex",
                      width: "100%",
                      pb: 3,
                    }}
                    flexDirection="row"
                  >
                    <Typography>Total</Typography>
                    <Typography>
                      {selectedItems[0].currency ?? "MMK"} &nbsp;
                      {helper.nFormat(reducePrices ? reducePrices : totPrices)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: "7px",
                  paddingY: 1.2,
                  paddingX: 5,
                  fontSize: "16px",
                }}
                onClick={handleBackClick}
                size="small"
              >
                Back
              </Button>

              {processing ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  color="secondary"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{
                    borderRadius: "7px",
                    paddingY: 1.2,
                    paddingX: 2,
                    ml: 2,
                    fontSize: "16px",
                  }}
                  size="small"
                >
                  Buy Now
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
                    borderRadius: "7px",
                    paddingY: 1.2,
                    paddingX: 4,
                    ml: 2,
                    fontSize: "16px",
                  }}
                  size="small"
                  disabled={selectedItems.length <= 0}
                  onClick={handlePayNow}
                >
                  Buy Now
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default BuyNow;
