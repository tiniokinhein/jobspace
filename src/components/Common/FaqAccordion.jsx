import React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Divider,
    Stack,
    Typography,
} from "@mui/material";
import { Parser } from "html-to-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";

const FaqAccordion = ({ question, answer }) => {
  return (
    <Accordion
      sx={{
        "&:hover": {
          boxShadow: 1,
        },
        borderRadius: "10px !important",
      }}
      elevation={0}
      variant="outlined"
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        expandIcon={<ExpandMoreIcon />}
      >
        {question && (
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              py: 2,
            }}
          >
            <HelpTwoToneIcon color="primary" fontWeight={700} />

            <Typography
              align="left"
              sx={{ width: "100%", fontWeight: 500, ml: 2 }}
              variant="h6"
            >
              {question}
            </Typography>
          </Stack>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ color: 'rgba(0, 0, 0, 0.45)' }}>
          <Divider/>
          {answer && Parser().parse(answer)}
      </AccordionDetails>
    </Accordion>
  );
};

export default FaqAccordion;
