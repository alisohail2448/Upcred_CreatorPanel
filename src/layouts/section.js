import { Divider, Box } from "@mui/material";
import React from "react";

const Section = ({ children }) => {
  return (
    <>
      <Box sx={{ py: 3, width: "100%", px: 3 }}>{children}</Box>
      <Divider sx={{ width: "100%" }} />
    </>
  );
};

export default Section;
