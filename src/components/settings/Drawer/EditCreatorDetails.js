import { Check, Close } from "@mui/icons-material";
import {
  Drawer,
  Box,
  Tooltip,
  Button,
  Divider,
  Grid,
  Typography,
  Stack,
  Badge,
  Avatar,
  TextField,
  DialogActions,
  CircularProgress,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import { useSnackbar } from "notistack";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import React, { useRef, useState, useEffect } from "react";
import validate from "validate.js";
import { useCreator } from "src/adapters/creatorsAdapters";
import { useFilePicker } from "use-file-picker";
import LoadingBox from "../../common/loading-box";
import { checkCreatorHandle, updateCreator } from "src/services/creatorRequests";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import { uploadToAws } from "src/services/commonRequests";

const drawerWidth = 500;

export const EditCreatorBasicDetails = ({
  onRequestClose,
  open,
  setIsDrawerOpen,
  drawerControl,
  userData,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [profilePicture, setProfilePicture] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [alternateMobileCountryCode, setAlternateMobileCountryCode] = useState("");
  const [handleCheckTimer, setHandleCheckTimer] = useState(null);
  const [checkingHandle, setCheckingHandle] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const [errors, setErrors] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const genderList = ["MALE", "FEMALE", "OTHER"];

  const [handleCheckStatus, setHandleCheckStatus] = useState({
    checked: false,
    available: null,
    msg: "",
  });

  const { creator, loading } = useCreator({ id: userData.id });

  const [openFileSelector, { filesContent, loading: imageSelectLoading }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
  });

  const validatorC = {
    // Email: {
    //   email: {
    //     presence: { allowEmpty: false, message: "cannot be blank" },
    //   },
    // },
    // mobile: {
    //   presence: { allowEmpty: false, message: "cannot be blank" },
    // },
    // // alternate_email: {
    // //   presence: { allowEmpty: false, message: "cannot be blank" },
    // // },
    // mobile: {
    //   presence: { allowEmpty: false, message: "cannot be blank" },
    // },
  };
  useEffect(() => {
    if (errors && Object.keys(errors).length === 0) {
      setSubmitFailed(false);
    }
  }, [errors]);

  const [formData, setFormData] = useState({
    handle: "",
    name: "",
    email: "",
    mobile: "",
    countryCode: "",
    gender: "",
    dob: "",
    alternate_email: "",
    alternate_mobile: "",
    currency: "INR",
    about: "",
    profilePicture: "",
  });

  const checkHandleAvailabilty = async (value) => {
    let checkData = await checkCreatorHandle(value);
    if (checkData) {
      if (checkData?.available) {
        setHandleCheckStatus({
          checked: true,
          available: true,
          msg: "Username is available !",
        });
      } else {
        setHandleCheckStatus({
          checked: true,
          available: false,
          msg: "Username is taken! Choose another",
        });
      }
    } else {
      setHandleCheckStatus({
        checked: false,
        available: null,
        msg: "Netwrok error. Please try again",
      });
    }
    setCheckingHandle(false);
  };

  const handleUserhandleChange = (event) => {
    let { value } = event.target;
    setFormData((d) => ({ ...d, handle: value.toLowerCase() }));
    setHandleCheckStatus({
      checked: false,
      available: null,
      msg: "",
    });
    setCheckingHandle(false);
    if (value) {
      if (handleCheckTimer) {
        clearTimeout(handleCheckTimer);
        setHandleCheckTimer(null);
      }
      setHandleCheckTimer(
        setTimeout(() => {
          setCheckingHandle(true);
          checkHandleAvailabilty(value);
        }, 500)
      );
    }
  };

  useEffect(() => {
    if (filesContent.length > 0) {
      setProfilePicture(filesContent?.[0]?.content);
    }
  }, [filesContent]);

  const uploadProfileToAws = async () => {
    if (!profilePicture) {
      return;
    }
    setUploadingImage(true);
    try {
      let file = { uri: profilePicture, name: "ProfilePic", type: "image/png" };
      const uploadRes = await uploadToAws(file, `creator/${userData.id}/profle_pic`);
      console.log("filleee", uploadRes);
      setUploadingImage(false);
      enqueueSnackbar("Image Upload Complete", { variant: "success" });
      console.log("PROFILE UPDATE");
      return uploadRes.file_url;
    } catch (error) {
      setUploadingImage(false);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await updateCreator(userData.id, data);
      handleClose();
      setSubmitting(false);
      enqueueSnackbar(`creator details uploaded successfully`, {
        variant: "success",
      });
    } catch (error) {
      setSubmitting(false);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
  };

  const handleSubmit = async () => {
    let error = validate({ ...formData }, validatorC);
    setErrors({ ...error });
    console.log(error, handleCheckStatus);
    if (
      error &&
      Object.keys(error).length === 0 &&
      handleCheckStatus?.checked &&
      !handleCheckStatus?.available
    ) {
      return;
    }
    if (!error || Object.keys(error).length === 0) {
      try {
        setSubmitFailed(false);
        let data = {
          name: formData.name,
          mobile: formData.mobile.slice(countryCode.length),
          email: formData.email,
          handle: formData.handle,
          country_code: countryCode,
          gender: formData?.gender,
          dob: moment(formData?.dateOfBirth).format("YYYY-MM-DD"),
          alternate_email: formData.alternate_email,
          alternate_mobile: formData.alternate_mobile
            ? formData.alternate_mobile.slice(alternateMobileCountryCode.length)
            : " ",
          alternate_mobile_country_code: alternateMobileCountryCode,
          about: formData.about,
        };
        if (creator.handle === formData.handle) {
          delete data.handle;
        }
        if (profilePicture && profilePicture !== creator?.profile_pic) {
          let profileUrl = await uploadProfileToAws();
          if (profilePicture) {
            data.profile_pic = profileUrl;
          }
        }
        onSubmit(data);
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        setSubmitFailed(true);
      }
    }
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (creator) {
      setFormData({
        handle: creator.handle,
        name: creator.name,
        mobile: creator.mobile,
        email: creator.email,
        countryCode: creator.country_code,
        gender: creator.gender,
        dob: creator.dob,
        alternate_email: creator.alternate_email,
        alternate_mobile: creator.alternate_mobile,
        alternate_mobile_country_code: creator.alternate_mobile_country_code,
        about: creator.about,
      });
      setProfilePicture(creator.profile_pic);
    }
  }, [creator]);

  const handleClose = () => {
    setIsDrawerOpen(false);
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
        <Box width="100%" paddingX={2} sx={{ backgroundColor: "#191C24", pb: 2 }}>
          <Box width="100%">
            <Typography variant="h6" color="white">
              Creators Profiles
            </Typography>
            <Typography variant="caption" color="white">
              Basic profiles for creator can be updated here.
            </Typography>
          </Box>
          <Box width="100%" sx={{ backgroundColor: "#191C24" }}>
            <Stack alignItems="center">
              <Badge>
                <Avatar
                  src={profilePicture}
                  variant="circular"
                  sx={{ width: "100px", height: "100px" }}
                />
              </Badge>
              <Button
                onClick={() => openFileSelector()}
                variant="text"
                size="small"
                sx={{ color: "white" }}
              >
                Change Avatar
              </Button>
            </Stack>
            <Stack spacing={3}>
              <TextField
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
                size="small"
                error={Boolean(errors?.name)}
                helperText={errors?.name?.[0]}
                value={formData.name}
                onChange={handleInputChange}
                label="Name"
                name="name"
                type="text"
                variant="outlined"
                required
              />
              <Box sx={{ position: "relative" }}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    color="primary"
                    size="small"
                    label="handle"
                    placeholder="Choose you handle"
                    value={formData.handle}
                    onChange={handleUserhandleChange}
                    name="handle"
                    fullWidth
                    error={
                      Boolean(errors?.handle) ||
                      (handleCheckStatus?.checked && !handleCheckStatus?.available)
                    }
                    helperText={errors?.handle?.[0] || handleCheckStatus?.msg}
                    FormHelperTextProps={{
                      sx: {
                        color: handleCheckStatus.available ? "greenyellow" : "red",
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        style: {
                          border: "none",
                          color: "white",
                          background: "transparent",
                        },
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          {checkingHandle && <CircularProgress size="1.5rem" />}
                          {!checkingHandle &&
                            handleCheckStatus?.checked &&
                            handleCheckStatus?.available && <Check color="success" />}
                          {!checkingHandle &&
                            handleCheckStatus?.checked &&
                            !handleCheckStatus?.available && <Close color="error" />}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Box>
              <TextField
                size="small"
                label="email"
                error={Boolean(errors?.email)}
                helperText={errors?.email?.[0]}
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                required
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
              <Grid item xs={12} sm={12} pt={{ xs: 1, sm: 0 }}>
                <PhoneInput
                  inputProps={{
                    name: "mobile",
                    required: true,
                    autoFocus: false,
                    placeholder: "Mobile",
                  }}
                  placeholder="Mobile"
                  country={"in"}
                  value={formData.mobile}
                  onChange={(v, c, _) => {
                    setCountryCode(c?.dialCode);
                    handleInputChange({
                      target: {
                        name: "mobile",
                        value: v,
                      },
                    });
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    borderColor: errors?.mobile?.length > 0 ? "#d32f2f" : "white",
                    borderRadius: "4px",
                    background: "transparent",
                    color: "white",
                  }}
                  buttonStyle={{
                    borderColor: errors?.mobile?.length > 0 ? "#d32f2f" : "white",
                    borderRadius: "4px",
                    background: "transparent",
                    maxHeight: "40px",
                  }}
                  style={{ borderColor: "black" }}
                />
                {errors?.mobile?.length > 0 && (
                  <FormHelperText>{errors?.mobile?.[0]}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  size="small"
                  name="creatorGender"
                  ListboxProps={{
                    style: {
                      backgroundColor: "#121212dd",
                      color: "#fff",
                    },
                  }}
                  noOptionsText={<Typography color="white">No Gender option</Typography>}
                  componentsProps={{
                    paper: { style: { background: "#484848" } },
                  }}
                  fullWidth
                  options={genderList}
                  getOptionLabel={(option) => option}
                  value={formData?.gender}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, gender: newValue });
                  }}
                  color="secondary"
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      inputProps={{ ...params.inputProps }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          color: "white",
                        },
                      }}
                      label="Creator Gender"
                      placeholder="Creator Gender"
                      name="gender"
                      // onFocus={() => setShowCategoryList(false)}
                      error={Boolean(errors?.gender)}
                      helperText={errors?.gender?.[0]}
                    />
                  )}
                />
              </Grid>
              <Stack direction="row" width="100%" spacing={2}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={formData?.dob}
                    onChange={(newValue) => {
                      setFormData({ ...formData, dob: newValue });
                    }}
                    name="dob"
                    renderInput={(params) => (
                      <TextField
                        required
                        size="small"
                        {...params}
                        sx={{
                          color: "white",
                          svg: {
                            color: "white",
                          },
                        }}
                        id="outlined-basic"
                        label="Date of Birth (optional)"
                        placeholder="Date of Birth (optional)"
                        name="dob"
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Stack>
              <Grid item xs={12} sm={12}>
                <TextField
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  fullWidth
                  label="Alternate Email"
                  size="small"
                  name="alternate_email"
                  error={Boolean(errors?.alternate_email)}
                  helperText={errors?.alternate_email?.[0]}
                  value={formData.alternate_email}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12} pt={{ xs: 1, sm: 0 }}>
                <PhoneInput
                  inputProps={{
                    name: "alternate_mobile",
                    required: true,
                    autoFocus: false,
                    placeholder: "Mobile",
                  }}
                  placeholder="Alternate mobile"
                  country={"in"}
                  value={formData.alternate_mobile}
                  onChange={(v, c, _) => {
                    setAlternateMobileCountryCode(c?.dialCode);
                    handleInputChange({
                      target: {
                        name: "alternate_mobile",
                        value: v,
                      },
                    });
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    borderColor: errors?.alternate_mobile?.length > 0 ? "#d32f2f" : "white",
                    borderRadius: "4px",
                    background: "transparent",
                    color: "white",
                  }}
                  buttonStyle={{
                    borderColor: errors?.alternate_mobile?.length > 0 ? "#d32f2f" : "white",
                    borderRadius: "4px",
                    background: "transparent",
                    maxHeight: "40px",
                  }}
                  style={{ borderColor: "black" }}
                />
                {errors?.alternate_mobile?.length > 0 && (
                  <FormHelperText>{errors?.alternate_mobile?.[0]}</FormHelperText>
                )}
              </Grid>
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  fullWidth
                  label="Alternate Mobile"
                  size="small"
                  name="alternate_mobile"
                  error={Boolean(errors?.alternate_mobile)}
                  helperText={errors?.alternate_mobile?.[0]}
                  value={formData.alternate_mobile}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  minRows={3}
                  inputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  fullWidth
                  label="About"
                  size="small"
                  name="about"
                  error={Boolean(errors?.about)}
                  helperText={errors?.about?.[0]}
                  value={formData.about}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Stack>
          </Box>
        </Box>
        <Divider />
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
              onClick={handleSubmit}
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
