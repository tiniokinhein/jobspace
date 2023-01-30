import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import ExperienceItem from "./ExperienceItem";
import { useDispatch } from "react-redux";
import { seekerExperienceActions } from "../../../store";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import WarnDialog from "../../Common/WarnDialog";

const ExperienceList = ({ data }) => {
  const dispatch = useDispatch();
  const [uuid, setUuid] = useState(null);
  const [open, setOpen] = useState(false);
  const [experiences, setExperiences] = useState(data);
  const [currentEmployment, setCurrentEmployment] = useState([]);
  const [previousEmployments, setPreviousEmployments] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTrashClick = (uuid) => {
    setOpen(true);
    setUuid(uuid);
  };

  const handleDelete = () => {
    if (uuid) {
      dispatch(seekerExperienceActions.destroy(uuid)).then(() => {
        removeItem(uuid);
        dispatch(seekerExperienceActions.get());
      });
    }

    setOpen(false);
  };

  const removeItem = (uuid) => {
    const data = [...experiences];
    const part = data.filter((value) => value.uuid === uuid);
    if (part.length > 0) {
      const index = experiences.indexOf(part[0]);
      if (index > -1) {
        data.splice(index, 1);
        setExperiences(data);
      }
    }
  };

  useEffect(() => {
    setCurrentEmployment(
      experiences.filter((value) => {
        return value.is_present === 1;
      })
    );

    setPreviousEmployments(
      experiences.filter((value) => {
        return value.is_present === 0;
      })
    );
  }, [experiences]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="start"
      alignItems="center"
      sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
      spacing={3}
    >
      <Grid container item xs={12} spacing={3}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={400} color="primary">
            Current Employment
          </Typography>

          {currentEmployment.length < 1 && (
            <Button
              variant="text"
              startIcon={<AddIcon />}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
              }}
              component={RouterLink}
              to="/seekers/experiences/create?current=1"
            >
              Add Current Employments
            </Button>
          )}
        </Grid>
        {currentEmployment.length > 0 && (
          <Grid item xs={12}>
            <ExperienceItem
              data={currentEmployment[0]}
              handleTrashClick={handleTrashClick}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={400} color="primary">
          Previous Employments
        </Typography>

        <Button
          variant="text"
          startIcon={<AddIcon />}
          sx={{
            fontSize: "14px",
            fontWeight: 400,
          }}
          component={RouterLink}
          to="/seekers/experiences/create"
        >
          Add Previous Employments
        </Button>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        {previousEmployments.length > 0 &&
          previousEmployments.map((PreviousEmployment, index) => (
            <ExperienceItem
              data={PreviousEmployment}
              key={index}
              handleTrashClick={handleTrashClick}
            />
          ))}
      </Grid>

      <WarnDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Grid>
  );
};

export default ExperienceList;
