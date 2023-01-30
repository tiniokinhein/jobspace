import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Appbar from "../Navigation/Navbar/Navbar";

export default function Layout() {
  return (
    <Box id="app" sx={{ display: "flex", flexDirection: "column" }}>
      <Appbar />
      <Box
        sx={{
          height: "auto",
          minHeight: "81vh",
          position: "relative",
          backgroundColor: "#F8F9FA",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
