import * as React from "react";
import { useEffect, useState } from "react";
import {
  ButtonBase,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopCategoriesService from "../../services/top.category.service";

const StyledCard = styled(Card)(({ theme }) => ({
  maxHeight: 130,
  minHeight: 130,
  borderRadius: "10px",
  textDecoration: "none",
  "&:hover": {
    boxShadow:
      "0px 6px 30px 2px rgb(163 191 255 / 50%)," +
      "0px 10px 14px 1px rgb(163 191 255 / 40%)," +
      "0px 4px 18px 3px rgb(163 191 255 / 37%);",
  },
  border: "none",
  boxShadow:
    "0px 6px 30px 2px rgb(163 191 255 / 30%)," +
    "0px 10px 14px 1px rgb(163 191 255 / 20%)," +
    "0px 4px 18px 3px rgb(163 191 255 / 17%);",
}));

const StyledTitle = styled(Typography)((theme) => ({
  display: {
    sm: "none",
    md: "block",
  },
  fontWeight: 300,
  color: "#333333",
  overflow: "hidden",
  textOverflow: "ellipsis",
  lineClamp: 1,
  width: "160px",
}));

const JobCategoryCardList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [skeletonArray, setSkeletonArray] = useState(Array(6).fill(""));

  useEffect(() => {
    (async () => {
      await TopCategoriesService.all().then((r) => {
        setSkeletonArray(r.data);
        setLoading(false);
      });
    })();
  }, []);

  const handleClick = (uuid) => {
    if (uuid) {
      navigate(`/find-jobs/?catId=${uuid}`, { replace: true });
    } else {
      navigate(`/find-jobs`, { replace: true });
    }
  };

  return (
    <Grid item container xs={12} px="30px" pb={2}>
      <Container maxWidth="xl">
        <Grid
          item
          xs={12}
          minHeight="180px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={2}>
            {skeletonArray.map((value, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2}
                mt={0}
                key={!value ? index : value.uuid ?? index}
              >
                <StyledCard>
                  <ButtonBase
                    sx={{
                      width: "100%",
                      "&:hover": { background: "transparent" },
                    }}
                    onClick={() => handleClick(value?.uuid)}
                  >
                    <CardContent sx={{ minHeight: "130px" }}>
                      <Stack
                        direction="column"
                        height="100%"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {!value && loading ? (
                          <Skeleton variant="circular" width={35} height={35} />
                        ) : (
                          <img
                            alt="application"
                            src={value.image}
                            width="35"
                            height="35"
                          />
                        )}
                        {!value && loading ? (
                          <Skeleton variant="text" width={100} />
                        ) : (
                          <StyledTitle
                            fontSize={{ xs: 12, md: 16 }}
                            paddingX={{ xs: 3, md: 0 }}
                            noWrap
                            align="center"
                          >
                            {value.title}
                          </StyledTitle>
                        )}
                        {!value && loading ? (
                          <Skeleton variant="text" width={50} />
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                            fontSize="12px"
                          >
                            ({value.job_count}&nbsp;jobs)
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </ButtonBase>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default JobCategoryCardList;
