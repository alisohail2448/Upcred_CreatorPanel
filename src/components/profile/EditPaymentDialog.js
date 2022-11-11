import { Check, Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { addCreatorFundAccount, validateUPI } from "src/services/creatorRequests";

const paymentMethod = ["upi", "bank"];

const EditPaymentDialog = ({ open = true, onClose, onSubmitPress, data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmit] = useState(false);

  const [method, setMethod] = useState(paymentMethod[0]);
  const [loading, setLoading] = useState(false);

  const [upiAddress, setUpiAddress] = useState("");
  const [upiVerified, setUpiVerified] = useState("");
  const [verifyingUpi, setVerifyingUpi] = useState(false);
  const [upiInvalid, setUpiInvalid] = useState(false);
  const [upiVPA, setUpiVpa] = useState("");

  const [bankAccount, setBankAccount] = useState("");
  const [confirmBankAccount, setConfirmBankAccount] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [bankAddress, setBankAddress] = useState("");

  const [searchingIFSC, setSearchingIFSC] = useState(false);
  const [ifscFound, setIfscFound] = useState(false);
  const [invalidIfsc, setInvalidIfsc] = useState("");

  useEffect(() => {
    if (!open) {
      setMethod(paymentMethod[0]);
      setUpiAddress("");
      setUpiVerified("");
      setVerifyingUpi(false);
      setUpiInvalid(false);
      setUpiVpa(false);
      setBankAccount("");
      setConfirmBankAccount("");
      setBankAccountName("");
      setBankName("");
      setIFSC("");
      setBankAddress("");
      setSearchingIFSC(false);
      setIfscFound(false);
      setInvalidIfsc("");
    }
  }, [open]);

  useEffect(() => {
    if (data) {
      if (data.mode) {
        setMethod(data.mode);
      }
    }
  }, [data]);

  useEffect(() => {
    if (upiVPA && upiAddress && upiVPA === upiAddress) {
    } else {
      setUpiVerified(false);
      setUpiVpa("");
      setVerifyingUpi(false);
    }
  }, [upiAddress, upiVPA]);

  const handleIfscInput = (e) => {
    setInvalidIfsc(false);
    setSearchingIFSC(false);
    setIfscFound(false);
    setUpiInvalid(false);
    setBankName("");
    setBankAddress("");
    let value = e.target.value;
    setIFSC(value.toUpperCase());
  };

  const handleUpiVerification = async () => {
    setVerifyingUpi(true);
    try {
      let upiVerifyStatus = await validateUPI(upiAddress);

      if (upiVerifyStatus.success) {
        setUpiVerified(true);
        enqueueSnackbar("UPI verified and is valid!", { variant: "success" });
        setUpiVpa(upiVerifyStatus.vpa);
        setVerifyingUpi(false);
        setUpiInvalid(false);
      } else {
        setVerifyingUpi(false);
        setUpiVerified(false);
        setUpiInvalid(true);
        enqueueSnackbar("UPI is not valid ", { variant: "warning" });
      }
    } catch (error) {
      enqueueSnackbar("Opps something went wrong !", { variant: "error" });
      setVerifyingUpi(false);
    }
  };

  const handleIFSCSearch = async () => {
    setSearchingIFSC(true);
    try {
      let ifscDetails = await getIFSCDetails(IFSC);

      if (ifscDetails) {
        setSearchingIFSC(false);
        setIfscFound(true);
        setBankName(ifscDetails?.bank_name);
        setBankAddress(ifscDetails?.address);

        enqueueSnackbar("IFSC details found!", { variant: "success" });
      } else {
        setSearchingIFSC(false);
        setInvalidIfsc(true);
        setIfscFound(false);
        setBankName("");
        setBankAddress("");
        enqueueSnackbar("IFSC code is invalid", { variant: "warning" });
      }
    } catch (error) {
      setInvalidIfsc(true);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setSearchingIFSC(false);
    }
  };

  const handleAddAccount = async () => {
    setLoading(true);
    try {
      let data = null;
      if (method === "upi") {
        data = { account_type: "vpa", vpa: { address: upiAddress } };
      }
      if (method === "bank") {
        data = {
          bank_account: {
            account_number: bankAccount,
            name: bankAccountName,
            bank_name: bankName,
            ifsc: IFSC,
          },
        };
      }
      await addCreatorFundAccount(creatorId, data);
      setLoading(false);
      // mutate();
      onClose();
      enqueueSnackbar("Account added successfully", { variant: "success" });
    } catch (error) {
      setLoading(false);
      console.log("ADD FUND ERROR", error);
      enqueueSnackbar("Failed to add account", { variant: "warning" });
    }
  };

  const handleEntering = () => {};

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
          Add new payment
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />
      <DialogContent>
        <Grid container spacing={2}>
          <Box width="100%" marginY={3} paddingX={2}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: "#e1e1e1" }}>Choose a payout method</FormLabel>
              <RadioGroup
                aria-labelledby="select-payout"
                defaultValue="paytm"
                name="payout-radio-group"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label={
                    <Typography variant="body1" color="#e1e1e1">
                      UPI
                    </Typography>
                  }
                  sx={{ marginTop: 1 }}
                />
                {method === paymentMethod[0] && (
                  <TextField
                    variant="standard"
                    label="Enter your UPI id"
                    error={upiInvalid}
                    helperText={
                      upiVerified
                        ? "UPI address is valid and verified."
                        : upiInvalid
                        ? "UPI address is invalid"
                        : ""
                    }
                    FormHelperTextProps={{ sx: { color: upiInvalid ? "red" : "green" } }}
                    fullWidth
                    disabled={verifyingUpi || method !== "upi"}
                    value={upiAddress}
                    onChange={(e) => setUpiAddress(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!upiVerified && (
                            <Button
                              onClick={handleUpiVerification}
                              sx={{ my: 1 }}
                              disabled={
                                upiAddress.length < 5 || !upiAddress.includes("@") || verifyingUpi
                              }
                            >
                              {verifyingUpi ? <CircularProgress size={"18px"} /> : "Verify"}
                            </Button>
                          )}
                          {upiVerified && <Check color="success" />}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label={
                    <Typography variant="body1" color="#e1e1e1">
                      Bank Account
                    </Typography>
                  }
                  sx={{ marginTop: 1 }}
                />
                {method === paymentMethod[1] && (
                  <Stack spacing={2}>
                    <TextField
                      variant="standard"
                      label="Enter your Bank account no."
                      fullWidth
                      disabled={method !== "bank"}
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                    />
                    <TextField
                      variant="standard"
                      label="Confirm Bank account no."
                      error={
                        bankAccount && confirmBankAccount && bankAccount !== confirmBankAccount
                      }
                      helperText={
                        bankAccount &&
                        confirmBankAccount &&
                        bankAccount !== confirmBankAccount &&
                        "Account number does not match !"
                      }
                      fullWidth
                      disabled={method !== "bank"}
                      value={confirmBankAccount}
                      onChange={(e) => setConfirmBankAccount(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {bankAccount &&
                              confirmBankAccount &&
                              bankAccount === confirmBankAccount && <Check color="success" />}
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      variant="standard"
                      label="Account holder name"
                      fullWidth
                      disabled={method !== "bank"}
                      value={bankAccountName}
                      onChange={(e) => setBankAccountName(e.target.value)}
                    />

                    <TextField
                      variant="standard"
                      label="IFSC code"
                      error={invalidIfsc}
                      helperText={
                        invalidIfsc
                          ? "IFSC code is invalid!"
                          : ifscFound
                          ? "IFSC code is valid and verified!"
                          : ""
                      }
                      FormHelperTextProps={{ sx: { color: invalidIfsc ? "red" : "green" } }}
                      fullWidth
                      disabled={searchingIFSC || method !== "bank"}
                      value={IFSC}
                      onChange={handleIfscInput}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {!ifscFound && (
                              <Button
                                disabled={IFSC.length < 3}
                                onClick={handleIFSCSearch}
                                sx={{ my: 1 }}
                              >
                                {searchingIFSC ? (
                                  <CircularProgress size={"18px"} />
                                ) : invalidIfsc ? (
                                  "Search"
                                ) : (
                                  "Search"
                                )}
                              </Button>
                            )}
                            {ifscFound && <Check color="success" />}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      // select
                      variant="standard"
                      label="Select your bank"
                      fullWidth
                      disabled={method !== "bank"}
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    >
                      <MenuItem key="hdfc" value="hdfc">
                        HDFC
                      </MenuItem>
                      <MenuItem key="sbi" value="sbi">
                        SBI
                      </MenuItem>
                      <MenuItem key="axis" value="axis">
                        AXIS
                      </MenuItem>
                    </TextField>
                    <TextField
                      multiline
                      variant="standard"
                      label="Bank Address"
                      fullWidth
                      disabled={method !== "bank"}
                      value={bankAddress}
                      onChange={(e) => setBankAddress(e.target.value)}
                    />
                  </Stack>
                )}
              </RadioGroup>
            </FormControl>
          </Box>
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

export default EditPaymentDialog;
