import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Autocomplete, Button, CircularProgress, createFilterOptions, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { COLORS } from "src/configs/colors";
import { addBrand } from "src/services/brandRequests";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { MESSAGES } from "src/constants/messages";
import { CREATOR_BRAND_WORK_CONTENT_TYPE } from "src/constants/creatorBrandWorkContentType";
import { Close, EditOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { addCreatorBrandWork, deleteCreatorBrandWork } from "src/services/creatorRequests";
import { getCookie } from "cookies-next";
import { uploadToAws } from "src/services/commonRequests";
import { DeleteFilled } from "@ant-design/icons";
import AddPortfolioDialog from "./AddPortfolioDialog";


export default function BrandPortfolioDialog({ open, onClose, brands, portfolio, brandId, getCreatorsBrandWork }) {

  const [state, setState] = React.useState({
    brandWorkToEdit: null,
    showEditPortfolio: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const editBrandWork = (work) => {
    setState((prevState) => ({
      ...prevState,
      brandWorkToEdit: work,
      showEditPortfolio: true,
    }));
  }
  const clearSelectedBrandDetails = () => {
    getCreatorsBrandWork();
    setState((prevState) => ({
      ...prevState,
      brandWorkToEdit: null,
      showEditPortfolio: false,
    }));
  };

  const deleteBrandWork = async (id) => {
    const res = await deleteCreatorBrandWork(id);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_BRAND_WORK_DELETE_SUCCESS, { variant: 'success' });
      getCreatorsBrandWork();
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_BRAND_WORK_DELETE_FAILURE, { variant: 'error' });
    }
  }

  useEffect(() => {
    clearSelectedBrandDetails();
  }, [open]);

  const {
    brandWorkToEdit,
    showEditPortfolio
  } = state;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          backgroundColor: "#030303",
        },
      }}
      fullScreen
    >
      <AddPortfolioDialog open={showEditPortfolio} onClose={clearSelectedBrandDetails} brands={brands}
        brandWorkToEdit={brandWorkToEdit}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row">
        <DialogTitle color="white" sx={{ fontSize: 14 }}>
          Edit brand work
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      <DialogContent container sx={{ flexGrow: 1, backgroundColor: "#121212" }} >

        {
          portfolio.map((work) => {
            return work.brand.id === brandId
              &&
              <Paper container spacing={2}
                xs={12}
                sx={{ px: 2, py: 2, display: "flex", my: 2, justifyContent: "space-between", alignItems: "center", background: "black", color: "white" }}
                fullWidth>
                <Grid>
                  <Grid item xs={12}>
                    <Typography
                      fullWidth
                      color="info"
                    >Title: {work.work_title}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      fullWidth
                      color="info"
                    >Desription: {work.description}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      fullWidth
                      color="info"
                    >Link: {work.work_link}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      fullWidth
                      color="info"
                    >Content type: {work.content_type}</Typography>
                  </Grid>
                </Grid>
                <Stack>
                  <IconButton
                    style={{ color: '#0175f8' }}
                    sx={{ mx: 1 }}
                    onClick={() => editBrandWork(work)}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => deleteBrandWork(work.id)}  >
                    <DeleteFilled />
                  </IconButton>
                </Stack>
              </Paper>
          })}

      </DialogContent>
    </Dialog>
  );
}
