import React, { useEffect, useState } from "react";
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
import ArticleService from "../../services/article.service";
import { useDispatch } from "react-redux";
import { setProgress } from "../../store/slices/progress";
import SEO from "../../components/Common/SEO";
import { Link as RouterLink } from "react-router-dom";

const PartnersNetwork = () => {
  const dispatch = useDispatch();
  const type = 3;
  const [partnerNetworks, setPartnerNetworks] = useState("");
  const [dataLimit, setDataLimit] = useState(20);
  const [totalData, setTotalData] = useState(0);
  const url = process.env.REACT_APP_URL;

  const [pageNo, setPageNo] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(setProgress(50));

    (async () => {
      await ArticleService.all({
        limit: dataLimit,
        offset: offset,
        type: type,
      }).then((res) => {
        const metadata = res.metadata;
        setDataLimit(metadata.info.limit);
        setPartnerNetworks(res.data);
        setTotalData(metadata.info.total);
      });
    })().then(() => dispatch(setProgress(100)));

    // eslint-disable-next-line
  }, [pageNo]);

  const pageCount = Math.ceil(totalData / dataLimit);

  const handleChange = (event, value) => {
    setPageNo(value);
    setOffset(value * 20 - 20);
  };

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

  function format(date) {
    date = new Date(date);

    var day = ("0" + date.getDate()).slice(-2);
    var month = date.getMonth();
    var year = date.getFullYear();

    return monthNames[month] + " " + day + ", " + year;
  }

  return (
    <Container maxWidth="xl">
      <SEO title="Partners Network" />
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
              mb: "8px",
              background: "none",
              lineBreak: "anywhere",
            }}
          >
            Partners Network
          </Typography>
        </Grid>

        {partnerNetworks ? (
          partnerNetworks.map((partnersNetwork) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={partnersNetwork.uuid}>
              <CardActionArea
                component={RouterLink}
                to={`/partner-networks/${partnersNetwork.uuid}/detail`}
              >
                <Card
                  elevation={1}
                  sx={{
                    borderRadius: "5px",
                    mb: "20px",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow:
                        "rgba(0, 0, 0, 0.2) 0px 7px 8px -4px, rgba(0, 0, 0, 0.14) 0px 12px 17px 2px, rgba(0, 0, 0, 0.12) 0px 5px 22px 4px",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`${url}/storage/articles/${partnersNetwork.image}`}
                    height="300"
                    alt="green iguana"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Stack direction="column" spacing={2}>
                      <Box sx={{ minHeight: "85px" }}>
                        <Typography
                          sx={{
                            textAlign: "start",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          {partnersNetwork.name}
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
                          Posted on&nbsp;{format(partnersNetwork.updated_at)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Paper
              elevation={1}
              sx={{ mb: "20px", pb: "24px", pt: "16px", maxWidth: 450 }}
            >
              <Stack direction="column" spacing={2}>
                <Stack direction="column" spacing={2} sx={{ paddingX: "16px" }}>
                  <Skeleton
                    variant="text"
                    width={"90%"}
                    sx={{ fontSize: 18 }}
                  />
                  <Skeleton
                    variant="text"
                    width={"40%"}
                    sx={{ fontSize: 12 }}
                  />
                </Stack>
                <Skeleton variant="rectangular" width={"100%"} height={250} />
                <Stack direction="column" spacing={1} sx={{ paddingX: "16px" }}>
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    sx={{ fontSize: "1rem" }}
                  />
                  <Skeleton
                    variant="text"
                    width={"100%"}
                    sx={{ fontSize: "1rem" }}
                  />
                  <Skeleton
                    variant="text"
                    width={"70%"}
                    sx={{ fontSize: "1rem" }}
                  />
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12} sx={{ py: 4 }}>
          <Box display={"flex"} justifyContent={"center"}>
            <Pagination
              count={pageCount}
              size="medium"
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PartnersNetwork;
