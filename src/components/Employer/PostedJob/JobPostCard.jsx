import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { Link as RouterLink } from "react-router-dom";
import ActionInfoBox from "./ActionInfoBox";

const JobPostCard = ({ item, handleClickAction }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: "1px solid #EBEBEB",
        borderRadius: "7px",
      }}
    >
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid container item xs={6} sm={5}>
              <Grid container item xs={12}
                justifyContent="center"
                alignItems="start"
                flexDirection="column"
                display="flex"
              >
                <Typography
                  fontSize={{ xs: "14px", sm: "18px" }}
                  fontWeight={400}
                  sx={{ wordWrap: "break-word" }}
                  width="100%"
                  maxWidth="100%"
                >
                  <Link
                    underline="always"
                    component={RouterLink}
                    to={`/employers/posted-jobs/${item.uuid}/detail`}
                  >
                    {item.job_title}
                  </Link>
                </Typography>

                <Typography
                  fontSize={{ xs: "12px", sm: "16px" }}
                  marginTop={1.5}
                  fontWeight={400}
                >
                  {item?.status_dec}
                </Typography>

                <Typography
                  fontSize={{ xs: "10px", sm: "13px" }}
                  color="#A1A1A1"
                  marginTop={1.5}
                  fontWeight={400}
                >
                  Post ends on {item.expired_at}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={6} sm={7}>
              <Grid
                container
                item
                xs={12}
                display="flex"
                flexDirection="row"
                justifyContent={{ xs: "end", md: "space-between" }}
                alignItems="start"
              >
                <Grid
                  item
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  spacing={1}
                  width="auto"
                  alignItems={"end"}
                >
                  <Box
                    sx={{
                      background: "#FFF0E3",
                      border: "1px solid #FF9635",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: { xs: "90%", sm: "100%" },
                      height: { xs: "20px", sm: "26px" },
                      px: 2,
                      mb: { xs: 2, sm: 0 },
                      mr: { xs: 0, sm: 1 },
                    }}
                  >
                    <Visibility
                      sx={{
                        mr: 1,
                        background: "#FF9635",
                        color: "#FFFFFF",
                        fontSize: { xs: "12px", sm: "14px" },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", sm: "14px" },
                        fontWeight: 400,
                      }}
                      component="span"
                    >
                      {`${item?.reads ?? 0} views`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      background: "#E7FEED",
                      border: "1px solid #09962F",
                      borderRadius: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "auto",
                      minWidth: { xs: "130px", sm: "200px" },
                      height: { xs: "20px", sm: "26px" },
                    }}
                  >
                    <Visibility
                      sx={{
                        mr: {xs: 0.5, sm: 1},
                        background: "#FF9635",
                        color: "#FFFFFF",
                        fontSize: { xs: "12px", sm: "14px" },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: { xs: "9px", sm: "14px" },
                        fontWeight: 400,
                      }}
                      align="center"
                    >
                      {`${item?.applied ?? 0} Total Applications`}
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  spacing={1}
                  width="auto"
                  sx={{ marginTop: 1 }}
                >
                    {(item.is_highlight === 1 || item.is_urgent === 1 || item.is_top === 1) && (
                        <Typography
                      sx={{
                        fontSize: { xs: "11px", sm: "13px" },
                        fontWeight: 400,
                      }}
                      align="right"
                    >
                        ads&nbsp;: {item.is_highlight === 1 && "Highlight Job Post"}
                        {item.is_highlight === 1 && item.is_urgent === 1 && " , "}
                        {item.is_urgent === 1 && "Urgent Job Post"}
                        {item.is_urgent === 1 && item.is_top === 1 && " , "}
                        {item.is_top === 1 && "Top Job Post"}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            justifyContent="space-between"
            display="flex"
            alignItems="center"
            pt={1}
          >
            <Stack direction="row" spacing={2}>
              {item?.status !== 1 && (
                <Link
                  underline="hover"
                  fontSize={{ xs: "9px", sm: "13px" }}
                  color="#00A0DC"
                  fontWeight={400}
                  component={RouterLink}
                  to={`/employers/job-posts/${item.uuid}/detail`}
                >
                  View
                </Link>
              )}

              <Link
                underline="hover"
                fontSize={{ xs: "9px", sm: "13px" }}
                color="#00A0DC"
                fontWeight={400}
                component={RouterLink}
                to={`/employers/posted-jobs/${item.uuid}/edit`}
              >
                Edit
              </Link>

              {(item?.status === 3 || item?.status === 5) && item?.status_dec === "Expired" && (
                <Link
                  underline="hover"
                  fontSize={{ xs: "9px", sm: "13px" }}
                  color="#00A0DC"
                  fontWeight={400}
                  onClick={() => handleClickAction(7, item?.uuid)}
                >
                  Repost
                </Link>
              )}

              {item?.status === 3 && item?.status_dec !== "Expired" && (
                <Link
                  underline="hover"
                  fontSize={{ xs: "9px", sm: "13px" }}
                  color="#00A0DC"
                  fontWeight={400}
                  onClick={() => handleClickAction(5, item?.uuid)}
                >
                  Marks as Expired
                </Link>
              )}

              {item?.status === 4 && (
                <Link
                  underline="hover"
                  fontSize={{ xs: "10px", sm: "13px" }}
                  color="#00A0DC"
                  fontWeight={400}
                  onClick={() => handleClickAction(1, item?.uuid)}
                >
                  Marks as Public
                </Link>
              )}
            </Stack>

            <Link
              underline="hover"
              fontSize={{ xs: "12px", sm: "16px" }}
              color="#00A0DC"
              fontWeight={400}
              component={RouterLink}
              to={`/employers/posted-jobs/${item.uuid}/detail`}
            >
              More Insights >
            </Link>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          height: "auto",
          background: "#EBEBEB",
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="start"
          spacing={1}
          display="flex"
          width="100%"
        >
          <Grid item xs={6} sm={4} md={2}>
            <ActionInfoBox title="Candidates" count={item?.candidate ?? 0} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ActionInfoBox title="Prescreen" count={item?.prescreens ?? 0} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ActionInfoBox title="Considering" count={item?.considering ?? 0} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ActionInfoBox title="Shortlisted" count={item?.shortlists ?? 0} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ActionInfoBox title="Hired" count={item?.hired ?? 0} />
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <ActionInfoBox
              title="Not Suitable"
              count={item?.not_suitable ?? 0}
              hideBorder={true}
            />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default JobPostCard;