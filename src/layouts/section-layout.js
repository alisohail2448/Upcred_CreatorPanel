import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SectionLayout = ({ sectionTitle, children }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ fontSize: "14px", color: "#121212" }}>{sectionTitle}</Typography>
      <Stack spacing={1} sx={{ marginY: 2 }}>
        {children}
      </Stack>
    </Box>
  );
};

export default SectionLayout;
