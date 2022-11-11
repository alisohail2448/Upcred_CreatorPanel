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
import React, { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useAllPlatforms } from "src/adapters/commonAdapters";
import { formatFollowerCount } from "src/utils/formatFollowerCount";

const steps = [
  {
    label: "Platforms",
  },
  {
    label: "Username",
  },
  {
    label: "counts",
  },
];

const AddPlatformDialog = ({ open = true, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [handle, setHandle] = useState("");
  const [followerCounts, setFollowerCounts] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [next, setNext] = useState(false);
  const [username, setUsername] = useState("@rajeshlousigam");

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const { platforms } = useAllPlatforms();
  const handleEntering = () => {};

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setNext(true);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedPlatform("");
    setHandle("");
    setFollowerCounts("");
  };

  const handlePlatformSelect = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    if (!open) {
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
        <DialogTitle color="white" sx={{ fontSize: { xs: "13px", sm: "16px", md: "16px" } }}>
          Add Social Media Profile
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider style={{ borderColor: "#219a85" }} />
      {/* sx={{ opacity: 0.5}} */}
      <DialogContent>
        <Box
          style={{
            marginBottom: "10px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="#e1e1e1" sx={{ fontSize: { xs: "12px", sm: "15px", md: "15px" } }}>
            Choose a platform :
          </Typography>
          {activeStep !== 0 && selectedPlatform && (
            <Box
              style={{
                backgroundColor: "#1e1a1a",
                marginLeft: "10px",
                padding: "1px 10px",
                borderRadius: "5px",
              }}
            >
              {" "}
              <Typography
                color="#219a85"
                style={{ fontWeight: "500" }}
                sx={{ fontSize: { xs: "12px", sm: "15px", md: "15px" } }}
              >
                {platforms?.find((i) => i.id === selectedPlatform).name}
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size="small" onClick={handleNext}>
            <Select
              size="small"
              variant="standard"
              sx={{ fontSize: 14, color: "#219a85" }}
              value={selectedPlatform}
              label="Social Platform"
              onChange={handlePlatformSelect}
            >
              {platforms?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Box style={{ marginBottom: "10px" }}>
            <Typography color="#e1e1e1" sx={{ fontSize: { xs: "12px", sm: "15px", md: "15px" } }}>
              Handle
            </Typography>
          </Box>

          <TextField
            style={{ marginTop: "10px", color: "#219a85", width: "100%" }}
            variant="outlined"
            size="small"
            required
            InputLabelProps={{
              sx: {
                fontSize: 14,
              },
            }}
            InputProps={{
              sx: { borderRadius: 0.5, height: "40px", width: "100%", color: "#219a85" },
            }}
            name="name"
            label="Handle"
            // value={username}
            // onChange={(e) => {
            //   setName(e.target.value);
            // }}
          />
        </Box>
        <Box style={{ width: "100%", display: "flex", height: "100px", marginTop: "15px" }}>
          <Box style={{ width: "50%" }}>
            <Typography color="#e1e1e1" sx={{ fontSize: { xs: "12px", sm: "15px", md: "15px" } }}>
              Followers
            </Typography>
            <TextField
              style={{ marginTop: "15px", color: "#219a85" }}
              variant="outlined"
              size="small"
              required
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{
                sx: { borderRadius: 0.5, height: "40px", width: "90%", color: "#219a85" },
              }}
              name="name"
              label="Followers"
              // value={Followers}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Box>
          <Box style={{ width: "50%" }}>
            <Typography color="#e1e1e1" sx={{ fontSize: { xs: "12px", sm: "15px", md: "15px" } }}>
              Engagement
            </Typography>
            <TextField
              style={{ marginTop: "15px" }}
              variant="outlined"
              size="small"
              required
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{
                sx: { borderRadius: 0.5, height: "40px", width: "100%", color: "#219a85" },
              }}
              name="name"
              label="Engagement"
              // value={Engage}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box>
          <Paper square elevation={0} sx={{ background: "transparent" }}>
            <Box display="flex" flexDirection="row">
              <Button
                style={{
                  backgroundImage: isHovering
                    ? "radial-gradient(circle at 10% 20%, rgb(14 174 87 / 22%) 0%, rgb(11 36 36 / 55%) 90%)"
                    : "radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% )",
                  transition: "all",
                }}
                fullWidth
                size="small"
                color="success"
                variant="contained"
                onClick={handleSubmit}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{ mt: 1, mr: 1 }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlatformDialog;
