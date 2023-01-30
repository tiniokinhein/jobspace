import React, { Fragment, useState } from "react";
import {
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageMenuDrawer from "../LanguageMenuDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import EmployerAuthActionDrawer from "../EmployerAuthActionDrawer";
import SeekerAuthActionDrawer from "../SeekerAuthActionDrawer";
import EmployerNotification from "../EmployerNotification";
import SeekerNotification from "../SeekerNotification";

export default function NavbarDrawer() {
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isEmpLoggedIn } = useSelector((state) => state.empAuth);
  const { empNotifications } = useSelector(
    (state) => state.employer_notifications
  );
  const { notifications } = useSelector((state) => state.seeker_notifications);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [openNotification, setOpenNotification] = useState(false);

  const handleNotificationOpen = () => {
    setOpenNotification(true);
  };

  const handleNotificationClose = () => {
    setOpenNotification(false);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {!isEmpLoggedIn && (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/find-jobs">
              <ListItemText>
                <Typography sx={{ fontSize: "14px" }}>
                  {t("find_jobs")}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}

        {isEmpLoggedIn && (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/employers/post-job">
              <ListItemText>
                <Typography sx={{ fontSize: "14px" }}>
                  {t("post_a_job")}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/companies">
            <ListItemText>
              <Typography sx={{ fontSize: "14px" }}>
                {t("companies")}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        {isEmpLoggedIn && (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/coming-soon">
              <ListItemText>
                <Typography sx={{ fontSize: "14px" }}>
                  {t("talent_search")}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/partner-networks">
            <ListItemText>
              <Typography sx={{ fontSize: "14px" }}>
                {t("partner_networks")}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        {/*<ListItem disablePadding>*/}
        {/*  <ListItemButton component={RouterLink} to="/overseas-jobs">*/}
        {/*    <ListItemText>*/}
        {/*      <Typography sx={{ fontSize: "14px" }}>*/}
        {/*        {t("overseas_jobs")}*/}
        {/*      </Typography>*/}
        {/*    </ListItemText>*/}
        {/*  </ListItemButton>*/}
        {/*</ListItem>*/}
      </List>

      <Divider />
      <List>
        <LanguageMenuDrawer />
      </List>

      <List>
        {isLoggedIn && <SeekerAuthActionDrawer />}

        {isEmpLoggedIn && <EmployerAuthActionDrawer />}

        {/* <EmployerAuthActionDrawer/> */}

        <Divider />

        {!isLoggedIn && (
          <Fragment>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/seekers/sign-in">
                <ListItemIcon>
                  <LoginIcon sx={{ color: "#A1A1A1" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>
                    {!isEmpLoggedIn ? t("login/sign_up") : t("for_job_seeker")}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
          </Fragment>
        )}

        {!isEmpLoggedIn && (
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/employers/sign-in"
              sx={{
                background: "#FF9635",
                color: "#ffffff",
                my: 2,
                mx: 4,
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                borderRadius: "4px",
              }}
            >
              <ListItemText>
                <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
                  {t("for_employer")}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {isEmpLoggedIn && (
        <Box display={{ xs: "block", md: "none" }}>
          <IconButton size="large" onClick={handleNotificationOpen}>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "#B71C1C",
                },
              }}
              badgeContent={empNotifications?.newCnt ?? 0}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <EmployerNotification
            openNotification={openNotification}
            handleNotificationClose={handleNotificationClose}
          />
        </Box>
      )}

      {isLoggedIn && (
        <Box display={{ xs: "block", md: "none" }}>
          <IconButton size="large" onClick={handleNotificationOpen}>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "#B71C1C",
                },
              }}
              badgeContent={notifications?.newCnt ?? 0}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <SeekerNotification
            openNotification={openNotification}
            handleNotificationClose={handleNotificationClose}
          />
        </Box>
      )}
      <Box display={{ xs: "block", md: "none" }}>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton onClick={toggleDrawer(anchor, true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}
