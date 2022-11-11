import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Button,
  CircularProgress,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { COLORS } from "src/configs/colors";
import { addBrand } from "src/services/brandRequests";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { MESSAGES } from "src/constants/messages";
import { CREATOR_BRAND_WORK_CONTENT_TYPE } from "src/constants/creatorBrandWorkContentType";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { addCreatorBrandWork, editCreatorBrandWork } from "src/services/creatorRequests";
import { getCookie } from "cookies-next";
import { uploadToAws } from "src/services/commonRequests";

const filter = createFilterOptions();

export default function AddPortfolioDialog({ open, onClose, brands, brandWorkToEdit }) {
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = React.useState({
    isNewBrand: false,
    selectedBrand: null,
    selectedBrandLogo: "",
    selectedBrandWebsiteLink: "",
    selectedBrandDescription: "",
    selectedBrandWorkTitle: "",
    selectedBrandWorkContentType: "",
    selectedBrandWorkWebsiteLink: "",
    selectedBrandWorkDescription: "",
    showBrandDetailsInputFields: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const checkisNewBrand = (item) => {
    let res = true;
    brands.forEach((brand) => {
      if (item?.name === brand.name) {
        res = false;
      }
    });
    return res;
  };

  const handleBrandChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      selectedBrand: value,
      isNewBrand: checkisNewBrand(value),
      showBrandDetailsInputFields: checkisNewBrand(value) ? true : false,
    }));
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const clearSelectedBrandDetails = () => {
    setState((prevState) => ({
      ...prevState,
      isNewBrand: false,
      selectedBrand: null,
      selectedBrandLogo: "",
      selectedBrandWebsiteLink: "",
      selectedBrandDescription: "",
      selectedBrandWorkTitle: "",
      selectedBrandWorkContentType: "",
      selectedBrandWorkDescription: "",
      selectedBrandWorkWebsiteLink: "",
      showBrandDetailsInputFields: false,
    }));
  };

  const createBrand = async () => {
    let logoLink = "";
    if (selectedBrandLogo) {
      const userId = getCookie("user_id");
      const s3FolderPath = `creator/${userId}/brands/`;
      let uploadRes = await uploadToAws(selectedBrandLogo, s3FolderPath);
      if (uploadRes?.file_url) {
        logoLink = uploadRes.file_url;
      }
    }
    const data = {
      name: selectedBrand?.name,
      logo: logoLink,
      description: selectedBrandDescription,
      website_link: selectedBrandWebsiteLink,
    };

    const res = await addBrand(data);

    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_BRAND_CREATE_SUCCESS, { variant: "success" });
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_BRAND_CREATE_FAILURE, { variant: "error" });
    }
    return res;
  };

  const saveBrandWork = async () => {
    if (!selectedBrand) {
      enqueueSnackbar(MESSAGES.ERROR.SELECT_CREATOR_BRAND, { variant: "error" });
      return;
    }
    if (!selectedBrandWorkContentType) {
      enqueueSnackbar(MESSAGES.ERROR.SELECT_CREATOR_BRAND_CONTENT_TYPE, { variant: "error" });
      return;
    }

    setSubmitting(true);

    let res = isNewBrand ? await createBrand() : null;

    // Failed to create brand
    if (isNewBrand && res.response_message !== API_RESPONSE_MESSAGE.SUCCESS) {
      return;
    }

    const data = {
      brand_id: res?.response_data?.id || selectedBrand?.id,
      work_title: selectedBrandWorkTitle,
      work_link: selectedBrandWorkWebsiteLink,
      description: selectedBrandWorkDescription,
      content_type: selectedBrandWorkContentType,
    };
    const addBrandWorkRes = await addCreatorBrandWork(data);
    if (addBrandWorkRes.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_BRAND_WORK_CREATE_SUCCESS, { variant: "success" });
      setSubmitting(false);
      onClose();
    } else {
      setSubmitting(false);
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_BRAND_WORK_CREATE_FAILURE, { variant: "error" });
    }
  };

  const updateBrandWork = async () => {
    if (!selectedBrand) {
      enqueueSnackbar(MESSAGES.ERROR.SELECT_CREATOR_BRAND, { variant: "error" });
      return;
    }
    if (!selectedBrandWorkContentType) {
      enqueueSnackbar(MESSAGES.ERROR.SELECT_CREATOR_BRAND_CONTENT_TYPE, { variant: "error" });
      return;
    }

    setSubmitting(true);
    const data = {
      brand_id: selectedBrand?.id,
      work_title: selectedBrandWorkTitle,
      work_link: selectedBrandWorkWebsiteLink,
      description: selectedBrandWorkDescription,
      content_type: selectedBrandWorkContentType,
    };
    const updateBrandWorkRes = await editCreatorBrandWork(data, brandWorkToEdit.id);
    if (updateBrandWorkRes.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_BRAND_WORK_UPDATE_SUCCESS, { variant: "success" });
      setSubmitting(false);
      onClose();
    } else {
      setSubmitting(false);
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_BRAND_WORK_UPDATE_FAILURE, { variant: "error" });
    }
  };

  const handleFileChange = (event) => {
    const document = event?.target?.files[0];
    if (!document) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      selectedBrandLogo: document,
    }));
  };

  useEffect(() => {
    if (!brandWorkToEdit) {
      clearSelectedBrandDetails();
    } else {
      setState((prevState) => ({
        ...prevState,
        selectedBrand: brandWorkToEdit.brand,
        selectedBrandWorkTitle: brandWorkToEdit.work_title,
        selectedBrandWorkDescription: brandWorkToEdit.description,
        selectedBrandWorkWebsiteLink: brandWorkToEdit.work_link,
        selectedBrandWorkContentType: brandWorkToEdit.content_type,
      }));
    }
    setSubmitting(false);
  }, [open, brandWorkToEdit]);

  const {
    isNewBrand,
    selectedBrand,
    selectedBrandLogo,
    selectedBrandWebsiteLink,
    selectedBrandDescription,
    selectedBrandWorkTitle,
    selectedBrandWorkWebsiteLink,
    selectedBrandWorkDescription,
    selectedBrandWorkContentType,
  } = state;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          backgroundColor: "#030303",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row">
        <DialogTitle color="white" sx={{ fontSize: 14 }}>
          {`${brandWorkToEdit ? "Edit" : "Add"} brand work`}
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      <DialogContent container sx={{ flexGrow: 1, backgroundColor: "black" }}>
        <Grid container spacing={2} fullWidth>
          {brandWorkToEdit ? null : (
            <Grid item fullWidth spacing={2} xs={12}>
              <Autocomplete
                value={selectedBrand}
                required
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    handleBrandChange({ name: newValue });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    handleBrandChange({ name: newValue.inputValue });
                  } else {
                    handleBrandChange(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some((option) => inputValue === option.name);
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: `Add brand ${inputValue}`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                size="small"
                handleHomeEndKeys
                id="creator-brand-select"
                options={brands}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                renderOption={(props, option) => {
                  return (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                      key={`brands-${option?.id}`}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={option.logo || ""}
                        srcSet={option.logo || ""}
                        alt=""
                      />
                      {option.name}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Brand"
                    InputProps={{ ...params.InputProps, sx: { borderRadius: 0.5, color: "white" } }}
                    color="info"
                  />
                )}
              />
            </Grid>
          )}
          {isNewBrand ? (
            <>
              <Grid item xs={12}>
                <Typography color={COLORS.white} sx={{ fontSize: 14 }}>
                  Please provide additional details about the brand.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  varaint="outlined"
                  size="small"
                  InputLabelProps={{
                    sx: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{ sx: { borderRadius: 0.5, color: "white" } }}
                  color="info"
                  name="selectedBrandDescription"
                  label="Brand Description"
                  value={selectedBrandDescription}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  minRows={3}
                  varaint="outlined"
                  size="small"
                  InputLabelProps={{
                    sx: {
                      fontSize: 14,
                    },
                  }}
                  InputProps={{ sx: { borderRadius: 0.5, height: "35px", color: "white" } }}
                  color="info"
                  name="selectedBrandWebsiteLink"
                  label="Brand Website Link"
                  value={selectedBrandWebsiteLink}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label" fullWidth>
                  Select brand logo
                  <input
                    onChange={handleFileChange}
                    hidden
                    single
                    type="file"
                    variant="outline"
                    accept="image/png, image/jpeg"
                  />
                </Button>
              </Grid>
              {selectedBrandLogo?.name && (
                <Grid item xs={12}>
                  <Typography
                    color="#e1e1e1"
                    sx={{ fontSize: { xs: "12px", sm: "15px", md: "15px" } }}
                  >
                    {selectedBrandLogo.name}
                  </Typography>
                </Grid>
              )}
            </>
          ) : null}
          {!brandWorkToEdit ? (
            <Grid item xs={12}>
              <Typography color={COLORS.white} sx={{ fontSize: 14 }}>
                Add you work
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              varaint="outlined"
              size="small"
              type="text"
              fullWidth
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{ sx: { borderRadius: 0.5, color: "white" } }}
              color="info"
              name="selectedBrandWorkTitle"
              label="Work Title"
              value={selectedBrandWorkTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              varaint="outlined"
              size="small"
              type="text"
              fullWidth
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{ sx: { borderRadius: 0.5, color: "white" } }}
              color="info"
              name="selectedBrandWorkDescription"
              label="Work Description"
              value={selectedBrandWorkDescription}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              varaint="outlined"
              size="small"
              fullWidth
              type="text"
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              InputProps={{ sx: { borderRadius: 0.5, color: "white" } }}
              color="info"
              name="selectedBrandWorkWebsiteLink"
              label="Work website link"
              value={selectedBrandWorkWebsiteLink}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              varaint="outlined"
              size="small"
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              name="selectedBrandWorkContentType"
              id="brand-work-content-type-select"
              value={selectedBrandWorkContentType}
              onChange={handleChange}
              label="Brand work content type"
              InputProps={{ sx: { borderRadius: 0.5, color: "white" } }}
              color="info"
            >
              {CREATOR_BRAND_WORK_CONTENT_TYPE.map((contentType, idx) => {
                return (
                  <MenuItem value={contentType} key={`creator-brand-work-content-type-${idx}`}>
                    {contentType}
                  </MenuItem>
                );
              })}
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
        <Button
          onClick={brandWorkToEdit ? updateBrandWork : saveBrandWork}
          variant="contained"
          color="info"
          sx={{}}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
