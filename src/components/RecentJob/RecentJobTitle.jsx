import React from "react";
import { Grid, Stack } from "@mui/material";
import TitleComponent from "../Common/TitleComponent";

const RecentJobTitle = () => {
  return (
    <Grid item xs={12} pb="30px">
      <Stack direction="row" justifyContent="space-between">
        <TitleComponent title="suggest_jobs" />
      </Stack>
    </Grid>
  );
};
export default RecentJobTitle;