import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import TitleComponent from "../Common/TitleComponent";
import TopCompanyService from "../../services/top.companies.service";
import { Link as RouterLink } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "100px",
    height: "100px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "137px",
    height: "137px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "137px",
    height: "137px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  justifyItems: "center",
  borderRadius: "7px",
  border: "0.5px solid #EBEBEB",
  ":hover": {
    boxShadow: theme.shadows[5],
  },
}));

const TopCompaniesCardList = () => {
  const [topCompanies, setTopCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      await TopCompanyService.all().then((r) => {
        setTopCompanies(r.data);
      });
    })();
  }, []);

  const Image = React.memo(({ src }) => {
    return (
        <Avatar
            sx={{
              background: "#FFFFFF",
              width: { xs: "100px", lg: "137px" },
              height: { xs: "100px", lg: "137px" },
              padding: "10px",
            }}
            variant="rounded"
            src={src}
            alt="company"
        />
    )
  })

  return (
    <Grid
      item
      xs={12}
      minHeight="120px"
      direction="column"
      display="flex"
      backgroundColor="#F5FCFF"
      px={{ lg: "30px", xl: 0 }}
      py={5}
      width="100%"
      container
    >
      <Container maxWidth="xl">
        <Grid item xs={12} pb="20px" width="100%" display="flex">
          <TitleComponent title="top_companies" />
        </Grid>
        <Grid item xs={12} width="100%">
          <Box
            sx={{
              p: 4,
              minHeight: "200px",
              borderRadius: "0.63rem",
              border: "1px solid #EBEBEB",
              background: "white",
            }}
          >
            <Box
              sx={{
                maxWidth: "100%",
              }}
            >
              <List
                direction="row"
                component={Stack}
                sx={{ overflowX: "auto" }}
              >
                {topCompanies.length > 0 &&
                  topCompanies.map((company) => (
                    <ListItem
                      key={company.uuid}
                      alignItems="flex-start"
                      sx={{ justifyContent: "center" }}
                    >
                      <Stack
                        direction="column"
                        spacing={2}
                        alignItems="center"
                        sx={{
                          maxWidth: "175px",
                          minWidth: "100px",
                        }}
                      >
                        <StyledCard variant="outlined">
                          <CardActionArea
                            component={RouterLink}
                            to={
                              company.company_uuid
                                ? `/companies/${company.company_uuid}/details`
                                : "#"
                            }
                          >
                            <Image src={company.logo}/>
                          </CardActionArea>
                        </StyledCard>
                        <Typography
                          fontSize={14}
                          align="center"
                          sx={{ "&:hover": { fontWeight: 500 } }}
                        >
                          <Link
                            underline="none"
                            color="inherit"
                            component={RouterLink}
                            to={
                              company.company_uuid
                                ? `/companies/${company.company_uuid}/details`
                                : "#"
                            }
                          >
                            {company.name}
                          </Link>
                        </Typography>
                      </Stack>
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Grid>
  );
};

export default TopCompaniesCardList;
