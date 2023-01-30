import React, { Fragment, useEffect, useState } from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import CompanyVideoDataService from "../../services/company.video.service";
import ReactPlayer from "react-player";
import StyledPagination from "../Common/StyledPagination";

const CompanyVideo = ({ companies, borderRadius = true }) => {
  const limit = 9;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [count, setCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    (async () => {
      const params = requestParams(limit, pageCnt);

      if (companies.uuid) {
        await CompanyVideoDataService.all(companies.uuid, params).then((r) => {
          const limit = r?.metadata.info?.limit;
          const total = r?.metadata.info?.total;

          setVideos(r?.data);

          setCount(Math.ceil(total / limit));

          if (total > limit) {
            setShowPagination(true);
          }
        });
      }
    })().then(() => setLoading(false));
  }, [companies.uuid, pageCnt]);

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
      {!loading && videos.length > 0 ? (
        <Grid container mb={1} sx={{ padding: 0 }}>
          <Grid container item xs={12} spacing={3}>
            {videos.map((item) => (
              <Grid item xs={12} sm={6} lg={4} key={item.uuid}>
                <Fragment>
                  <Stack>
                    <Card
                      sx={{ height: { xs: "184px", lg: "144px", xl: "188px", borderRadius: '10px' } }}
                    >
                      <ReactPlayer url={item.url} width="100%" height="100%" />
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
                </Fragment>
              </Grid>
            ))}
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
        <Grid item xs={12}>
          <Typography variant="h6">There is no data.</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default CompanyVideo;