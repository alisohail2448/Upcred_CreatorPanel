import { Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { MESSAGES } from "src/constants/messages";
import { deleteCreatorAddress } from "src/services/creatorRequests";


const DeleteAddressDialog = ({ open = true,id, onClose }) => {

  const { enqueueSnackbar } = useSnackbar();



  const handleAddressDelete = async() => {
    const res = await deleteCreatorAddress(id);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_ADDRESS_DELETED_SUCCESS, { variant: "success" });
      onClose();
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_ADDRESS_DELETE_FAILURE, { variant: "error" });
    }
  };
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          backgroundColor: "#383838",
        },
      }}
      maxWidth="xs"
      // TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row">
        <DialogTitle color="white" sx={{ fontSize: 14 }}>
          Delete Address ?
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent style={{ padding: "0px 20px" }}>
        <Box style={{ padding: "0" }}>
          <Typography style={{ color: "#b7b5b5", fontSize: "13px", fontWeight: "400" }}>
            Are you sure you want to delete ? This action is irreversible.
          </Typography>
          <Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button
                size="small"
                color="success"
                onClick={onClose}
                sx={{ mt: 3, mr: 1, mb: 2, color: "white" }}
              >
                No, Cancel
              </Button>
              <Button
                style={{
                  width: "120px",
                }}
                size="small"
                color="success"
                variant="contained"
                onClick={handleAddressDelete}
                sx={{
                  mt: 3,
                  mr: 1,
                  mb: 2,
                  backgroundColor: "rgb(6 14 19)",
                  "&:hover": { backgroundColor: "rgb(6 14 19)" },
                }}
              >
                Yes, Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAddressDialog;
