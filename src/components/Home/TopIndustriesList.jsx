import React, { useEffect, useState } from "react";
import { Avatar, Link, Stack, Typography, Grid } from "@mui/material";
import TitleComponent from "../Common/TitleComponent";
import { Link as BrowserLink, useNavigate } from "react-router-dom";
import TopIndustryService from "../../services/top.industry.service";

const TopIndustriesList = () => {
  const navigate = useNavigate();
  const [topIndustries, setTopIndustries] = useState([]);

  useEffect(() => {
    (async () => {
      await TopIndustryService.all({ limit: 6, offset: 0 }).then(res => setTopIndustries(res.data));
    })();
  }, []);

  const handleClick = (uuid) => {
    navigate(`/find-jobs/?indId=${uuid}`, { replace: true });
  };

  return (
    <Grid
      item
      xs={12}
      minHeight="120px"
      display="flex"
      px={{ lg: "30px", xl: 0 }}
      pb={2}
      width="100%"
    >
      <Grid container>
        <Grid
          item
          xs={12}
          pb="20px"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <TitleComponent title="top_industry" />
          <Typography>
            <Link
              component={BrowserLink}
              to="/top-industries"
              underline="hover"
              align="right"
              color="inherit"
            >
              Show All
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} width="100%">
          <Grid container spacing={2}>
            {topIndustries.length > 0 &&
              topIndustries.map((topIndustry) => (
                <Grid item key={topIndustry.uuid} xs={6} sm={4} md={2} lg={2}>
                  <Stack
                    direction="column"
                    justifyItems="center"
                    alignItems="center"
                    spacing={{ sm: 3, md: 4 }}
                    minWidth="100px"
                    sx={{ paddingBottom: "24px" }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#00A0DC",
                        width: 110,
                        height: 110,
                        "&:hover": {
                          boxShadow: 5,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#EAF2F4",
                          width: 100,
                          height: 100,
                          color: "#195DCC",
                          boxShadow: 2,
                        }}
                      >
                        <img
                          src={topIndustry.image ?? null}
                          alt="industry"
                          width="40px"
                          height="40px"
                        />
                      </Avatar>
                    </Avatar>
                    <Link
                      underline="none"
                      width="130px"
                      sx={{
                        "&:hover": {
                          fontWeight: 400,
                          cursor: "pointer",
                        },
                        fontWeight: 300,
                        color: "black",
                      }}
                      onClick={() => handleClick(topIndustry?.uuid)}
                    >
                      <Typography
                        fontWeight="inherit"
                        align="center"
                        fontSize={14}
                      >
                        {topIndustry.title}
                      </Typography>
                    </Link>
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopIndustriesList