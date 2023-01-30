import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const RecentSearch = () => {
  let rsh = {};

  if (localStorage.getItem("rsh")) {
    try {
      rsh = JSON.parse(localStorage.getItem("rsh"));
    } catch (e) {
      //
    }
  }

  const [searchHistories, setSearchHistories] = useState(rsh);

  const removeHis = (name) => {
    if (name) {
      const his = searchHistories.filter((item) => item.name !== name);

      setSearchHistories(his);

      if (rsh.length > 0) {
        localStorage.setItem("rsh", JSON.stringify(his));
      }
    }
  };

  return (
    <>
      {searchHistories.length > 0 && (
        <Box
          sx={{
            borderRadius: "10px",
            background: "transparent",
            border: "0.5px dashed #00A0DC",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            mb: "20px",
          }}
        >
          <Box sx={{ width: "80%", py: "9px" }}>
            <Typography fontSize="14px" color="#00A0DC">
              Recent Search
            </Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent" }}
              aria-label="history"
            >
              {searchHistories.slice(0, 1).map((item, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                    primary={item.name}
                  />
                  <ListItemIcon
                    sx={{ justifyContent: "flex-end", cursor: "pointer" }}
                  >
                    <ClearIcon
                      fontSize="12px"
                      sx={{ "&:hover": { color: "red" } }}
                      onClick={() => removeHis(item.name)}
                    />
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </>
  );
};

export default RecentSearch;
