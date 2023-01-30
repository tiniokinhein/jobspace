import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import SEO from "../../../components/Common/SEO";
import { useDispatch, useSelector } from "react-redux";
import { companyPhotoActions } from "../../../store";
import { setProgress } from "../../../store/slices/progress";
import PhotoForm from "../../../components/Employer/PhotoForm";
import PhotoShow from "./PhotoShow";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import { helper } from "../../../helpers";

const PhotoPage = () => {
  const limit = 10;
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [loading, setLoading] = useState(true);
  const { photos } = useSelector((state) => state.companyPhotos);

  const fetchPhotos = useCallback(
    (limit, pageCnt) => {
      const params = helper.postJobParams(limit, pageCnt);
      dispatch(companyPhotoActions.get(params)).then((res) => {
        const total = res.payload.metadata?.info?.total;
        setCount(Math.ceil(total / limit));
        dispatch(setProgress(100));
        setLoading(false);
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setProgress(50));
    fetchPhotos(limit, pageCnt);
      // eslint-disable-next-line
  }, [fetchPhotos, pageCnt]);

  const handlePageChange = (event, value) => {
    setPageCnt(value);
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
      <SEO title="Company Photos" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 3,
            px: 4,
          }}
        >
          <Typography variant="h5" color="primary">
            Photos
          </Typography>
          {!loading && photos.length > 0 && (
            <Button
              variant="text"
              startIcon={<AddIcon />}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
              }}
              component={RouterLink}
              to="/employers/photos/create"
            >
              Upload More Photos
            </Button>
          )}
        </Box>
        <Divider />
        {!loading && (
          <Fragment>
            {photos.length > 0 ? (
              <PhotoShow
                data={photos}
                count={count}
                pageCnt={pageCnt}
                handlePageChange={handlePageChange}
                limit={limit}
              />
            ) : (
              <PhotoForm />
            )}
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default PhotoPage;
