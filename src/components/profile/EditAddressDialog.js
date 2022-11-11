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
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { MESSAGES } from "src/constants/messages";
import { deleteCreatorAddress, updateCreatorAddress } from "src/services/creatorRequests";

const EditAddressDialog = ({ open = true, onClose, data }) => {
  const [addressId, setAddressId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = React.useState({
    isBarterAddress: false,
    fullName: "",
    line1: "",
    line2: "",
    landmark: "",
    city: "",
    countryState: "",
    country: "",
    zipcode: "",
  });

  const handleEntering = () => {};

  useEffect(() => {
    if (!open) {
      clearSelectedCreatorAddresses();
    }
    console.log(data);
  }, [open]);

  const clearSelectedCreatorAddresses = () => {
    setState((prevState) => ({
      ...prevState,
      isBarterAddress: false,
      fullName: "",
      line1: "",
      line2: "",
      landmark: "",
      city: "",
      countryState: "",
      country: "",
      zipcode: "",
    }));
  };

  useEffect(() => {
    if (data) {
      setState((prevState) => ({
        ...prevState,
        isBarterAddress: data.is_barter_address,
        fullName: data.full_name,
        line1: data.line_1,
        line2: data.line_2,
        landmark: data.landmark,
        city: data.city,
        countryState: data.state,
        country: data.country,
        zipcode: data.zipcode,
      }));
      setAddressId(data.id);
    }
  }, [data]);

  const onSubmitPress = async () => {
    const updatedData = {
      city: city,
      full_name: fullName,
      is_barter_address: isBarterAddress,
      line_1: line1,
      line_2: line2,
      state: countryState,
      zipcode: zipcode,
      country: country,
      landmark: landmark,
    };
    const res = await updateCreatorAddress(addressId, updatedData);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_ADDRESS_UPDATED_SUCCESS, { variant: "success" });
      onClose();
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_ADDRESS_UPDATE_FAILURE, { variant: "error" });
    }
  };
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    isBarterAddress,
    fullName,
    line1,
    line2,
    landmark,
    city,
    countryState,
    country,
    zipcode,
  } = state;

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
          Edit address
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
              name="fullName"
              label="Full Name"
              value={fullName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
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
              name="landmark"
              label="Landmark"
              value={landmark}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
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
              name="line1"
              label="Line 1"
              value={line1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
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
              name="line2"
              label="Line 2"
              value={line2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
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
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
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
              name="countryState"
              label="State"
              value={countryState}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
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
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              varaint="outlined"
              size="small"
              type="number"
              required
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{ sx: { borderRadius: 0.5, height: "35px", color: "white" } }}
              color="info"
              name="zipcode"
              label="Zipcode"
              value={zipcode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                sx={{ color: "white" }}
                control={
                  <Checkbox
                    name="isBarterAddress"
                    checked={isBarterAddress}
                    onChange={(e) => {
                      setState((prevState) => ({
                        ...prevState,
                        isBarterAddress: e.target.checked,
                      }));
                    }}
                    color="info"
                  />
                }
                label="Barter"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button onClick={onSubmitPress} variant="contained" color="info" sx={{}}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAddressDialog;
