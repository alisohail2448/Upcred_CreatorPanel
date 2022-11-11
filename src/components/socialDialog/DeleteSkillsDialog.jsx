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

const DeleteSkillsDialog = ({ open = true, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [handle, setHandle] = useState("");
  const [followerCounts, setFollowerCounts] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [next, setNext] = useState(false);
  const [username, setUsername] = useState("@rajeshlousigam");


  const [isHovering, setIsHovering] = useState(false);
  const [isNoHovering, setIsNoHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleNoMouseEnter = () => {
    setIsNoHovering(true);
  };

  const handleNoMouseLeave = () => {
    setIsNoHovering(false);
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
        <DialogTitle color="white" sx={{ fontSize: 14 }}>
        Delete Skill ?
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent style={{padding:'0px 20px'}}>
        <Box style={{padding:'0'}} >
          <Typography style={{color:'#b7b5b5', fontSize:'13px', fontWeight:'400'}}>
           Are you sure you want to delete ? This action is irreversible.
          </Typography>
        <Box >
          <Paper square elevation={0} sx={{ background: "transparent" }}>
            <Box display="flex" flexDirection="row" justifyContent='flex-end'>
              <Button
                style={{outline:isNoHovering ? '1px solid rgb(14 174 87 / 22%)' : '0px solid rgb(14 174 87 / 22%)', width:'120px', backgroundColor:'black' }}
                // fullWidth
                onMouseEnter={handleNoMouseEnter}
                onMouseLeave={handleNoMouseLeave}
                size="small"
                color="success"
                variant="contained"x
                onClick={onClose}
                sx={{ mt:3, mr: 1, mb:2 }}
              >
                No, Cancel
              </Button>
              <Button
                style={{backgroundImage: isHovering ? "radial-gradient(circle at 10% 20%, rgb(14 174 87 / 22%) 0%, rgb(11 36 36 / 55%) 90%)":"radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% )" , transition:'all'  ,width:'120px' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                // fullWidth
                size="small"
                color="success"
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt:3, mr: 1, mb:2 }}
              >
                Yes, Delete
              </Button>
            </Box>
          </Paper>
        </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSkillsDialog;
