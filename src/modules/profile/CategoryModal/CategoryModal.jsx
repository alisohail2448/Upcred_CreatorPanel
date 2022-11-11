import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button, Chip, Autocomplete } from "@mui/material";
import { getCommonAllCategories, getCreatorSocialPlatform } from "src/services/creatorRequests";
import { Edit, Facebook } from "@mui/icons-material";
import { useAllCategory } from "src/adapters/commonAdapters";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ModalStyle } from "../ModalStyle/ModalStyle";


export const CategoryModal = ({ categoriesData, handleCategoryDelete, addCategory, categories }) => {

  const [category, setCategory] = useState([]);

  useEffect(() => {
    handleCategoryChange();
  }, []);

  const handleCategoryChange = async(val) => {
    if (val == null) {
      setCategory(categories);
    } else {
     const res = await getCommonAllCategories(val);
     setCategory(res)
    }
  };

  return (
    <Container sx={ModalStyle}>
      <Typography variant="body1" color="white" display="flex" alignItems="center" gap={2}>
        <Edit sx={{ fontSize: "1.2rem" }} /> Edit Categories
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        {categoriesData.map((item, index) => (
          <Chip
            style={{ padding: "15px 10px", color: "white" }}
            key={index}
            variant="outlined"
            label={item.value}
            color="info"
            size="small"
            sx={{ borderRadius: 0.5, mr: 1, mb: 1 }}
            onDelete={() => {
              handleCategoryDelete(item.id);
            }}
          />
        ))}
      </Box>
      <Box sx={{ py: 1, width: "100%" }}>
        <Autocomplete
          size="small"
          fullWidth
          name="category_id"
          openOnFocus
          options={!category ? categories : category}
          disableCloseOnSelect
          renderTags={() => null}
          getOptionLabel={(option) => option.value}
          onChange={(e, val) => {
            addCategory(val);
          }}
          ListboxProps={{
            sx: {
              background: "#000000",
              color: "white",
            },
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.value}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Category"
              placeholder="Favorites"
              onChange={(e) => handleCategoryChange(e.target.value)}
              sx={{ input: { color: "white" } }}
            />
          )}
          sx={{ minWidth: "300px", maxWidth: "80vw" }}
        />
      </Box>
    </Container>
  );
};
