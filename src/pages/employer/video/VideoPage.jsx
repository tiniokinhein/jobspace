import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import SEO from "../../../components/Common/SEO";
import { useDispatch, useSelector } from "react-redux";
import { companyVideoActions } from "../../../store";
import { setProgress } from "../../../store/slices/progress";
import VideoShow from "./VideoShow";
import VideoForm from "../../../components/Employer/VideoForm";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import { helper } from "../../../helpers";

const VideoPage = () => {
  const limit = 10;
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [pageCnt, setPageCnt] = useState(1);
  const [loading, setLoading] = useState(true);
  const { videos } = useSelector((state) => state.companyVideos);

  const fetchVideos = useCallback(
    (limit, pageCnt) => {
      const params = helper.postJobParams(limit, pageCnt);
      dispatch(companyVideoActions.get(params)).then((res) => {
        const total = res.payload.metadata?.info?.total;
        setCount(Math.ceil(total / limit));
        dispatch(setProgress(100));
        setLoading(false);
      });
    },
    [dispatch]
  );

  const handlePageChange = (event, value) => {
    setPageCnt(value);
  };

  useEffect(() => {
    dispatch(setProgress(50));
    fetchVideos(limit, pageCnt);
    // eslint-disable-next-line
  }, [fetchVideos, pageCnt]);

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: "10px",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <SEO title="Company Videos" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 3,
          }}
        >
          <Typography variant="h5" color="primary">
            Videos
          </Typography>
          {!loading && videos.length > 0 && (
            <Button
              variant="text"
              startIcon={<AddIcon />}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
              }}
              component={RouterLink}
              to="/employers/videos/create"
            >
              Upload More Videos
            </Button>
          )}
        </Box>
        <Divider />
        {!loading && (
          <Fragment>
            {videos.length > 0 ? (
              <VideoShow
                data={videos}
                count={count}
                pageCnt={pageCnt}
                handlePageChange={handlePageChange}
                limit={limit}
              />
            ) : (
              <VideoForm />
            )}
          </Fragment>
        )}
      </Box>
    </Box>
  );
};

export default VideoPage;
