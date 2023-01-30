import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Link,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import StarBg from "../../assets/backgrounds/star-bg.png";
import OuterOrbitBg from "../../assets/backgrounds/outer-orbit-bg.svg";
import InnerOrbitBg from "../../assets/backgrounds/inner-orbit-bg.svg";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import OrbitCompanyService from "../../services/orbit.companies.service";
import GraRockedIcon from "../../assets/icons/gra-rocket.svg";
import { history } from "../../helpers";

const StyledPaper = styled(Paper)(() => ({
  width: "120px",
  height: "120px",
  maxWidth: "120px",
  maxHeight: "120px",
  borderRadius: "50%",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: 50,
    height: 50,
  },
  [theme.breakpoints.up("lg")]: {
    width: 65,
    height: 65,
  },
  zIndex: 1,
  position: "absolute",
  display: "inline-block",
  background: "transparent",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: 50,
    height: 50,
  },
  [theme.breakpoints.up("lg")]: {
    width: 65,
    height: 65,
  },
  position: "absolute",
  display: "inline-block",
}));

const OrbitAnimation = () => {
  const [orbits, setOrbits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isEmpLoggedIn } = useSelector((state) => state.empAuth);

  useEffect(() => {
    (async () => {
      await OrbitCompanyService.all().then((r) => {
        setOrbits(r.data);
        setLoading(false);
      });
    })();
  }, []);

  const handleClick = () => {
    if (isEmpLoggedIn) {
      history.navigate("/employers/post-job");
    } else {
      if (isLoggedIn) {
        history.navigate("/seekers/upload-cv");
      } else {
        history.navigate("/seekers/sign-in");
      }
    }
  };

  return (
    <Box
      component={Grid}
      container
      item
      md={5}
      lg={5}
      width="100%"
      display={{
        xs: "none",
        md: "block",
      }}
    >
      <Grid item md={12} width="100%">
        <Box
          width="100%"
          minHeight="450px"
          maxHeight="450px"
          flexGrow={1}
          sx={{
            backgroundImage: `url(${OuterOrbitBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: {
              md: "80% 80%",
              lg: "452px",
            },
            backgroundPosition: "center",
          }}
          justifyContent="center"
          alignItems="center"
          justifyItems="center"
        >
          <Box
            flexGrow={1}
            width="100%"
            minHeight="450px"
            maxHeight="450px"
            sx={{
              backgroundImage: `url(${InnerOrbitBg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: {
                md: "50% 50%",
                lg: "296px",
              },
              backgroundPosition: "center",
            }}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Box
              className="twinkle"
              flexGrow={1}
              width={{
                md: "35%",
                lg: "32.5%",
                xl: "24%",
              }}
              minHeight={{
                md: "370px",
                lg: "450px",
              }}
              maxHeight="450px"
              sx={{
                zIndex: "auto",
                position: "absolute",
                backgroundImage: `url(${StarBg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: {
                  md: "321px 345px",
                  lg: "401px 409px",
                },
                backgroundPosition: "right",
              }}
            />
            <Link onClick={handleClick} underline="none" sx={{ zIndex: 2 }}>
              <StyledPaper
                component={Stack}
                spacing={1}
                direction="column"
                justifyContent="center"
                sx={{
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 43.75%, #C4C4C4 97.92%)",
                  alignItems: "center",
                }}
                display="flex"
              >
                <Typography
                  align="center"
                  fontSize={14}
                  fontWeight={500}
                  color="secondary"
                >
                  {isEmpLoggedIn ? "POST A JOB" : "UPLOAD CV"}
                </Typography>
                <img src={GraRockedIcon} alt="rocket" width={20} height={30} />
                <Typography
                  align="center"
                  fontSize="11px"
                  color="#585858"
                  component="span"
                >
                  click here
                </Typography>
              </StyledPaper>
            </Link>

            {!loading &&
              orbits.length > 0 &&
              orbits.map((orbit, index) => {
                return (
                  <StyledLink
                    to={
                      orbit.company_id
                        ? `/companies/${orbit.company_id}/details`
                        : "#"
                    }
                    component={RouterLink}
                    className={`inner-orbit-${index + 1}`}
                    key={orbit.uuid}
                  >
                    <StyledAvatar
                        src={orbit.logo}
                        alt={orbit.name}
                        className={`inner-orbit-img-${index + 1}`}
                    />
                  </StyledLink>
              )})}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default OrbitAnimation;