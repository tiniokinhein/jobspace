import React, { useState } from "react";
import { Box, Button, Grid, Link, Stack, Typography } from "@mui/material";
import starRun from "../../assets/images/star-run.svg";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBox from "../Common/SearchBox";

const SearchSection = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [search, setSearch] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = search;

    let histories = localStorage.getItem("rsh");

    if (value) {
      if (histories) {
        try {
          histories = JSON.parse(histories);
        } catch (e) {
          //
        }

        const exist = histories.filter((item) => item.name === value);

        if (exist.length === 0) {
          histories.push({ name: value });
        }
      } else {
        histories = [{ name: value }];
      }

      localStorage.setItem("rsh", JSON.stringify(histories));
    }

    navigate(`/find-jobs/${value}`, { replace: true });
  };

  return (
    <Box>
      <Stack dirextion="column" alignItems="start" justifyContent="center">
        <Typography
          color="white"
          textAlign="left"
          fontWeight="bold"
          sx={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            fontSize: { xs: "29px", sm: "38px", xl: "45px" },
          }}
        >
          Make Tomorrow Yours
        </Typography>
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Typography
            textAlign="left"
            fontWeight="bold"
            sx={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              fontSize: { xs: "29px", sm: "38px", xl: "45px" },
            }}
          >
            <span className="gradient-text">JobSpace.com.mm</span>
          </Typography>
          <Box className="star-div" pb="10px">
            <img alt="star" src={starRun} className="startImg" />
          </Box>
        </Stack>
      </Stack>

      <Box component="form" noValidate onSubmit={handleSubmit} width="100%">
        <Grid container item spacing={2}>
          <Grid item lg={9} md={8}>
            <SearchBox setSearch={setSearch} />
            <Typography align="right">
              <Link
                component={RouterLink}
                to="/find-jobs"
                underline="hover"
                pt="12px"
                color="#FFFFFF"
                fontSize="12px"
                fontWeight={500}
              >
                Advanced Search
              </Link>
            </Typography>
          </Grid>

          <Grid item lg={1} md={2}>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              fullWidth
              sx={{
                "&.MuiButtonBase-root:hover": {
                  background:
                    "linear-gradient(180deg, #64CCF3 0%, #00A0DC 100%)",
                },
                background: "linear-gradient(180deg, #64CCF3 0%, #00A0DC 100%)",
                borderRadius: "7px",
                width: "133px",
                height: "54px",
                fontSize: "16px",
              }}
              startIcon={<SearchIcon />}
            >
              {t("search")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchSection;