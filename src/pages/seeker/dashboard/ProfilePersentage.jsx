import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ProfileProgressDataService from "../../../services/profile.progress.service";
import ProfileProgress from "../../../components/Seeker/ProfileProgress";
import { Link as RouterLink } from "react-router-dom";
import CircularProfileProgress from "../../../components/CircularProfileProgress";

const ProfilePercentage = () => {
  const [going, setGoing] = React.useState(0);
  const { user } = useSelector((state) => state.auth);
  const [profileProgress, setProfileProgress] = React.useState({});

  React.useEffect(() => {
    const progress = user.progress;

    if (progress) {
      (async () => {
        await ProfileProgressDataService.get().then((r) => {
          setProfileProgress(r.data ?? {});
          setGoing(r.data?.progress);
        });
      })();
    }
  }, [user]);

  return (
    <Box borderRadius="10px" backgroundColor="white" mb={{ xs: "30px", md: 0 }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ padding: "15px", marginBottom: "24px" }}
      >
        <Typography fontSize="14px" fontWeight="600" textAlign="center">
          Profile Strength : {going}% complete
        </Typography>
        <CircularProfileProgress progress={going} />
        <Typography
          sx={{ textAlign: "center", fontSize: "12px", fontWeight: "300" }}
        >
          Your profile requires some critical information which will help
          recruiters to shortlist you.
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button
            to="/seekers/profile"
            variant="contained"
            component={RouterLink}
            sx={{
              borderRadius: "8px",
              px: 3,
              py: 1.5,
              maxWidth: "160px",
              background: "linear-gradient(180deg, #00A0DC 0%, #0C81AC 100%)",
            }}
          >
            Update Profile
          </Button>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        spacing={2}
        sx={{ padding: "15px", paddingBottom: "40px" }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ProfileProgress
            name="Profile"
            progress={profileProgress.profile ? 100 : 0}
            isComplete={profileProgress.profile}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ProfileProgress
            name="Experience"
            progress={profileProgress.experiences ? 100 : 0}
            isComplete={profileProgress.experiences}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ProfileProgress
            name="Education"
            progress={profileProgress.educations ? 100 : 0}
            isComplete={profileProgress.educations}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ProfileProgress
            name="Skill"
            progress={profileProgress.skills ? 100 : 0}
            isComplete={profileProgress.skills}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ProfileProgress
            name="Language"
            progress={profileProgress.languages ? 100 : 0}
            isComplete={profileProgress.languages}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <ProfileProgress
            name="Job Preference"
            progress={profileProgress.preference ? 100 : 0}
            isComplete={profileProgress.preference}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProfilePercentage;