import { Close } from "@mui/icons-material";
import { Drawer, Box, Tooltip, Button, Divider } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

const drawerWidth = 500;

export const RightDrawer = ({ onRequestClose, open, children, drawerControl }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          backgroundColor: "#ffffff",
          opacity: 1,
          zIndex: 0,
          paddingTop: "0px",
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(5px)",
        },
      }}
      anchor="right"
      variant="temporary"
      open={open}
      onClose={drawerControl?.disableBackdropClose ? null : onRequestClose}
    >
      <Box role="presentation" flexGrow={1} sx={{ position: "relative" }}>
        {!drawerControl?.hideClose && (
          <Box
            width="100%"
            display="flex"
            justifyContent="flex-start"
            sx={{ background: "#e1e1e1", position: "sticky", top: 0 }}
          >
            <Tooltip title="Close">
              <Button
                size="small"
                sx={{ width: 40, height: 40, borderRadius: 20, margin: 1 }}
                onClick={onRequestClose}
              >
                <Close fontSize="medium" />
              </Button>
            </Tooltip>
          </Box>
        )}

        <Box
          width="100%"
          height="90%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ p: 1 }}
        >
          {open && children}
        </Box>
      </Box>
    </Drawer>
  );
};
