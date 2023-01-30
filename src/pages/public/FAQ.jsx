import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import FaqAccordion from "../../components/Common/FaqAccordion";
import FaqDataService from "../../services/faq.service";
import SEO from "../../components/Common/SEO";
import faqImg from "../../assets/images/faq.svg";
import BackgroundImg from "../../assets/backgrounds/dot-bg.png";
import { Link as RouterLink } from "react-router-dom";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  const initFetch = useCallback(async () => {
    await FaqDataService.get().then((res) => setFaqs(res.data));
  }, []);

  useEffect(() => {
    initFetch();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "content-box",
      }}
    >
      <Container maxWidth={"xl"}>
        <Box
          sx={{
            padding: {
              lg: "0px 30px",
              xl: 0,
            },
            my: 4,
          }}
        >
          <SEO title="FAQ" />
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: "10px",
                  pt: 2,
                  backgroundImage:
                    "linear-gradient(to right top, #195dcc, #0077da, #008fe4, #32a6eb, #5abcf0, #62c1f0, #6bc5f0, #74caf0, #61c0eb, #4cb5e6, #32abe1, #00a0dc)",
                }}
                elevation={0}
              >
                <Stack
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                  spacing={3}
                >
                  <CardMedia
                    component="img"
                    image={faqImg}
                    sx={{
                      width: "20%",
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        flexDirection: "column",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <Typography
                        align="center"
                        variant="h5"
                        fontWeight={700}
                        letterSpacing="3px"
                        color="white"
                      >
                        Frequently Asked Questions
                      </Typography>
                      <Typography
                        align="center"
                        sx={{
                          mt: 2,
                          letterSpacing: "3px",
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      >
                        <Link
                          component={RouterLink}
                          to="/contact-us"
                          underline="hover"
                          color="inherit"
                        >
                          Need Help?
                        </Link>
                      </Typography>
                      <Typography
                        align="center"
                        sx={{
                          mt: 2,
                          letterSpacing: "3px",
                          color: "#fff",
                          fontWeight: 500,
                        }}
                      >
                        We've got you covered
                      </Typography>
                    </Box>
                  </CardContent>
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={3}>
                {faqs.length > 0 &&
                  faqs.map((faq) => (
                    <Grid item xs={12}>
                      <FaqAccordion
                        question={faq?.question}
                        answer={faq?.answer}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
