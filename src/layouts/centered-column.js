import { Box } from "@mui/material";
import React from "react";

const CenteredColumn = ({ children, sx }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredColumn;
