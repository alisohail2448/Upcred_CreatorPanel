import { Popover, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useAllCategory, useCategory } from "src/adapters/commonAdapters";
import { getAllSocialPlatforms } from "src/services/contentTypeRequest";
import Condition from "yup/lib/Condition";

const AddSocialComponentsPopover = ({ open, anchorEl, handleClose, updateInfo }) => {
  const { categories } = useAllCategory();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [data, setData] = useState(null);
  const [selectedSocialComponent, setSelectedSocialComponent] = useState(null);

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNDExMTZjZWQtYWViZC00NjdhLWFjYTgtMjZhMGNiNmQ1YWExIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiYWdlbnQiOiJQb3N0bWFuUnVudGltZS83LjI5LjAiLCJob3N0IjoiMTI3LjAuMC4xOjgwMDAiLCJhdWQiOiIxMjcuMC4wLjE6ODAwMCIsImV4cCI6MTY1MTE0MDQ3MH0.j-Sify1emuPQRLVprSsxO8MzSdXPyLr5SUXbV-AI6x4'
  //   }
  // };

  // useEffect(() => {
  //    fetch('https://beta-api.upcred.ai/api/v1/common/social_platform_content_type/get_all_social_platforms_content_type/?page_number=0&platform_id=6d04351f-11e0-418d-9811-9afbe452e6fa', options)
  //   .then(response => response.json())
  //   .then(response => setData(response?.response_data))
  //   .catch(err => console.error(err));

  //   console.log(data)
  // }, [])

  useEffect(() => {
    getAllPlatforms();
  }, []);

  const getAllPlatforms = async () => {
    let res = await getAllSocialPlatforms();
    setData(res);
  };

  return (
    <Box sx={{ width: "90%", zIndex: 2, paddingTop: 1 }}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{ sx: { background: "#000000", borderRadius: 0.5, padding: 0 } }}
      >
        <Box sx={{ py: 1, width: "100%" }}>
          <Autocomplete
            multiple
            size="small"
            fullWidth
            openOnFocus
            options={data}
            disableCloseOnSelect
            renderTags={() => null}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => console.log(value)}
            ListboxProps={{
              sx: {
                background: "#000000",
                color: "white",
              },
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  //   checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Social Components"
                placeholder="Favorites"
                sx={{ input: { color: "white" } }}
              />
            )}
            sx={{ minWidth: "300px", maxWidth: "80vw", color: "#ffffff" }}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default AddSocialComponentsPopover;
