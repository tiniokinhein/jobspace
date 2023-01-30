import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Favorite from "@mui/icons-material/Favorite";
import { Alert, Checkbox, IconButton, Paper, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { whitelistActions } from "../../store";
import { clearMessage } from "../../store/slices/message.slice";
import CloseIcon from "@mui/icons-material/Close";
import { history } from "../../helpers";

const WhitelistJob = ({
  jobUuid,
  isChecked,
  iconSize = "small",
  isWhitelist = false,
  setWhiteListChange = null,
}) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(isChecked);
  const [open, setOpen] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleWhitelist = (e) => {
    if (!isLoggedIn) {
      history.navigate("/seekers/sign-in");
    } else {
      let type = 0;

      if (e.target.checked) {
        type = 1;
      }

      dispatch(
        whitelistActions.create({ type: type, job_post_id: jobUuid })
      ).then(() => {
        if (isWhitelist) {
          setWhiteListChange((prevState) => !prevState);
        }
      });

      setChecked(!checked);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      {isLoggedIn && isWhitelist ? (
        <Paper
          sx={{
            borderRadius: "10px",
            background: "#ffdfca",
            "&:hover": { boxShadow: 3 },
          }}
        >
          <Checkbox
            icon={<FavoriteBorderOutlinedIcon sx={{ color: "#FF9635" }} />}
            checkedIcon={<Favorite sx={{ color: "#FF9635" }} />}
            onClick={handleWhitelist}
            checked={checked}
            variant="contained"
            sx={{
              minHeight: "20px",
              height: "35px",
              "&:hover": {
                background: "transparent",
              },
            }}
          />
        </Paper>
      ) : (
        <Checkbox
          icon={<FavoriteBorderOutlinedIcon sx={{ color: "#A1A1A1" }} />}
          checkedIcon={<Favorite sx={{ color: "#A1A1A1" }} />}
          onClick={handleWhitelist}
          checked={checked}
        />
      )}

      {message && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size={iconSize}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </React.Fragment>
  );
};

export default WhitelistJob;
