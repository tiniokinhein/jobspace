import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import CompanyImageDataService from "../../services/company.image.service";
import StyledPagination from "../Common/StyledPagination";

const CompanyImage = ({ companies, borderRadius = true }) => {
  const limit = 9;
  const url = process.env.REACT_APP_URL;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState([]);
  const [count, setCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [showPagination, setShowPagination] = useState(false);

  useEffect(() => {
    (async () => {
      const params = requestParams(limit, pageCnt);

      if (companies.uuid) {
        await CompanyImageDataService.all(companies.uuid, params).then((r) => {
          const total = r?.metadata.info?.total;

          setImages(r?.data);

          setCount(Math.ceil(total / limit));

          console.log(Math.ceil(total / limit))

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

  const Image = React.memo(({ src, alt }) => {
    return (
      <Avatar
        variant="rounded"
        alt={alt}
        src={`${url}/storage/employerImage/${src}`}
        sx={{
          width: { xs: 300, sm: 225, md: 240, lg: 270, xl: 335 },
          height: { xs: 200, sm: 150, md: 160, lg: 170, xl: 200 },
          borderRadius: "10px",
        }}
        loading="lazy"
      />
    );
  });

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        borderRadius: borderRadius ? "10px" : "0",
        boxShadow: borderRadius
          ? "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)"
          : "0",
        width: "100%",
      }}
    >
      {!loading && images.length > 0 ? (
        <Grid container mb={1} sx={{ padding: 0 }} spacing={1}>
          <Grid container item xs={12} spacing={2} padding={0}>
            {images.map((item) => (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                key={item.uuid}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Image src={item.image} alt={item.name} />
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

export default CompanyImage;
