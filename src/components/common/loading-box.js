import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingBox = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 2,
        background: "#ffffff80",
      }}
    >
      <CircularProgress />
      {children}
    </Box>
  );
};

export default LoadingBox;
