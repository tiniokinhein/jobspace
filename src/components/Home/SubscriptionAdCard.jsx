import * as React from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
  Paper,
  Grid,
  styled,
  Link,
} from "@mui/material";
import orangeStar from "../../assets/images/orange-star.svg";
import primaryStar from "../../assets/images/primary-star.svg";
import { Link as RouterLink } from "react-router-dom";

const StyledBtn = styled(Button)(() => ({
  borderRadius: "34px",
  minWidth: "207px",
  minHeight: "44px",
}));

const SubscriptionAdCard = () => {
  return (
    <Grid
      item
      py={3}
      xs={12}
      width="100%"
      px={{ lg: "30px", xl: 0 }}
      justifyContent="space-between"
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <Paper elevation={5} sx={{ borderRadius: "10px" }}>
        <Grid
          container
          direction="row"
          width="100%"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Grid item xs={12}>
            <List
              component={Stack}
              direction="row"
              disablePadding
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <ListItem
                disablePadding
                sx={{
                  width: {
                    md: "50%",
                    lg: "40%",
                  },
                  minHeight: "200px",
                  alignItems: "center",
                  background:
                    "linear-gradient(308.29deg, #16A1D9 -4.94%, #5CBDE4 100%)",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                <Stack
                  direction="column"
                  spacing={2}
                  py="20px"
                  width="100%"
                  height="100%"
                >
                  <Typography
                    variant="h6"
                    align="center"
                    className="golden-gradient"
                    fontWeight={700}
                  >
                    JobSpace
                    <br />
                    Premium Plan
                  </Typography>
                </Stack>
              </ListItem>
              <ListItem disablePadding>
                <Stack
                  direction="column"
                  spacing={2}
                  p="20px"
                  width="100%"
                  alignItems="center"
                >
                  <Stack direction="column" alignItems="center">
                    <Typography align="center" variant="h6">
                      <span style={{ color: "#D86713" }}>Career</span>
                      &nbsp;Subscription
                    </Typography>
                    <img src={primaryStar} alt="primary star" width="140px" />
                  </Stack>
                  <Typography color="secondary" fontWeight={300} align="center">
                    Tools for Candidates
                  </Typography>
                  <Link
                    to="career-subscription"
                    component={RouterLink}
                    style={{ textDecoration: "none" }}
                  >
                    <StyledBtn variant="outlined" color="grey">
                      Coming Soon
                    </StyledBtn>
                  </Link>
                </Stack>
              </ListItem>
              <Divider orientation="vertical" flexItem />
              <ListItem disablePadding>
                <Stack
                  direction="column"
                  spacing={2}
                  p="20px"
                  width="100%"
                  alignItems="center"
                >
                  <Stack direction="column" alignItems="center">
                    <Typography align="center" variant="h6">
                      <span style={{ color: "#D86713" }}>Business</span>
                      &nbsp;Subscription
                    </Typography>
                    <img src={orangeStar} alt="primary star" width="140px" />
                  </Stack>
                  <Typography color="secondary" fontWeight={300} align="center">
                    Tools for Employers
                  </Typography>
                  <Link
                    to={"contact-us"}
                    component={RouterLink}
                    style={{ textDecoration: "none" }}
                    sx={{
                      minWidth: "256px",
                    }}
                  >
                    <StyledBtn variant="outlined" color="grey">
                      Get Best Talents In Shortest Time
                    </StyledBtn>
                  </Link>
                </Stack>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SubscriptionAdCard;