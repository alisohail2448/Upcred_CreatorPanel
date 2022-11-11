import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { Check, CheckBox, Close } from "@mui/icons-material";
import {
  DialogActions,
  DialogContent,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Button,
  Tooltip,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  addCreatorAddress,
  addCreatorFundAccount,
  getIFSCDetails,
  validateUPI,
} from "src/services/creatorRequests";
import { mutate } from "swr";
const drawerWidth = 500;

export const AddCreatorAddress = ({
  drawerControl,
  open,
  onClose,
  userData,
  handleClose,
  onRequestClose,
  setIsDrawerOpen,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmit] = useState(false);
  const [name, setName] = useState("");
  const [line_1, setLine_1] = useState("");
  const [line_2, setLine_2] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [barter, setBarter] = useState(false);

  const handleAddAddress = async () => {
    const data = {
      name: name,
      line_1: line_1,
      line_2: line_2,
      landmark: landmark,
      city: city,
      state: state,
      country: country,
      zipcode: zipcode,
      barter: barter,
    };
    setSubmitting(true);
    console.log(data);
    try {
      await addCreatorAddress(userData.id, data);
      setSubmitting(false);
      handleClose();
      enqueueSnackbar("Address added successfully", { variant: "success" });
    } catch (error) {
      setSubmitting(false);
      enqueueSnackbar("Failed to add address", { variant: "error" });
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
      <Box
        role="presentation"
        flexGrow={1}
        sx={{ position: "relative", backgroundColor: "#191C24" }}
      >
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
            <Typography variant="h6" color="white" sx={{ margin: 2 }}>
              Add Address
            </Typography>
          </Box>
        )}
        <Box width="100%" paddingX={1} sx={{ backgroundColor: "#191C24", pb: 2 }}>
          <Divider sx={{ opacity: 0.5 }} />
          <Grid container mt={4}>
            <Grid item sm={12} p={1}>
              <TextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="Full Name"
                margin="dense"
                name="full_name"
                type="text"
              />
            </Grid>
            <Grid item sm={12} p={1}>
              <TextField
                value={line_1}
                onChange={(e) => {
                  setLine_1(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="Line 1"
                margin="dense"
                name="line_1"
                type="text"
              />
            </Grid>
            <Grid item sm={12} p={1}>
              <TextField
                value={line_2}
                onChange={(e) => {
                  setLine_2(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="Line 2"
                margin="dense"
                name="line_2"
                type="text"
              />
            </Grid>
            <Grid item sm={12} p={1}>
              <TextField
                value={landmark}
                onChange={(e) => {
                  setLandmark(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="Landmark"
                margin="dense"
                name="landmark"
                type="text"
              />
            </Grid>
            <Grid item sm={12} p={1}>
              <TextField
                value={zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="Zipcode"
                margin="dense"
                name="zipcode"
                type="text"
              />
            </Grid>
            <Grid item sm={12} p={1}>
              <TextField
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="City"
                margin="dense"
                name="city"
                type="text"
              />
            </Grid>
            <Grid item sm={12} p={1}>
              <TextField
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="State"
                margin="dense"
                name="state"
                type="text"
              />
            </Grid>
            <Grid item sm={12} p={1}>
              <TextField
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                InputProps={{
                  sx: {
                    color: "white",
                  },
                }}
                variant="outlined"
                size="small"
                fullWidth
                label="Country"
                margin="dense"
                name="country"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <FormControlLabel
                  sx={{ color: "white" }}
                  control={<Checkbox defaultChecked={false} color="info" />}
                  label="Barter"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <DialogContent>
            {submitting && (
              <Paper square elevation={0} sx={{ p: 1, background: "transparent" }}>
                <CircularProgress />
              </Paper>
            )}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Box sx={{ backgroundColor: "#191C24" }}>
              <DialogActions>
                <Button
                  sx={{ color: "white" }}
                  variant="text"
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAddress}
                  variant="contained"
                  color="info"
                  sx={{
                    backgroundColor: "rgb(6 14 19)",
                    "&:hover": { backgroundColor: "rgb(6 14 19)" },
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </DialogActions>
        </Box>
      </Box>
    </Drawer>
  );
};
