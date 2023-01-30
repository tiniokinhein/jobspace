import * as React from "react";
import { useEffect, useState } from "react";
import {
  styled,
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Stack,
} from "@mui/material";
import Logo from "../../../assets/images/logo.svg";
import LanguageMenu from "../LanguageMenu";
import {
  Link as RouterLink,
  NavLink as NavLinkBase,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SeekerAuthAction from "../SeekerAuthAction";
import EmployerAuthAction from "../EmployerAuthAction";
import { useTranslation } from "react-i18next";
import NavbarDrawer from "./NavbarDrawer";
import TopLoadingBar from "../TopLoadingBar";

const Appbar = () => {
  const { t } = useTranslation();
  const { isEmpLoggedIn } = useSelector((x) => x.empAuth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const pages = [
    {
      title: t("my_profile"),
      routeName: "/seekers/dashboard",
      is_show: isLoggedIn,
    },
    {
      title: t("find_jobs"),
      routeName: "/find-jobs",
      is_show: !isEmpLoggedIn,
    },
    {
      title: t("dashboard"),
      routeName: "/employers/dashboard",
      is_show: isEmpLoggedIn,
    },
    {
      title: t("post_a_job"),
      routeName: "/employers/post-job",
      is_show: isEmpLoggedIn,
    },
    {
      title: t("companies"),
      routeName: "/companies/",
      is_show: true,
    },
    {
      title: t("talent_search"),
      // routeName: '/talent-search',
      routeName: "/coming-soon",
      is_show: isEmpLoggedIn,
    },
    {
      title: t("partner_networks"),
      // routeName: '/partner-coming-soon',
      routeName: "/partner-networks",
      is_show: true,
    },
    // {
    //   title: t("overseas_jobs"),
    //   routeName: "/overseas-jobs",
    //   is_show: true,
    // },
    {
      title: t("career_programs"),
      routeName: "/career-resources",
      is_show: true,
    },
  ];

  const classes = {
    activeLink: "active",
  };

  const location = useLocation();
  const [position, setPosition] = useState("sticky");

  const NavLink = React.forwardRef((props, ref) => (
    <NavLinkBase ref={ref} {...props} className={props.activeClassName} />
  ));

  useEffect(() => {
    if (
      location.pathname === "/find-jobs" ||
      location.pathname.match("/find-jobs/*")
    ) {
      setPosition("inherit");
    } else {
      setPosition("sticky");
    }
  }, [location.pathname]);

  return (
    <AppBar
      sx={{
        height: "80px",
        display: "flex",
        position: { position },
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <TopLoadingBar />
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            padding: {
              lg: "0px 30px",
              xl: 0,
            },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            justifyContent="center"
            display="flex"
            sx={{

            }}
          >
            <img src={Logo} alt="logo" width="145px" />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              lineBreak: "anywhere",
              ml: {md: '10px', lg: "23px"},
              display: { xs: "none", md: "flex" },
              fontSize: { md: "9px", lg: "14px", xl: "16px" },
              fontWeight: 500
            }}
            className="nav"
          >
            {pages.map((page, index) =>
              page.is_show ? (
                <StyledListItem
                  disableRipple
                  key={index}
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : undefined
                  }
                  to={page.routeName}
                  component={NavLink}
                >
                  {page.title}
                </StyledListItem>
              ) : null
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            sx={{
              display: { xs: "none", md: "flex", lg: "block" },
            }}
            spacing={1.5}
          >
            <LanguageMenu />

            {isEmpLoggedIn && <EmployerAuthAction />}

            {!isLoggedIn && (
              <StyledButton
                component={RouterLink}
                to="/seekers/sign-in"
                variant={!isEmpLoggedIn ? "outlined" : "contained"}
                color={!isEmpLoggedIn ? "grey" : "accent"}
                sx={{ fontSize: { md: "9px", lg: "16px" } }}
              >
                {!isEmpLoggedIn ? t("login/sign_up") : t("for_job_seeker")}
              </StyledButton>
            )}

            {isLoggedIn && <SeekerAuthAction />}

            {!isEmpLoggedIn && (
              <StyledButton
                component={RouterLink}
                to="employers/sign-in"
                variant="contained"
                color="accent"
                sx={{ fontSize: { md: "9px", lg: "16px" } }}
              >
                {t("for_employer")}
              </StyledButton>
            )}
          </Stack>

          <NavbarDrawer />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;

const StyledListItem = styled(Button)(({ theme }) => ({
  color: "#000",
  fontSize: "inherit",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  borderBottomLeftRadius: "0",
  borderBottomRightRadius: "0",
  backgroundColor: "#fff",
  borderBottomWidth: "2px",
  borderBottom: "2px solid #fff",
  "&:hover": {
    background: "transparent",
    borderBottom: "2px solid #00A0DC",
    boxShadow: "0 6px 4px -4px rgba(0, 0, 0, 0.25)",
  },
  "&:click": {
    background: "transparent",
  }
}));

const StyledButton = styled(Button)(() => ({
    height: '50px',
    fontsize: '16px',
    borderRadius: '7px'
}));