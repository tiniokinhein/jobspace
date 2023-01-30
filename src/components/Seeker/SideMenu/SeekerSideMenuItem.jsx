import { NavLink } from "react-router-dom";
import { userActions } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import { Box, Stack, SvgIcon, Switch, Typography } from "@mui/material";
import { ReactComponent as DiamondIcon } from "../../../assets/icons/bordered-diamond.svg";
import { setMessage, setOpen } from "../../../store/slices/message.slice";
import DashboardIcon from "../../../assets/icons/Dashboard.png";
import AccountHomeIcon from "../../../assets/icons/AccountHome.png";
import MyProfileIcon from "../../../assets/icons/MyProfile.png";
import MyExperiencesIcon from "../../../assets/icons/ExperienceorMyExperiences.png";
import MyEducationsIcon from "../../../assets/icons/QualificationorMyEducations.png";
import MySkillsIcon from "../../../assets/icons/MySkills.png";
import MyLanguagesIcon from "../../../assets/icons/MyLanguages.png";
import UploadMyCVIcon from "../../../assets/icons/UploadMyCV.png";
import JobPreferenceIcon from "../../../assets/icons/JobPreference.png";
import AppliedJobsIcon from "../../../assets/icons/AppliedJobs.png";
import WhitelistIcon from "../../../assets/icons/love-letter.png";
import JobsAlertIcon from "../../../assets/icons/JobsAlert.png";
import GenerateCVIcon from "../../../assets/icons/GenerateCV.png";
import AccountSettingIcon from "../../../assets/icons/AccountSetting.png";

const SeekerSideMenuItem = () => {
  let menus = [
    {
      name: "Dashboard",
      route: "/seekers/dashboard",
      icon: (
        <img src={DashboardIcon} alt="Account Home" width="25" height="25" />
      ),
    },
    {
      name: "Account Home",
      route: "/seekers/account",
      icon: (
        <img src={AccountHomeIcon} alt="Account Home" width="25" height="25" />
      ),
    },
    {
      name: "My Profile",
      route: "/seekers/profile",
      icon: <img src={MyProfileIcon} alt="My Profile" width="25" height="25" />,
    },
    {
      name: "Upload My CV",
      route: "/seekers/upload-cv",
      icon: (
          <img src={UploadMyCVIcon} alt="Upload My CV" width="25" height="25" />
      ),
    },
    {
      name: "My Experiences",
      route: "/seekers/experiences",
      icon: (
        <img
          src={MyExperiencesIcon}
          alt="My Experiences"
          width="25"
          height="25"
        />
      ),
    },
    {
      name: "My Education",
      route: "/seekers/educations",
      icon: (
        <img
          src={MyEducationsIcon}
          alt="My Education"
          width="25"
          height="25"
        />
      ),
    },
    {
      name: "My Skills",
      route: "/seekers/skills",
      icon: <img src={MySkillsIcon} alt="My Skills" width="25" height="25" />,
    },
    {
      name: "My Languages",
      route: "/seekers/languages",
      icon: (
        <img src={MyLanguagesIcon} alt="My Languages" width="25" height="25" />
      ),
    },
    {
      name: "Job Preferences",
      route: "/seekers/job-preferences",
      icon: (
        <img
          src={JobPreferenceIcon}
          alt="Job Preference"
          width="25"
          height="25"
        />
      ),
    },
    {
      name: "Applied Jobs",
      route: "/seekers/applied-jobs",
      icon: (
        <img src={AppliedJobsIcon} alt="Applied Jobs" width="25" height="25" />
      ),
    },
    {
      name: "My Wishlists",
      route: "/seekers/whitelists",
      icon: (
        <img src={WhitelistIcon} alt="whitelists" width="25" height="25" />
      ),
    },
    {
      name: "Jobs Alert",
      route: "/seekers/jobs-alert",
      icon: <img src={JobsAlertIcon} alt="Jobs Alert" width="25" height="25" />,
    },
    {
      name: "Generate CV",
      route: "/seekers/generate-cv",
      icon: (
        <img src={GenerateCVIcon} alt="Generate CV" width="25" height="25" />
      ),
    },
    {
      name: "Account Setting",
      route: "/seekers/setting",
      icon: (
        <img
          src={AccountSettingIcon}
          alt="Account Setting"
          width="25"
          height="25"
        />
      ),
    },
  ];

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openToWork, setOpenToWork] = useState(true);
  const label = { inputProps: { "aria-label": "Switch Open To Work" } };

  useEffect(() => {
    if (user.open_to_work) {
      setOpenToWork(true);
    } else {
      setOpenToWork(false);
    }
  }, [user]);

  const handleSwitchChange = (event) => {
    const data = [];
    const checked = event.target.checked;
    let message = "You're open to work.";

    setOpenToWork(event.target.checked);

    data["open_to_work"] = event.target.checked;

    if (!checked) {
      message = "You aren't open to work.";
    }

    dispatch(setMessage(message));

    dispatch(setOpen(true));

    dispatch(userActions.update(data));
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "5px",
          backgroundColor: "#A1A1A1",
          padding: "0.75rem 1.5rem",
          margin: "0.25rem 0",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "13px", fontWeight: 500 }}>
          Open to Work opportunity for potential employers.
        </Typography>
        <Switch
          {...label}
          checked={openToWork}
          onChange={handleSwitchChange}
          color="warning"
        />
      </Box>

      <Box className="side-menu">
        {menus.map((menu, index) => (
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "0.25rem 0",
                textDecoration: "none",
                color: isActive ? "white" : "#333333",
                borderRadius: isActive ? "5px" : "",
                backgroundColor: isActive ? "#195DCC" : "",
                padding: "0.75rem 1.5rem",
              };
            }}
            to={`${menu.route}`}
            key={index}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {menu.icon}
              <Typography fontSize="14px" color="inherit">
                {menu.name}
              </Typography>
            </Stack>
          </NavLink>
        ))}
      </Box>

      <Box>
        <NavLink
          style={{
            display: "block",
            margin: "0.25rem 0",
            textDecoration: "none",
            backgroundColor: "#F7F5F5",
            padding: "0.75rem 1.5rem",
            borderRadius: "5px",
            border: "0.5px dashed #00A0DC",
            color: "#000000",
          }}
          to="/coming-soon"
        >
          <Typography color="secondary" fontWeight={300} fontSize="14px">
            Upgrade
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              my: 1,
              alignContent: "center",
            }}
          >
            <Stack
              spacing={1.5}
              direction="row"
              justifyContent="center"
              display="flex"
              alignItems="center"
            >
              <SvgIcon fontSize="14px">
                <DiamondIcon width="100%" height="100%" />
              </SvgIcon>
              <Typography fontSize="14px" fontWeight={500} color="inherit">
                Try Premium
              </Typography>
            </Stack>
          </Box>
        </NavLink>
      </Box>
    </Fragment>
  );
};

export default SeekerSideMenuItem;