import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import TemplateOne from "../../assets/images/template_one.jpg";
import TemplateTwo from "../../assets/images/template_two.png";
import { history } from "../../helpers";
import WarnBlockQuote from "../Employer/WarnBlockQuote";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { setProgress } from "../../store/slices/progress";

const GenerateCvForm = (callback, deps) => {
  const dispatch = useDispatch();
  const [template, setTemplate] = useState(1);
  const [formDisable, setFormDisable] = useState(false);
  const [progressWarning, setProgressWarning] = useState(false);

  const handleTemplate = (e) => {
    setTemplate(e.target.value);
  };

  const handleGenerate = () => {
    if (template === 1) {
      history.navigate("seekers/download-cv/first");
    } else {
      history.navigate("seekers/download-cv/second");
    }
  };

  const fetchData = useCallback(() => {
    dispatch(authActions.getUser()).then((r) => {
      if (r.payload?.data.progress < 80) {
        setFormDisable(true);
        setProgressWarning(true);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProgress(0));
    fetchData();
    dispatch(setProgress(100));

    // eslint-disable-next-line
  }, [fetchData]);

  return (
    <Box component="form" autoComplete="off">
      <Grid
        container
        direction="row"
        sx={{ px: { xs: 2, sm: 4 }, py: 3 }}
        spacing={4}
      >
        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography variant="h5" py={3} px={{ xs: 2, sm: 4 }} color="black">
            Impress employers with your CV
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <WarnBlockQuote
            companyWarning={false}
            abilityWarning={false}
            ability="generate a CV"
            progressWarning={progressWarning}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          justifyContent="start"
          alignItems="center"
          display="flex"
          flexDirection={"column"}
        >
          <Avatar
            sx={{
              bgcolor: "#ffffff",
              border: "1px solid #DADADA",
              color: "#000000",
            }}
          >
            1
          </Avatar>
          <Typography fontSize={16} py={3} color="#195DCC">
            Pick a Template
          </Typography>
          <Box width={200}>
            <Typography fontSize={16}>
              Choose a template and customize it to your own identity
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          justifyContent="start"
          alignItems="center"
          display="flex"
          flexDirection={"column"}
        >
          <Avatar
            sx={{
              bgcolor: "#ffffff",
              border: "1px solid #DADADA",
              color: "#000000",
            }}
          >
            2
          </Avatar>
          <Typography fontSize={16} py={3} color="#195DCC">
            Download your CV
          </Typography>
          <Box width={200}>
            <Typography fontSize={16}>
              Easily download your CV and edit afterwards
            </Typography>
          </Box>
        </Grid>
        <Divider sx={{ width: "100%", paddingY: "10px" }} />

        <Grid item container xs={12}>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={template}
            onChange={handleTemplate}
          >
            <Grid item container xs={12} spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Card>
                  <CardMedia
                    component="img"
                    width="300"
                    image={TemplateOne}
                    alt="Template One"
                  />
                </Card>
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Comprehensive Template"
                  sx={{ mx: "auto" }}
                  disabled={formDisable}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                justifyContent="center"
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
                <Card>
                  <CardMedia
                    component="img"
                    image={TemplateTwo}
                    alt="Template Two"
                  />
                </Card>
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Standard Template (One Page Format)"
                  sx={{ mx: "auto" }}
                  disabled={formDisable}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </Grid>

        <Grid
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Button
            onClick={handleGenerate}
            variant="contained"
            disabled={formDisable}
            sx={{
              backgroundColor: "#00A0DC",
              border: "1px solid #00A0DC",
              borderRadius: "5px",
              "&:hover": {
                background: "#23bbfa",
              },
            }}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GenerateCvForm;