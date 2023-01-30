import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { companyPhotoActions } from "../../../store";
import WarnDialog from "../../../components/Common/WarnDialog";
import { useDispatch } from "react-redux";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StyledPagination from "../../../components/Common/StyledPagination";

const PhotoShow = ({ data, count, pageCnt, handlePageChange, limit }) => {
  const dispatch = useDispatch();
  const [uuid, setUuid] = useState(null);
  const [open, setOpen] = useState(false);

  const handleTrashClick = (uuid) => {
    setOpen(true);
    setUuid(uuid);
  };

  const handleDelete = () => {
    if (uuid) {
      dispatch(companyPhotoActions.destroy(uuid)).then(() =>
        dispatch(companyPhotoActions.get())
      );
    }

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ px: 4, py: 3 }}>
      <Grid container mb={3} spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.uuid}>
            <Card sx={{ maxWidth: 345, borderRadius: "10px" }} elevation={2}>
              <CardMedia
                component="img"
                height="200"
                image={`${item.image}`}
                alt="company image"
              />
              <CardActions disableSpacing>
                <Stack
                  direction="column"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  display="flex"
                  width="100%"
                  spacing={1}
                >
                  <Stack
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="flex-start"
                    display="flex"
                    width="100%"
                    direction="row"
                  >
                    <Stack direction="column" spacing={1}>
                      <Typography fontSize="15px" fontWeight={500}>
                        {item.name}
                      </Typography>
                      {item.status === 0 && (
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <PendingIcon
                            sx={{
                              fontSize: "15px",
                              marginRight: "4px",
                            }}
                            color="primary"
                          />
                          <Typography
                            fontSize="12px"
                            fontWeight={500}
                            color="#A1A1A1"
                          >
                            Awaiting Approval
                          </Typography>
                        </Stack>
                      )}

                      {item.status === 1 && (
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <CheckCircleIcon
                            color="success"
                            sx={{
                              fontSize: "15px",
                              marginRight: "4px",
                            }}
                          />
                          <Typography
                            fontSize="12px"
                            fontWeight={500}
                            color="#A1A1A1"
                          >
                            Approved
                          </Typography>
                        </Stack>
                      )}

                      {item.status === 2 && (
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <CancelIcon
                            color="error"
                            sx={{
                              fontSize: "15px",
                              marginRight: "4px",
                            }}
                          />
                          <Typography
                            fontSize="12px"
                            fontWeight={500}
                            color="#A1A1A1"
                          >
                            Rejected
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleTrashClick(item.uuid)}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography fontSize="13px" color="#A1A1A1">
                    Posted on {item.published_date}
                  </Typography>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <StyledPagination
            count={count}
            pageCnt={pageCnt}
            handlePageChange={handlePageChange}
            align="center"
          />
        </Grid>
      </Grid>
      <WarnDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default PhotoShow;
