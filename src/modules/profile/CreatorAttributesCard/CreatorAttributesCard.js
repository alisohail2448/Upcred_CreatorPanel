import { Card, Box, Typography, Chip, LinearProgress, Modal } from "@mui/material";
import React, { useState } from "react";
// import { COLORS } from "src/configs/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import MockApi from "src/services/mockApi";
import {
  getCreatorCategory,
  getCreatorLanguages,
  getCreatorSkills,
  addCreatorCategory,
  addCreatorSkill,
  addCreatorLanguage,
  deleteCreatorCategory,
  deleteCreatorSkill,
  deleteCreatorLanguage,
} from "src/services/creatorRequests";
// import TableCategories from "./TableCategories";
import { CategoryModal } from "src/modules/profile/CategoryModal/CategoryModal";
import { SkillModal } from "../SkillModal/SkillModal";
import { LanguageModal } from "../LanguageModal/LanguageModal";
import { useSnackbar } from "notistack";
import { Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { MESSAGES } from "src/constants/messages";
import { useAllCategory, useAllLanguage, useAllSkill } from "src/adapters/commonAdapters";

const CreatorAttributesCard = () => {


  const { categories } = useAllCategory();
  const { languages } = useAllLanguage();
  const { skills } = useAllSkill();

  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [skillAnchor, setSkillAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [detailsUpdating, setDetailsUpdating] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [languageAdding, setLanguageAdding] = useState(false);
  const [skillsAdding, setSkillsAdding] = useState(false);
  const [categoryAdding, setCategoryAdding] = useState(false);

  const [categoryDeleting, setCategoryDeleting] = useState(false);
  const [skillDeleting, setSkillDeleting] = useState(false);
  const [languageDeleting, setLanguageDeleting] = useState(false);

  const [categoriesData, setCategoriesData] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, [categoryAdding, categoryDeleting]);

  useEffect(() => {
    getSkillsData();
  }, [skillsAdding, skillDeleting]);

  useEffect(() => {
    getLanguageData();
  }, [languageAdding, languageDeleting]);

  const getCategoriesData = async () => {
    const res = await getCreatorCategory();
    setCategoriesData(res.category);
  };

  const getSkillsData = async () => {
    const res = await getCreatorSkills();
    setSkillsData(res);
  };

  const getLanguageData = async () => {
    const res = await getCreatorLanguages();
    setLanguageData(res);
  };

  const handleSkillDelete = async (data) => {
    setSkillDeleting(true);
    const res = await deleteCreatorSkill(data);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_SKILL_DELETE_SUCCESS, { variant: "success" });
      setSkillDeleting(false);
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_SKILLS_DELETE_FAILURE, { variant: "error" });
      setSkillDeleting(false);
    }
  };

  const handleCategoryDelete = async (data) => {
    setCategoryDeleting(true);
    const res = await deleteCreatorCategory(data);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_CATEGORY_DELETE_SUCCESS, { variant: "success" });
      setCategoryDeleting(false);
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_CATEGORY_DELETE_FAILURE, { variant: "error" });
      setCategoryDeleting(false);
    }
  };

  const handleLangDelete = async (data) => {
    setLanguageDeleting(true);
    const res = await deleteCreatorLanguage(data);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_LANGUAGE_DELETE_SUCCESS, { variant: "success" });
      setLanguageDeleting(false);
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_LANGUAGE_DELETE_FAILURE, { variant: "error" });
      setLanguageDeleting(false);
    }
  };

  const addCategory = async (val) => {
    if (val) {
      setCategoryAdding(true);
      const res = await addCreatorCategory({ category_id: val.id });
      if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
        enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_CATEGORY_ADDED_SUCCESS, { variant: "success" });
        setCategoryAdding(false);
      } else {
        enqueueSnackbar(MESSAGES.ERROR.CREATOR_CATEGORY_ADD_FAILURE, { variant: "error" });
        setCategoryAdding(false);
      }
    }
  };

  const addSkill = async (val) => {
    if (val) {
      setSkillsAdding(true);
      const res = await addCreatorSkill({ skill_id: val.id });
      if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
        enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_SKILLS_ADDED_SUCCESS, { variant: "success" });
        setSkillsAdding(false);
      } else {
        enqueueSnackbar(MESSAGES.ERROR.CREATOR_SKILLS_ADD_FAILURE, { variant: "error" });
        setSkillsAdding(false);
      }
    }
  };

  const addLanguage = async (val) => {
    if (val) {
      setLanguageAdding(true);
      const res = await addCreatorLanguage({ language_id: val.id });
      if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
        enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_LANGUAGE_ADDED_SUCCESS, { variant: "success" });
        setLanguageAdding(false);
      } else {
        enqueueSnackbar(MESSAGES.ERROR.CREATOR_LANGUAGE_ADD_FAILURE, { variant: "error" });
        setLanguageAdding(false);
      }
    }
  };

  const handleAddCategoryClick = (event) => {
    setCategoryAnchor(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchor(null);
  };

  const handleAddSkillClick = (event) => {
    setSkillAnchor(event.currentTarget);
  };

  const handleSkillClose = () => {
    setSkillAnchor(null);
  };

  const handleAddLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const openEditCategory = Boolean(categoryAnchor);
  const openEditSkill = Boolean(skillAnchor);
  const openEditLanguage = Boolean(languageAnchor);

  return (
    <Card className="card" elevation={5}>
      {detailsUpdating && <LinearProgress sx={{ position: "absolute", top: 0, width: "100%" }} />}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, backgroundColor: "black" }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h1" className="primary-title">
                  Categories :
                </Typography>
              </TableCell>
              <TableCell align="right">
                {categoriesData.map((item, index) => (
                  <Chip
                    style={{ padding: "15px 10px", color: "white" }}
                    variant="outlined"
                    label={item.value}
                    color="info"
                    size="small"
                    sx={{ borderRadius: 0.5, mr: 1, mb: 1 }}
                  />
                ))}
                <Chip
                  style={{ padding: "15px 10px" }}
                  label={
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Edit size="small" />
                    </Box>
                  }
                  color="success"
                  size="small"
                  sx={{
                    borderRadius: 0.5,
                    mr: 1,
                    mb: 1,
                    background: "none",
                    color: "white",
                  }}
                  onClick={handleAddCategoryClick}
                />
                <Modal
                  open={openEditCategory}
                  onClose={handleCategoryClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <CategoryModal
                    categoriesData={categoriesData}
                    handleCategoryDelete={handleCategoryDelete}
                    addCategory={addCategory}
                    categories={categories}
                  />
                </Modal>
              </TableCell>
            </TableRow>
            <TableRow
              // key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="h1" className="primary-title">
                  Skills :
                </Typography>
              </TableCell>
              <TableCell align="right">
                {skillsData.map((item, index) => (
                  <Chip
                    style={{ padding: "15px 10px", color: "white" }}
                    variant="outlined"
                    label={item.value}
                    color="info"
                    size="small"
                    sx={{ borderRadius: 0.5, mr: 1, mb: 1 }}
                  />
                ))}
                <Chip
                  style={{ padding: "15px 10px" }}
                  label={
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Edit size="small" />
                    </Box>
                  }
                  color="success"
                  size="small"
                  sx={{
                    borderRadius: 0.5,
                    mr: 1,
                    mb: 1,
                    background: "none",
                    color: "white",
                  }}
                  onClick={handleAddSkillClick}
                />
                <Modal
                  open={openEditSkill}
                  onClose={handleSkillClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <SkillModal
                    skillsData={skillsData}
                    handleSkillDelete={handleSkillDelete}
                    addSkill={addSkill}
                    skills={skills}
                  />
                </Modal>
              </TableCell>
            </TableRow>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Typography variant="h1" className="primary-title">
                  Languages :
                </Typography>
              </TableCell>
              <TableCell align="right">
                {languageData.map((item, index) => (
                  <Chip
                    style={{ padding: "15px 10px", color: "white" }}
                    variant="outlined"
                    label={item.name}
                    color="info"
                    size="small"
                    sx={{ borderRadius: 0.5, mr: 1, mb: 1 }}
                  />
                ))}
                <Chip
                  style={{ padding: "15px 10px" }}
                  label={
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Edit size="small" />
                    </Box>
                  }
                  color="success"
                  size="small"
                  sx={{
                    borderRadius: 0.5,
                    mr: 1,
                    mb: 1,
                    background: "none",
                    color: "white",
                  }}
                  onClick={handleAddLanguageClick}
                />
                <Modal
                  open={openEditLanguage}
                  onClose={handleLanguageClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <LanguageModal
                    languageData={languageData}
                    handleLangDelete={handleLangDelete}
                    addLanguage={addLanguage}
                    languages={languages}
                  />
                </Modal>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CreatorAttributesCard;
