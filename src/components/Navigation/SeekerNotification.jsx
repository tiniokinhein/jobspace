import React, { useCallback, useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { seekerNotificationActions } from "../../store";
import ClearIcon from "@mui/icons-material/Clear";

const SeekerNotification = ({ openNotification, handleNotificationClose }) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.seeker_notifications);

  const fetchNotifications = useCallback(() => {
    dispatch(seekerNotificationActions.get());
  }, [dispatch]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleRemoveClick = (item) => {
    dispatch(seekerNotificationActions.destroy(item.uuid)).then(() =>
      dispatch(seekerNotificationActions.get())
    );
  };

  const handleReadClick = () => {
    dispatch(seekerNotificationActions.update({ status: 1 })).then(() =>
      dispatch(seekerNotificationActions.get())
    );
  };

  return (
    <Dialog
      open={openNotification}
      onClose={handleNotificationClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { width: "500px", height: "700px" } }}
      disableScrollLock={true}
      scroll="paper"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ borderBottom: "1px solid #C4C4C4" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize="18px" fontWeight="600">
            Notifications
          </Typography>
          <Button
            varient="text"
            color="primary"
            sx={{ fontSize: "12px", fontWeightt: 600 }}
            onClick={handleReadClick}
          >
            Mark as All Read
          </Button>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <Grid container>
          {Object.keys(notifications?.notifications ?? []).length > 0 &&
            (notifications?.notifications).map((notification) => (
              <Grid
                item
                xs={12}
                md={12}
                sx={{ borderBottom: "1px solid #C4C4C4" }}
                key={notification.uuid}
              >
                <Grid
                  container
                  direction="row"
                  alignItems="start"
                  sx={{
                    padding: "8px 24px",
                    background: notification.status === 0 ? "#eeeeee" : "#fff",
                  }}
                >
                  <Grid item xs={2} md={1.5}>
                    {notification.company?.logo ? (
                      <Avatar
                        alt={`${notification.company?.company_name}`}
                        src={`${process.env.REACT_APP_URL}/storage/logo/${notification.company?.logo}`}
                        sx={{ width: 45, height: 45 }}
                      />
                    ) : (
                      <Avatar sx={{ width: 45, height: 45 }}>
                        {notification.company?.company_name}
                      </Avatar>
                    )}
                  </Grid>
                  <Grid item xs={9.5} md={10}>
                    <Stack direction="column" spacing={0.5}>
                      <Typography
                        fontWeight="400"
                        fontSize="12px"
                        color="#A1A1A1"
                      >
                        {notification.company?.company_name}
                      </Typography>
                      <Typography
                        fontWeight="600"
                        fontSize="14px"
                        color="#000000"
                      >
                        {notification.title}
                      </Typography>
                      <Typography fontSize="12px">
                        {notification.description}
                      </Typography>
                      <Typography
                        fontSize="10px"
                        fontWeight="500"
                        color="#C4C4C4"
                      >
                        {notification.time}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={0.5} md={0.5}>
                    <IconButton
                      type="button"
                      aria-label="delete"
                      size="small"
                      onClick={() => handleRemoveClick(notification)}
                    >
                      <ClearIcon fontSize="inherit" sx={{ color: "#C4C4C4" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SeekerNotification;