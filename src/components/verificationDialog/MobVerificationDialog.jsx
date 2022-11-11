import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
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
  LinearProgress,
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
import React, { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useAllPlatforms } from "src/adapters/commonAdapters";
import { formatFollowerCount } from "src/utils/formatFollowerCount";
import MockApi from "src/services/mockApi";
import { useSnackbar } from "notistack";

// const steps = [
//   {
//     label: "Platforms",
//   },
//   {
//     label: "Username",
//   },
//   {
//     label: "counts",
//   },
// ];

const MobVerificationDialog = ({ setVerifiedMo, setMobverifyBtn, handleMoClose,open = true, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [handle, setHandle] = useState("");
  const [followerCounts, setFollowerCounts] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [next, setNext] = useState(false);
  const [username, setUsername] = useState("@rajeshlousigam");


  const [isHovering, setIsHovering] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);


  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

//   const { platforms } = useAllPlatforms();
  const handleEntering = () => {};

  const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     setNext(true);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setSelectedPlatform("");
//     setHandle("");
//     setFollowerCounts("");
//   };

//   const handlePlatformSelect = (e) => {
//     setSelectedPlatform(e.target.value);
//   };

//   const handleSubmit = () => {};

  const { enqueueSnackbar } = useSnackbar();



  const handleSendOtp = () =>{
    MockApi(() => {
      if (!sendOtp) {
        enqueueSnackbar("Otp Sent Successfully", { variant: "success" });
        setSendOtp(true);
      }
      else {
        setSendOtp(false);
        enqueueSnackbar("Failed to Send Otp", { variant: "error" });
      }
    });
  }

  const handleVerifiedOtp = () =>{
    MockApi(() => {
      if (!otpVerified) {
        enqueueSnackbar("Otp Verified Successfully", { variant: "success" });
        setOtpVerified(true);
      }
      else {
        setOtpVerified(false);
        enqueueSnackbar("Failed to Verify", { variant: "error" });
      }
    });
    setMobverifyBtn(false)
    setVerifiedMo(true)
    handleMoClose()
    onClose()
  }

  useEffect(() => {
    if (!open) {
      setSendOtp(false);
      setActiveStep(0);
      setSelectedPlatform("");
      setHandle("");
      setFollowerCounts("");
    }
  }, [open]);

  return (

    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          backgroundColor: "#000000",
        },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >


      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row">
        <DialogTitle color="white" sx={{ fontSize: 14 }}>
        Mobile Number Verification
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider style={{ borderColor: "#219a85" }} />
      <DialogContent style={{padding:'0px 20px'}}>
       {
        sendOtp ? ( <Box style={{padding:'0'}} >


        <TextField style={{ color:'#219a85', marginTop:'20px'}}
          variant="outlined"
          fullWidth
          size="small"
          required
          InputLabelProps={{
            sx: {
              fontSize: 14,
            },
          }}
          InputProps={{ sx: { borderRadius: 0.5, height: "40px", color: "#219a85" } }}
          name="name"
          label="Enter 6 Digit Code"
          // value={Followers}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Box display="flex" flexDirection="row" justifyContent='flex-end'>
          <Button
            style={{backgroundImage: isHovering ? "background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% )" : "linear-gradient(30deg, rgb(15 127 209 / 54%), rgb(58, 213, 124))", transition:'all',width:'120px' }}
            // fullWidth
            size="small"
            color="success"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variant="contained"
            onClick={handleVerifiedOtp}
            sx={{ mt:3, mr: 1, mb:2 }}
          >
           Verify Otp
          </Button>
        </Box>
      </Box> ) : (
          <Box style={{padding:'0'}} >


          <TextField style={{ color:'#219a85', marginTop:'20px'}}
            variant="outlined"
            fullWidth
            size="small"
            required
            InputLabelProps={{
              sx: {
                fontSize: 14,
              },
            }}
            InputProps={{ sx: { borderRadius: 0.5, height: "40px", color: "#219a85" } }}
            name="name"
            label="Enter 10 Digit Mobile"
            // value={Followers}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Box display="flex" flexDirection="row" justifyContent='flex-end'>
            <Button
              style={{backgroundImage: isHovering ? "radial-gradient(circle at 10% 20%, rgb(14 174 87 / 22%) 0%, rgb(11 36 36 / 55%) 90%)":"radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% )" , transition:'all',width:'120px' }}
              // fullWidth
              size="small"
              color="success"
              variant="contained"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSendOtp}
              sx={{ mt:3, mr: 1, mb:2 }}
            >
             Send Otp
            </Button>
          </Box>
        </Box>
        )
       }
      </DialogContent>
    </Dialog>
  );
};

export default MobVerificationDialog;
