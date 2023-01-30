import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { setMessage, setOpen } from "../../store/slices/message.slice";
import UnsubscribeDataService from "../../services/unsubscribe.service";
import { history } from "../../helpers";

const ConfirmUnsubscribe = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (token) {
      setIsSubmitting(true);
      UnsubscribeDataService.unsubscribe({ token: token }).then(() => {
        dispatch(setOpen(true));
        dispatch(setMessage("You've successfully been unsubscribed."));
        setIsSubmitting(false);
        history.navigate("/");
      });
    } else {
      dispatch(setOpen(true));
      dispatch(setMessage("Invalid Token."));
    }
  };

  useEffect(() => {
    const param = location?.search;

    if (param) {
      const token = param.replace("?tk=", "");
      setToken(token);
    } else {
      history.navigate("/404");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          padding: {
            lg: "0px 30px",
            xl: 0,
          },
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={6} lg={4.5}>
            <Paper sx={{ py: 5, borderRadius: "10px", mt: 5 }}>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={3}
                width="100%"
              >
                <ReportTwoToneIcon sx={{ fontSize: "5rem" }} />
                <Typography align="center" variant="h6" fontWeight={500}>
                  Confirm Unsubscribe
                </Typography>
                <Typography align="center" fontSize="16px">
                  Are you sure you want to unsubscribe?.
                </Typography>

                <Stack direction="row" spacing={3} sx={{ pt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/"
                    sx={{ width: "130px" }}
                  >
                    Cancel
                  </Button>

                  {isSubmitting ? (
                    <LoadingButton
                      loading
                      loadingPosition="start"
                      variant="contained"
                      type="submit"
                      color="error"
                      startIcon={<SaveIcon />}
                      sx={{
                        py: "10px",
                        px: "40px",
                        borderRadius: "7px",
                        alignSelf: "center",
                        width: "130px",
                      }}
                    >
                      Unsubscribe
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      color="error"
                      sx={{
                        py: "10px",
                        px: "40px",
                        borderRadius: "7px",
                        alignSelf: "center",
                        width: "130px",
                      }}
                    >
                      Unsubscribe
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ConfirmUnsubscribe;
