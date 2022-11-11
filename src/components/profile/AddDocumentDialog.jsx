import { Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { DOCUMENT_TYPE, DOCUMENT_TYPE_VALUE_MAPPING } from "src/constants/documentType";
import { MESSAGES } from "src/constants/messages";
import { uploadCreatorDocument } from "src/services/commonRequests";

const AddDocumentDialog = ({ open = true, onClose, onSubmitPress }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [submitting, setSubmitting] = useState(false);

  const [state, setState] = useState({
    documentFile: null,
    documentType: '',
  });

  const handleEntering = () => { };

  useEffect(() => {
    if (!open) {
      setState({
        documentFile: null,
        documentType: '',
      });
    }
  }, [open]);

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      documentType: e.target.value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { documentFile, documentType } = state;
    if (!documentFile) {
      enqueueSnackbar(MESSAGES.ERROR.SELECT_CREATOR_DOCUMENT_FILE, { variant: 'error' });
      return;
    }
    if (!documentType) {
      enqueueSnackbar(MESSAGES.ERROR.SELECT_CREATOR_DOCUMENT_TYPE, { variant: 'error' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await uploadCreatorDocument(documentFile, documentType);
      setSubmitting(false);
      if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
        enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_DOCUMENT_ADD_SUCCESS, { variant: 'success' });
        onClose();
      } else {
        enqueueSnackbar(MESSAGES.ERROR.CREATOR_DOCUMENT_ADD_FAILURE, { variant: 'error' });
      }
    } catch (error) {
      setSubmitting(false);
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_DOCUMENT_ADD_FAILURE, { variant: 'error' });
    }
  }

  const handleFileChange = (event) => {
    const document = event?.target?.files[0];
    if (!document) {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      documentFile: document,
    }));
  }

  const { documentType, documentFile } = state;
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          backgroundColor: "#030303",
        },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row">
        <DialogTitle color="white" sx={{ fontSize: 14 }}>
          Add document
        </DialogTitle>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider sx={{ opacity: 0.5 }} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12} sm={12}>
            <TextField
              fullWidth
              select
              varaint="outlined"
              size="small"
              required
              InputLabelProps={{
                sx: {
                  fontSize: 14,
                },
              }}
              id="document-type-select"
              value={documentType}
              onChange={handleChange}
              label="Document type"
              InputProps={{ sx: { borderRadius: 0.5, height: "35px", color: "white" } }}
              color="info"
            >
              {DOCUMENT_TYPE.map((docType, idx) => {
                return <MenuItem value={DOCUMENT_TYPE_VALUE_MAPPING[docType]} key={`document-${idx}`}>{docType}</MenuItem>
              })}
            </TextField>
          </Grid>
          <Grid item lg={12} xs={12} sm={12}>
            <Button variant="contained" component="label" fullWidth>
              Select document
              <input
                onChange={handleFileChange}
                hidden
                single
                type="file"
                variant="outline" accept=".pdf, image/png, image/jpeg, .doc, .docx,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
            </Button>
          </Grid>
          {
            documentFile?.name &&
            <Grid item lg={12} xs={12} sm={12}>
              <Typography color="#e1e1e1" sx={{ fontSize: { xs: "12px", sm: "15px", md: "15px" } }}>
                {documentFile.name}
              </Typography>
            </Grid>
          }
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
        <Button onClick={handleSubmit} variant="contained" color="info" sx={{}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDocumentDialog;
