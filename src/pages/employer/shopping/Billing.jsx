import React from "react";
import { Box, Container, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TrxHistory from "../../../components/Billing/TrxHistory";
import PkgUsage from "../../../components/Billing/PkgUsage";

const Billing = () => {
  const [tap, setTap] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTap(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: { lg: "0px 30px", xl: 0 }, mt: 7 }}>
        <TabContext value={tap}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Billing Tab">
              <Tab label="Billing" value="1" sx={{ fontSize: "18px" }} />
              <Tab label="Usage" value="2" sx={{ fontSize: "18px" }} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ px: 0 }}>
            <TrxHistory />
          </TabPanel>
          <TabPanel value="2" sx={{ px: 0 }}>
            <PkgUsage />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Billing;
