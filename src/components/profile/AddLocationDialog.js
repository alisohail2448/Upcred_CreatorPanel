import { Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  useAllCountry,
  useAllLocation,
  useAllState,
  useGetStatesByCountryId,
} from "src/adapters/commonAdapters";

const AddLocationDialog = ({ open = true, onClose, onSubmitPress }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmit] = useState(false);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [barter, setBarter] = useState(false);

  const { countries } = useAllCountry();
  const { states } = useAllState({ country_id: country });
  const { locations } = useAllLocation({ state_id: state });

  const handleEntering = () => {};

  useEffect(() => {
    if (!open) {
      setCity("");
      setState("");
      setCountry("");
      setZipcode("");
    }
  }, [open]);

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          backgroundColor: "#030303",
        },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row">
        <DialogTitle color="white" sx={{ fontSize: 14 }}>
          Add location
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              varaint="outlined"
              size="small"
              required
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{ sx: { borderRadius: 0.5, height: "35px", color: "white" } }}
              color="info"
              name="country"
              label="Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              {countries?.map((item, index) => (
                <MenuItem key={index} title={item.name} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              varaint="outlined"
              size="small"
              required
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{ sx: { borderRadius: 0.5, height: "35px", color: "white" } }}
              color="info"
              name="state"
              label="State"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
            >
              {states?.map((item, index) => (
                <MenuItem key={index} title={item.name} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              varaint="outlined"
              size="small"
              required
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{ sx: { borderRadius: 0.5, height: "35px", color: "white" } }}
              color="info"
              name="city"
              label="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              {locations?.map((item, index) => (
                <MenuItem key={index} title={item.name} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        {submitting && (
          <Paper square elevation={0} sx={{ p: 1, background: "transparent" }}>
            <CircularProgress />
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button onClick={onSubmitPress} variant="contained" color="info" sx={{}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLocationDialog;
