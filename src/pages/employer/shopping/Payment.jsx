import React, { useEffect, useState } from "react";
import { Box, Container, Skeleton, Stack, Typography } from "@mui/material";
import SEO from "../../../components/Common/SEO";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLocation } from "react-router-dom";
import { history } from "../../../helpers";
import TransactionDataService from "../../../services/transaction.service";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Payment = () => {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const query = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (token) {
      (async () => {
        await TransactionDataService.verify({ token: token }).then((res) => {
          if (res.data) {
            if (res.data.success === 1) {
              setSuccess(true);
            }

            setMessage(res.data?.message);
            setDescription(res.data?.description);
          } else {
            setMessage("Your Session has expired.");
            setDescription(
              "Please go back to the previous page. Don’t Worry, we have kept all of your previous activities. Sorry for your inconvenience"
            );
          }

          setLoading(false);
        });
      })();
    }
  }, [token]);

  useEffect(() => {
    const token = query.get("verify");

    if (!token) {
      history.navigate("/404");
    } else {
      setToken(token);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="xl">
      <SEO title="Payment" />
      <Box sx={{ padding: { lg: "0px 30px", xl: 0 } }}>
        <Box
          sx={{
            mt: 5,
            width: "100%",
            background: "white",
            borderRadius: "10px",
            border: "1px solid #DADADA",
          }}
        >
          {(token && !loading) && (
            <Stack
              alignItems="center"
              justifyContent="center"
              display="flex"
              minHeight="240px"
              height="100%"
              spacing={2.5}
            >
              {success ? (
                <CheckCircleIcon sx={{ fontSize: "4rem", color: "#09962F" }} />
              ) : (
                <ErrorOutlineIcon sx={{ fontSize: "4rem", color: "#EE3333" }} />
              )}
              <Typography
                fontSize="20px"
                fontWeight={700}
                color={success ? "secondary" : "error"}
              >
                {message}
              </Typography>
              <Typography fontSize="18px" fontWeight={500} color="#65757A">
                {description}
              </Typography>
            </Stack>
          )}

          {(!token || loading) && (
            <Stack
              alignItems="center"
              justifyContent="center"
              display="flex"
              minHeight="240px"
              height="100%"
              spacing={2.5}
            >
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton
                variant="text"
                width="20%"
                sx={{ fontSize: "1.2rem" }}
              />
              <Skeleton variant="text" width="35%" sx={{ fontSize: "1rem" }} />
            </Stack>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;
