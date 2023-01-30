import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import SlideShowAdService from "../../services/slide.show.ad.service";
import { Box, Card, CardMedia } from "@mui/material";
import CareerResourceImageDataService from "../../services/career.resource.image.service";

const SlideShowAd = ({ isCareer = false }) => {
  const [slideShows, setSlideShows] = useState([]);

  useEffect(() => {
    if (isCareer) {
      (async () => {
        await CareerResourceImageDataService.get().then((res) =>
          setSlideShows(res.data)
        );
      })();
    } else {
      (async () => {
        await SlideShowAdService.all().then((r) => setSlideShows(r.data));
      })();
    }

    // eslint-disable-next-line
  }, []);

  const SlideShow = React.memo(({ src, alt }) => {
    return (
      <CardMedia
        component="img"
        height="100%"
        width="100%"
        image={src}
        alt={alt}
        sx={{
          minHeight: {
            xs: "400px",
            sm: "396px",
            md: "450px",
            lg: "607px",
            xl: "646px",
          },
        }}
      />
    );
  });

  return (
    <Box sx={{ height: "100%" }}>
      <Carousel
        height="100%"
        indicators={false}
        duration={700}
        sx={{
          minHeight: {
            xs: "400px",
            sm: "396px",
            md: "450px",
            lg: "607px",
            xl: "646px",
          },
        }}
      >
        {slideShows.length > 0 &&
          slideShows.map((slideShowAd) => (
            <Card
              sx={{
                minHeight: {
                  xs: "400px",
                  sm: "396px",
                  md: "450px",
                  lg: "607px",
                  xl: "646px",
                },
                borderRadius: 0,
              }}
              elevation={0}
              key={slideShowAd.uuid}
            >
              <SlideShow src={slideShowAd.image} alt={slideShowAd.name} />
            </Card>
          ))}
      </Carousel>
    </Box>
  );
};

export default SlideShowAd;
