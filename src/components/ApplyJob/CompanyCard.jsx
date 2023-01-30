import React, {Fragment} from "react";
import {Card, CardMedia, Paper, Skeleton, Stack, Typography,} from "@mui/material";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";

const CompanyCard = ({ jobDetail, loading }) => {
  const url = process.env.REACT_APP_API_URL + "/companies";

  return (
    <Paper
      elevation={1}
      sx={{ height: "146px", alignItems: "center", display: "flex" }}
    >
      <Stack direction="row" alignItems="center" spacing={1} px="10px">
        <Card elevation={0}>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="square"
              width={87}
              height={87}
            />
          ) : (
            jobDetail.company?.logo && (
              <CardMedia
                component="img"
                sx={{
                  width: 87,
                  padding: "10px",
                  height: 87,
                  borderRadius: "12px",
                }}
                image={`${url}/logo/${jobDetail?.company?.logo}`}
                alt="Company"
              />
            )
          )}
        </Card>
        <Stack direction="column" spacing={1}>
          {loading ? (
            <Fragment>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="100px"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="80px"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="60px" />
            </Fragment>
          ) : (
            <Fragment>
              <Typography
                fontSize="18px"
                sx={{
                  maxWidth: "260px",
                }}
                noWrap={true}
                fontWeight={500}
              >
                {jobDetail?.job_title}
              </Typography>
              <Typography fontSize="14px" noWrap>
                {jobDetail?.company?.company_name}
              </Typography>
              {jobDetail.township && jobDetail.region && (
                <Stack
                  direction="row"
                  display="flex"
                  alignItems="center"
                  spacing={1}
                >
                  <LocationOnSharpIcon
                    sx={{ color: "red", fontSize: "16px" }}
                  />
                  <Typography sx={{ fontSize: "10px", mr: 2 }}>
                    {jobDetail.township?.title},&nbsp;{jobDetail.region?.title}
                  </Typography>
                </Stack>
              )}
              <Typography fontSize="10px" color="#A1A1A1">
                {jobDetail?.posted_date}
              </Typography>
            </Fragment>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CompanyCard;