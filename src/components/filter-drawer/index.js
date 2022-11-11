/* eslint-disable react/jsx-key */
import { Close, DisplaySettingsOutlined } from "@mui/icons-material";
import {
  TextField,
  Drawer,
  Box,
  Tooltip,
  Button,
  IconButton,
  Typography,
  Divider,
  FormLabel,
  FormGroup,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Autocomplete,
} from "@mui/material";

import React, { useState } from "react";
import {
  useAllAudience,
  useAllCategory,
  useAllLanguage,
  useAllLocation,
} from "src/adapters/commonAdapters";
import Section from "src/layouts/section";
import ClearButton from "../common/clear-button";
import { filteredInactive } from "src/utils/filteredInactive";

const drawerWidth = 400;

export const FilterDrawer = ({ onRequestClose, open, drawerControl, onFilterApply, params }) => {
  const [filterData, setFilterData] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const { languages = [] } = useAllLanguage({ is_active: true });
  const { categories = [] } = useAllCategory({
    page_size: 50,
    page_number: 0,
    searched_name_pattern: searchCategory,
    is_active: true,
  });
  const { audiences = [] } = useAllAudience({ is_active: true });
  const { locations = [] } = useAllLocation({
    page_size: 50,
    page_number: 0,
    searched_name_pattern: searchLocation,
    is_active: true,
  });

  const locationsFiltered = locations?.filter(filteredInactive);
  const categoriesFiltered = categories?.filter(filteredInactive);

  console.log("SEARCH LOCATION", searchLocation);

  const handleFilterChange = (e) => {
    let id = e.target.name;
    let value = e.target.value;
    setFilterData((s) => ({ ...s, [id]: value }));
  };
  const handleLocationFilterChange = (e, newValue) => {
    setFilterData((s) => ({ ...s, location_id: newValue?.id }));
  };

  const handleLanguageFilter = (value) => {
    setFilterData((s) => ({ ...s, language_id: value }));
  };
  const handleCategoryFilterChange = (e, newValue) => {
    setFilterData((s) => ({ ...s, category_id: newValue?.id }));
  };
  const handleAudienceFilter = (value) => {
    setFilterData((s) => ({ ...s, audience_group_id: value }));
  };

  const handleClear = (id) => {
    setFilterData((s) => ({
      ...s,
      [id]: null,
    }));
  };

  const handleClearAll = () => {
    setFilterData({});
    onFilterApply && onFilterApply({});
  };

  const handleApply = () => {
    onFilterApply && onFilterApply({ ...params, ...filterData });
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
          backgroundColor: "#ffffff",
          opacity: 1,
          zIndex: 0,
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(0px)",
          background: "#12121210",
        },
      }}
      anchor="right"
      variant="temporary"
      open={open}
      onClose={drawerControl?.disableBackdropClose ? null : onRequestClose}
    >
      <Box role="presentation" flexGrow={1} sx={{ pb: "50px", overflowY: "hidden" }}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          sx={{ background: "#e1e1e1", position: "sticky", top: 0, zIndex: 999, padding: 1 }}
        >
          <Tooltip title="Close">
            <IconButton
              size="small"
              sx={{ width: 40, height: 40, borderRadius: 20 }}
              onClick={onRequestClose}
            >
              <Close fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mr: 2, alignItems: "center" }}>
            <IconButton>
              <DisplaySettingsOutlined fontSize="small" />
            </IconButton>
            <Typography variant="subtitle1">Filters</Typography>
          </Box>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          sx={{
            background: "#121212aa",
            position: "absolute",
            bottom: 0,
            zIndex: 999,
            padding: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="success"
            sx={{ borderRadius: 0.1 }}
            onClick={handleApply}
          >
            APPLY
          </Button>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            onClick={handleClearAll}
            sx={{ borderRadius: 0.1 }}
          >
            CLEAR ALL
          </Button>
        </Box>
        <Box
          width="100%"
          height="90%"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ p: 0, overflowY: "auto" }}
        >
          <Section>
            <FormControl sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormLabel sx={{ fontSize: "12px" }} id="gender">
                  By Gender
                </FormLabel>
                <ClearButton onClick={() => handleClear("gender")} />
              </Box>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                onChange={handleFilterChange}
                value={filterData?.gender}
                name="gender"
              >
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    checked={filterData?.gender === "FEMALE"}
                    value="FEMALE"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    value="MALE"
                    checked={filterData?.gender === "MALE"}
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    value="OTHER"
                    checked={filterData?.gender === "OTHER"}
                    control={<Radio size="small" />}
                    label="Other"
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Section>
          <Section>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <FormControl>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormLabel id="email-status" sx={{ fontSize: "12px" }}>
                    Email Status
                  </FormLabel>
                  <ClearButton onClick={() => handleClear("is_email_verified")} />
                </Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="is_email_verified"
                  onChange={handleFilterChange}
                >
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    value={"true"}
                    checked={filterData?.is_email_verified === "true"}
                    control={<Radio size="small" />}
                    label="Verified"
                  />
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    value={"false"}
                    checked={filterData?.is_email_verified === "false"}
                    control={<Radio size="small" />}
                    label="Not Verified"
                  />
                </RadioGroup>
              </FormControl>
              <Divider orientation="vertical" sx={{ height: "100%" }} />
              <FormControl>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormLabel sx={{ fontSize: "12px" }} id="mobile status">
                    Mobile Status
                  </FormLabel>
                  <ClearButton onClick={() => handleClear("is_mobile_verified")} />
                </Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="is_mobile_verified"
                  onChange={handleFilterChange}
                >
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    value={"true"}
                    checked={filterData?.is_mobile_verified === "true"}
                    control={<Radio size="small" />}
                    label="Verified"
                  />
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    value={"false"}
                    checked={filterData?.is_mobile_verified === "false"}
                    control={<Radio size="small" />}
                    label="Not Verified"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Section>
          {/* <Section>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <FormLabel sx={{ fontSize: "12px" }}>By Age</FormLabel>
                <ClearButton onClick={() => handleClear("search")} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <TextField size="small" varaint="outlined" label="Min" type="number" />
                <Typography varaint="body2" color="#12121280" sx={{ mx: 4 }}>
                  {" "}
                  -{" "}
                </Typography>
                <TextField size="small" varaint="outlined" label="Max" type="number" />
              </Box>
            </Box>
          </Section> */}
          <Section>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <FormLabel sx={{ fontSize: "12px" }}>By Location</FormLabel>
                <ClearButton onClick={() => handleClear("locations")} />
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Autocomplete
                  name="locations"
                  disablePortal
                  id="locations"
                  onInputChange={(e, newValue) => {
                    setSearchLocation(e.target.value);
                  }}
                  getOptionLabel={(locationsFiltered) => `${locationsFiltered.name}`}
                  options={locationsFiltered}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Locations" />}
                  onChange={handleLocationFilterChange}
                  value={filterData?.locations}
                />
              </Box>
            </Box>
          </Section>
          {/* <Section>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <FormLabel sx={{ fontSize: "12px" }}>By Languages</FormLabel>
                <ClearButton onClick={() => handleClear("language")} />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {languages?.filter(filteredInactive).map((item, index) => (
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    key={index}
                    sx={{ flex: 1 }}
                    control={<Checkbox size="small" />}
                    label={item.name}
                    value={filterData?.languages}
                    onChange={() => handleLanguageFilter(item.id)}
                    id="languages"
                    name="languages"
                  />
                ))}
              </Box>
            </Box>
          </Section> */}
          <Section>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <FormLabel sx={{ fontSize: "12px" }}>By Categories</FormLabel>
                <ClearButton onClick={() => handleClear("categories")} />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {/* {categories?.filter(filteredInactive).map((item, index) => (
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    key={index}
                    size="small"
                    onChange={() => handleCategoryFilter(item.id) }
                    sx={{ flex: 1 }}
                    control={<Checkbox size="small" />}
                    label={item.value}
                    value={filterData?.categories}
                    name="categories"
                  />
                ))} */}
                <Autocomplete
                  name="categories"
                  disablePortal
                  id="categories"
                  onInputChange={(e, newValue) => {
                    setSearchCategory(e.target.value);
                  }}
                  getOptionLabel={(categoriesFiltered) => `${categoriesFiltered.value}`}
                  options={categoriesFiltered}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Categories" />}
                  onChange={handleCategoryFilterChange}
                  value={filterData?.categories}
                />
              </Box>
            </Box>
          </Section>

          {/* <Section>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                }}
              >
                <FormLabel sx={{ fontSize: "12px" }}>By Audience</FormLabel>
                <ClearButton onClick={() => handleClear("audience")} />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {audiences?.filter(filteredInactive).map((item, index) => (
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: "small",
                      },
                    }}
                    key={index}
                    size="small"
                    sx={{ flex: 1 }}
                    control={<Checkbox size="small" />}
                    label={item.name}
                    name="audience"
                    value={filterData?.audiences}
                    id="audience"
                    onChange={() => handleAudienceFilter(item.id) }
                  />
                ))}
              </Box>
            </Box>
          </Section> */}
        </Box>
      </Box>
    </Drawer>
  );
};
