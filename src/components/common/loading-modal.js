import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingModal = ({ loadingText }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: 999,
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loadingText && (
        <Typography variant="h6" color="violet" sx={{ my: 2 }}>
          {loadingText}
        </Typography>
      )}
      <CircularProgress size={100} />
    </Box>
  );
};

export default LoadingModal;
