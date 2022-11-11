import { DeleteFilled } from "@ant-design/icons";
import { Add, DescriptionOutlined } from "@mui/icons-material";
import { Card, Grid, Box, Stack, Typography, Button, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import AddDocumentDialog from "src/components/profile/AddDocumentDialog";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { REVERSE_DOCUMENT_TYPE_VALUE_MAPPING } from "src/constants/documentType";
import { MESSAGES } from "src/constants/messages";
import { deleteCreatorDocument, getAllCreatorDocument } from "src/services/commonRequests";

const DocumentsCard = ({}) => {
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [documents, setDocuments] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const getDocuments = async () => {
    const res = await getAllCreatorDocument();
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      setDocuments([...res?.response_data]);
    } else {
      enqueueSnackbar(MESSAGES.ERROR.FETCH_DOCUMENTS_FAILURE, { variant: "error" });
    }
  };

  const deleteDocument = async (documentId) => {
    const res = await deleteCreatorDocument(documentId);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.CREATOR_DOCUMENT_DELETION_SUCCESS, { variant: "success" });
    } else {
      enqueueSnackbar(MESSAGES.ERROR.CREATOR_DOCUMENT_DELETION_FAILURE, { variant: "error" });
    }
    getDocuments();
  };

  useEffect(() => {
    getDocuments();
  }, [showAddDocument]);

  return (
    <Card className="card" elevation={5}>
      <AddDocumentDialog open={showAddDocument} onClose={() => setShowAddDocument(false)} />
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1" className="primary-title">
          Documents :
        </Typography>
        <Button
          onClick={() => setShowAddDocument(true)}
          color="success"
          variant="contained"
          size="small"
          sx={{
            background: "-webkit-linear-gradient(30deg,#4647da,#3ad57c)",
            color: "white",
          }}
        >
          <Add fontSize="small" /> ADD DOCUMENTS
        </Button>
      </Box>
      <Grid container display="flex" justifyContent="flex-start" direction="row">
        {documents.map(
          (item, index) =>
            item.is_active && (
              <Grid item sx={{ p: 1 }} key={`document-${index}`}>
                <Box
                  style={{
                    backgroundColor: "#00000090",
                    padding: "10px 15px",
                    borderRadius: "10px",
                  }}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <DescriptionOutlined style={{ color: "#0175f8" }} />
                  <Typography
                    sx={{
                      px: 2,
                      color: "white",
                      fontSize: { xs: "12px", sm: "16px", md: "18px" },
                      mr: 1,
                    }}
                  >
                    {REVERSE_DOCUMENT_TYPE_VALUE_MAPPING[item.document_type]}
                  </Typography>
                  <Stack direction="row">
                    <IconButton size="small" onClick={() => deleteDocument(item.id)}>
                      <DeleteFilled fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
                <Grid
                  item
                  display="flex"
                  width="100%"
                  justifyContent={{ xs: "flex-end", sm: "flex-end" }}
                ></Grid>
              </Grid>
            )
        )}
      </Grid>
    </Card>
  );
};

export default DocumentsCard;
