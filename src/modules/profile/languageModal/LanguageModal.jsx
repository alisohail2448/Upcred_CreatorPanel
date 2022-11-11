import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button, Chip, Autocomplete } from "@mui/material";
import { getCommonAllCategories, getCommonAllLanguages, getCreatorSocialPlatform } from "src/services/creatorRequests";
import { Edit, Facebook } from "@mui/icons-material";
import { useAllCategory, useAllLanguage } from "src/adapters/commonAdapters";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ModalStyle } from "../ModalStyle/ModalStyle";

export const LanguageModal = ({ languageData, handleLangDelete, addLanguage, languages }) => {
  const [searchedLanguages, setSearchedLanguages] = useState([]);

  useEffect( () => {
    handleLanguages();
  }, []);

  const handleLanguages = async(val) => {
    if (val == null) {
      setSearchedLanguages(languages);
    } else {
      const res = await getCommonAllLanguages(val);
      setSearchedLanguages(res);
    }
  };

  return (
    <Container sx={ModalStyle}>
      <Typography variant="body1" color="white" display="flex" alignItems="center" gap={2}>
        <Edit sx={{ fontSize: "1.2rem" }} /> Edit Languages
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        {languageData.map((item, index) => (
          <Chip
            style={{ padding: "15px 10px", color: "white" }}
            key={index}
            variant="outlined"
            label={item.name}
            color="info"
            size="small"
            sx={{ borderRadius: 0.5, mr: 1, mb: 1 }}
            onDelete={() => {
              handleLangDelete(item.id);
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
          options={!searchedLanguages ? languages : searchedLanguages}
          disableCloseOnSelect
          renderTags={() => null}
          getOptionLabel={(option) => option.name}
          onChange={(e, val) => {
            addLanguage(val);
          }}
          ListboxProps={{
            sx: {
              background: "#000000",
              color: "white",
            },
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Category"
              placeholder="Favorites"
              onChange={(e) => handleLanguages(e.target.value)}
              sx={{ input: { color: "white" } }}
            />
          )}
          sx={{ minWidth: "300px", maxWidth: "80vw" }}
        />
      </Box>
    </Container>
  );
};
