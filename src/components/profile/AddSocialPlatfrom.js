import { Close } from "@mui/icons-material";
import {
  Drawer,
  Box,
  Tooltip,
  Button,
  Divider,
  Grid,
  Typography,
  DialogContent,
  FormControl,
  Stack,
  TextField,
  MenuItem,
  DialogActions,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";

import PropTypes from "prop-types";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAllPlatforms } from "src/adapters/commonAdapters";
import { deleteCreatorPlatform } from "src/services/authRequests";
import { addCreatorPlatform } from "src/services/creatorRequests";
import { filteredInactive } from "src/utils/filteredInactive";
import { SocialIdBox } from "../common/social-id-box";
import { EditSocialPlatform } from "./EditSocialPlatform";

const drawerWidth = 500;

export const AddSocialPlatfrom = ({
  onRequestClose,
  open,
  setIsDrawerOpen,
  children,
  drawerControl,
  creatorAllPlatform,
  userData,
  mutate,
}) => {
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialURL, setSocialURL] = useState("");
  const [engagementRate, setEngagementRate] = useState("");
  const [followers, setFollowers] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { platforms = [] } = useAllPlatforms({ is_active: true });

  const { enqueueSnackbar } = useSnackbar();

  let platformList = platforms.filter(filteredInactive)?.filter((item) => {
    if (creatorAllPlatform?.filter(filteredInactive).find((n) => n.platform.id == item.id)) {
      return false;
    } else {
      return true;
    }
  });
  const handleClose = () => {
    setIsDrawerOpen(false);
  };
  const handleAddPlatform = async () => {
    const data = {
      platform_id: socialPlatform.id,
      social_handle: socialURL,
      followers: Number(followers),
      engagement_rate: Number(engagementRate),
    };
    setSubmitting(true);
    try {
      await addCreatorPlatform(userData.id, data);
      setSubmitting(false);
      mutate();
      handleClose();
      enqueueSnackbar("Platform added successfully", { variant: "success" });
    } catch (error) {
      setSubmitting(false);
      enqueueSnackbar("Failed to add platform", { variant: "error" });
    }
  };

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
          backgroundColor: "#191C24",
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
      onClose={() => setIsDrawerOpen(false)}
    >
      <Box role="presentation" flexGrow={1} sx={{ position: "relative" }}>
        {!drawerControl?.hideClose && (
          <Box
            width="100%"
            display="flex"
            justifyContent="flex-start"
            sx={{ background: "#191C24", position: "sticky", top: 0 }}
          >
            <Tooltip title="Close">
              <Button
                size="small"
                sx={{ width: 40, height: 40, borderRadius: 20, margin: 1 }}
                onClick={onRequestClose}
              >
                <Close
                  fontSize="medium"
                  style={{ color: "white" }}
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                />
              </Button>
            </Tooltip>
          </Box>
        )}
        <Box
          width="100%"
          height="84%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ p: 2, backgroundColor: "#191C24" }}
        >
          <Grid container padding="none">
            <Typography sx={{ color: "white", mb: 1 }}>All Available social platforms</Typography>
            {creatorAllPlatform?.filter(filteredInactive).length < 1 && (
              <Typography
                color="textSecondary"
                sx={{ fontSize: "10px", fontWeight: "500", opacity: 0.8, color: "white" }}
              >
                No Added Platform found.
              </Typography>
            )}
            <Grid container direction="row" flexWrap="wrap" minWidth="150px" sx={{ my: 0, py: 0 }}>
              {/* {creatorAllPlatform?.map((item, index) => (
                <Grid item>
                  <EditSocialPlatform
                    handleClose={handleClose}
                    key={index}
                    data={item}
                    userData={userData}
                    mutate={mutate}
                  />
                </Grid>
              ))} */}

              {[...creatorAllPlatform]?.filter(filteredInactive).map((item, index) => (
                <Grid item>
                  <EditSocialPlatform
                    submitting={submitting}
                    setSubmitting={setSubmitting}
                    handleClose={handleClose}
                    key={index}
                    data={item}
                    userData={userData}
                    mutate={mutate}
                  />
                </Grid>
              ))}

              {/* <Grid container>
                {submitting && (
                  <Paper square elevation={0} sx={{ p: 1, background: "transparent" }}>
                    <CircularProgress
                      sx={{
                        zIndex: 1,
                      }}
                    />
                  </Paper>
                )}
              </Grid> */}
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              sx={{
                borderRadius: 0.5,
                backgroundColor: "transparent",
                px: 0,
                py: 0,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <FormControl fullWidth>
                <Stack spacing={2} mt={3}>
                  <Typography sx={{ color: "white" }}>Add More Social Platforms</Typography>
                  <TextField
                    InputProps={{
                      sx: {
                        color: "white",
                      },
                    }}
                    select
                    fullWidth
                    variant="outlined"
                    label="Select social platform"
                    value={socialPlatform}
                    onChange={(e) => setSocialPlatform(e.target.value)}
                  >
                    {platformList?.filter(filteredInactive).length < 1 && (
                      <MenuItem key={""} value={null}>
                        No Selectable Platform
                      </MenuItem>
                    )}
                    {platformList?.filter(filteredInactive)?.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {socialPlatform && (
                    <TextField
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      variant="outlined"
                      label={`${socialPlatform.name} username`}
                      value={socialURL}
                      onChange={(e) => setSocialURL(e.target.value)}
                    />
                  )}
                  {socialPlatform && (
                    <TextField
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      type="number"
                      variant="outlined"
                      label={`${socialPlatform.name} followers count`}
                      value={followers}
                      onChange={(e) => setFollowers(e.target.value)}
                    />
                  )}
                  {socialPlatform && (
                    <TextField
                      InputProps={{
                        sx: {
                          color: "white",
                        },
                      }}
                      type="number"
                      variant="outlined"
                      label={`${socialPlatform.name} engagement rate`}
                      value={engagementRate}
                      onChange={(e) => setEngagementRate(e.target.value)}
                    />
                  )}
                </Stack>
              </FormControl>
            </Grid>
          </Grid>
          {submitting && (
            <Paper square elevation={0} sx={{ p: 1, background: "transparent" }}>
              <CircularProgress />
            </Paper>
          )}
        </Box>
        <Divider />
        <Box sx={{ backgroundColor: "#191C24" }}>
          <DialogActions>
            <Button
              variant="text"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
              sx={{
                color: "white",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddPlatform}
              variant="contained"
              color="info"
              sx={{
                backgroundColor: "rgb(6 14 19)",
                "&:hover": { backgroundColor: "rgb(6 14 19)" },
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Drawer>
  );
};
