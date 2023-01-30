import React, {useState} from "react";
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    createTheme,
    Grid,
    Menu,
    MenuItem,
    Rating,
    Stack,
    ThemeProvider,
    Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import {Link as RouterLink} from "react-router-dom";
import FlagSharpIcon from "@mui/icons-material/FlagSharp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useDispatch} from "react-redux";
import {ratingActions} from "../../../store/slices/rating.slide";
import MoveWarnDialog from "../MoveWarnDialog";
import {recruitmentActions, resumeActions} from "../../../store";
import AdditionalAnswerDialog from "../PostedJob/AdditionalAnswerDialog";
import Cookie from "js-cookie";

const theme = createTheme({
  palette: {
    success: {
      main: "rgba(115, 175, 0, 1)",
      contrastText: "#fff",
    },
  },
});

const SeekerCard = ({ applicant, dRating, uuid, params }) => {
  const dispatch = useDispatch();
  const [to, setTo] = useState(null);
  const [toDes, setToDes] = useState(null);
  const [rating, setRating] = useState(dRating);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRating = (value) => {
    dispatch(
      ratingActions.create({
        uuid: uuid,
        data: {
          rating: value ?? 0,
          user_id: applicant.user_id,
        },
      })
    ).then(() => {
      setRating(value);
      dispatch(
        recruitmentActions.getApplicants({ uuid: uuid, params: params })
      );
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event, reason) => {
    setAnchorEl(null);

    if (!reason) {
      let toDes;
      let { actionValue } = event.currentTarget.dataset;

      switch (actionValue) {
        case "1":
          toDes = "prescreen";
          break;
        case "4":
          toDes = "hired";
          break;
        case "6":
          toDes = "considering";
          break;
        case "7":
          toDes = "candidate";
          break;
        default:
          toDes = "candidate";
          break;
      }

      setToDes(toDes);
      setTo(actionValue);
      setWarnOpen(true);
    }
  };

  const [warnOpen, setWarnOpen] = useState(false);

  const handleWarnClose = (event, reason) => {
    if (!reason) {
      setWarnOpen(false);
    }
  };

  const handleWarnMove = () => {
    if (to) {
      updateType(to);
      setWarnOpen(false);
    }
  };

  const handleUpdateType = (type) => {
    let toDes;

    switch (type) {
      case 3:
        toDes = "shortlist";
        break;
      case 2:
        toDes = "interview";
        break;
      case 5:
        toDes = "not suitable";
        break;
      default:
        toDes = "candidate";
        break;
    }

    setTo(type);
    setToDes(toDes);
    setWarnOpen(true);
  };

  const updateType = (type) => {
    dispatch(
      recruitmentActions.updateApplicantType({
        uuid: uuid,
        data: {
          type: type,
          user_id: applicant.user_id,
        },
      })
    ).then(() => {
      dispatch(recruitmentActions.getAnalysis(uuid));
    });
  };

  const handleClickQuestion = () => {
    setDialogOpen(true);
  };

  const handelCloseQuestion = () => {
    setDialogOpen(false);
  };

  const downloadFile = () => {
    dispatch(
      resumeActions.getApplicantResume({ pId: uuid, uId: applicant.user_id })
    ).then((res) => {
      if (res.payload?.path) {
        fetch(
          `${process.env.REACT_APP_API_URL}/job-seeker/resume/file/${res.payload.path}`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(Cookie.get("XSRF-TOKEN")),
            },
          }
        )
          .then((response) => response.blob())
          .then((blob) => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = res.payload?.path;
            a.click();
          });
      }
    });
  };

  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{ border: "1px solid #E5E5E5", borderRadius: "5px" }}
        variant="outlined"
      >
        <CardContent sx={{ minHeight: "250px" }}>
          <Stack>
            <Grid
              container
              spacing={1}
              sx={{
                alignItems: "start",
                display: "flex",
                flexDirection: { xs: "row" },
              }}
            >
              <Grid container item xs={9} md={10} sx={{ alignItems: "start" }}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={6}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography sx={{ color: "#195DCC", pb: 1 }}>
                    {applicant.name}
                  </Typography>
                  {applicant.job_title && (
                    <Typography
                      sx={{
                        color: "#A1A1A1",
                        fontSize: "12px",
                        pb: 1,
                        display: { xs: "block", sm: "none" },
                      }}
                    >
                      <Typography
                        component={"span"}
                        sx={{ color: "#00A0DC", fontSize: "12px" }}
                      >
                        {applicant.job_title}
                      </Typography>
                    </Typography>
                  )}
                  <Typography
                    sx={{
                      color: "#A1A1A1",
                      fontSize: "12px",
                      pb: { xs: 1, sm: 2 },
                    }}
                  >
                    Application Date: {applicant.applied_date}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 0, sm: 1 }}
                    alignItems={{ xs: "start", sm: "center" }}
                    height="100%"
                  >
                    <Typography
                      sx={{
                        color: "#FF4B55",
                        fontSize: "9px",
                        paddingLeft: { xs: "2px", sm: 0 },
                      }}
                    >
                      click on star to rate
                    </Typography>
                    <Stack spacing={1}>
                      <Rating
                        defaultValue={dRating}
                        value={rating}
                        name="rating"
                        onChange={(event, newValue) => handleRating(newValue)}
                      />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Grid
                item
                xs={3}
                md={2}
                lg={2}
                sx={{ display: "flex", flexDirection: "row-reverse" }}
              >
                {applicant.profile_img ? (
                  <Avatar
                    sx={{ width: 70, height: 70, border: "1px solid #E8E8E8" }}
                    src={`${applicant.profile_img}`}
                  />
                ) : (
                  <Avatar sx={{ width: 70, height: 70 }}>
                    {applicant.name}
                  </Avatar>
                )}
              </Grid>

              {applicant.job_title && (
                <Grid item xs={12} md={12} lg={12}>
                  <Typography
                    sx={{
                      color: "#A1A1A1",
                      fontSize: "12px",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    <Typography
                      component={"span"}
                      sx={{ color: "#00A0DC", fontSize: "12px" }}
                    >
                      {applicant.job_title}
                    </Typography>
                    &nbsp;|&nbsp;{applicant.experiences}{" "}
                    {applicant.age && ` | ${applicant.age}`}
                  </Typography>
                </Grid>
              )}

              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{ display: "flex", alignItems: "center", pb: 1 }}
              >
                <Stack direction="row" spacing={1.5}>
                  <SchoolIcon sx={{ color: "#195DCC", fontSize: "1rem" }} />
                  <Typography sx={{ color: "#A1A1A1", fontSize: "12px" }}>
                    {applicant.education}
                  </Typography>
                </Stack>
              </Grid>

              {applicant.additional_questions &&
              applicant.additional_questions.length > 0 ? (
                <Grid item xs={12} md={12} lg={12} sx={{ mb: 1.5 }}>
                  <Button
                    sx={{
                      background: "rgba(231, 250, 195, 1)",
                      px: 1,
                      pt: 0.6,
                      pb: 0.3,
                      borderRadius: "3px",
                      "&:hover": {
                        background: "rgba(231, 250, 195, 1)",
                      },
                    }}
                    size="small"
                    startIcon={<FlagSharpIcon sx={{ color: "#195DCC" }} />}
                    onClick={handleClickQuestion}
                  >
                    <Typography sx={{ fontSize: "12px", color: "#195DCC" }}>
                      Additional information
                    </Typography>
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }} />
              )}
            </Grid>

            <Grid container>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <ThemeProvider theme={theme}>
                  <ButtonGroup
                    variant="contained"
                    color="success"
                    aria-label="outlined button group"
                  >
                    <Button
                      sx={{ textTransform: "none" }}
                      onClick={() => handleUpdateType(3)}
                    >
                      Shortlisted
                    </Button>
                    <Button
                      sx={{
                        textTransform: "none",
                        display: { xs: "none", sm: "block" },
                      }}
                      onClick={() => handleUpdateType(2)}
                    >
                      Interview
                    </Button>
                    <Button
                      sx={{
                        textTransform: "none",
                        display: { xs: "none", sm: "block" },
                      }}
                      onClick={() => handleUpdateType(5)}
                    >
                      Not Suitable
                    </Button>
                    <Button
                      id="more-button"
                      aria-controls={open ? "more-item" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertIcon
                        sx={{ color: "#FFFFFF", fontSize: "20px" }}
                      />
                    </Button>
                    <Menu
                      id="more-item"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "more-button",
                      }}
                      disableScrollLock={true}
                    >
                      <MenuItem
                        onClick={handleClose}
                        sx={{ display: { xs: "block", sm: "none" } }}
                        data-action-value="2"
                      >
                        Interview
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        sx={{ display: { xs: "block", sm: "none" } }}
                        data-action-value="5"
                      >
                        Not Suitable
                      </MenuItem>
                      <MenuItem onClick={handleClose} data-action-value="7">
                        Candidate
                      </MenuItem>
                      <MenuItem onClick={handleClose} data-action-value="1">
                        Prescreen
                      </MenuItem>
                      <MenuItem onClick={handleClose} data-action-value="6">
                        Considering
                      </MenuItem>
                      <MenuItem onClick={handleClose} data-action-value="4">
                        Hired
                      </MenuItem>
                    </Menu>
                  </ButtonGroup>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
        <CardActions sx={{ background: "#EBEBEB" }}>
          <Button
            size="large"
            color="primary"
            component={RouterLink}
            to={`/employers/posted-jobs/${uuid}/applicants/${applicant.user_id}/profile`}
          >
            Profile
          </Button>
          <Button size="large" color="primary" onClick={downloadFile}>
            Download CV
          </Button>
          <Button
            size="large"
            color="primary"
            component={RouterLink}
            to={`/employers/posted-jobs/${uuid}/applicants/${applicant.user_id}/resume`}
          >
            View CV
          </Button>
        </CardActions>
      </Card>

      <AdditionalAnswerDialog
        open={dialogOpen}
        handelCloseQuestion={handelCloseQuestion}
        questions={applicant.additional_questions}
      />

      <MoveWarnDialog
        open={warnOpen}
        handleClose={handleWarnClose}
        handleWarnMove={handleWarnMove}
        to={toDes}
      />
    </Grid>
  );
};

export default SeekerCard;