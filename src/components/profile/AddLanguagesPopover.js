import { Popover, Box } from "@mui/material";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useAllCategory, useAllLanguage, useCategory } from "src/adapters/commonAdapters";

const AddLanguagesPopover = ({ open, anchorEl, handleClose, updateInfo }) => {
  const { languages } = useAllLanguage();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
            options={languages}
            disableCloseOnSelect
            renderTags={() => null}
            getOptionLabel={(option) => option.name}
            onChange={updateInfo}
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
              <TextField {...params} label="Search Languages" placeholder="languages" sx={{ input: { color: 'white' } }} />
            )}
            sx={{ minWidth: "300px", maxWidth: "80vw" }}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default AddLanguagesPopover;
