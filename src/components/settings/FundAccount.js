/* eslint-disable react/jsx-key */
import { Close, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Typography,
  Collapse,
  CardActions,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { useSnackbar } from "notistack";

import React, { useEffect, useState } from "react";
import LoadingBox from "src/components/common/loading-box";
import { deleteCreatorFundAccount, getCreatorAllFundAccount } from "src/services/creatorRequests";

const FundAccountCard = ({ data, userData, mutateAllFundAccount }) => {
  const [extended, setExtended] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!extended) {
      setShowDeleteAlert(false);
    }
  }, [extended]);

  if (!data) {
    return null;
  }
  let isUpi = data?.account_type === "vpa";
  let isBank = data?.account_type == "bank_account";

  const handleDeleteClick = async () => {
    setDeleting(true);
    try {
      await deleteCreatorFundAccount(data?.id);
      setDeleting(false);
      mutateAllFundAccount();
      enqueueSnackbar("Fund account removed succesfully", { variant: "success" });
    } catch (error) {
      setDeleting(false);
      console.log(error);
      enqueueSnackbar("Failed to delete account.", { variant: "warning" });
    }
  };
  return (
    <Card
      onClick={() => setExtended((s) => !s)}
      variant="outlined"
      sx={{
        display: "flex",
        minHeight: "80px",
        background: "#f5f5f5",
        cursor: "pointer",
        transition: "200ms",
        position: "relative",
        margin: "10px",
        // backgroundColor:"rgb(6 14 19)",

        "&:hover": {
          boxShadow: "0px 3px 6px #13131380",
        },
      }}
    >
      {deleting && <LoadingBox />}
      <CardMedia
        component="img"
        sx={{ width: 100, objectFit: "contain", p: 2, background: "white" }}
        image={(isUpi && "/assets/icons/upi.png") || (isBank && "/assets/icons/bank_transfer.png")}
        alt="upi"
      />

      <Box sx={{ p: 1, width: "100%", height: "100%" }}>
        <Grid container justifyContent="space-between">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: 0.5,
              color: "#131313",
              opacity: 0.7,
            }}
          >
            {(isUpi && "UPI") || (isBank && data.bank_name ? data?.bank_name : "Bank Account")}
          </Typography>
          <Close sx={{ fontSize: "16px" }} onClick={handleDeleteClick} />
        </Grid>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              letterSpacing: isBank ? 2 : 0.5,
              color: "#131313",
              opacity: 0.7,
            }}
          >
            {(isUpi && data?.upi_handle) ||
              (isBank && data?.account_number?.replace(/.(?=.{4})/g, "*"))}
          </Typography>
        </Box>
        {/* <Collapse in={extended} sx={{ width: "100%" }}>
          <CardContent sx={{ px: 0, padding: "0px" }}>
            {isBank && <Typography variant="body2">IFSC : {data.ifsc_code}</Typography>}
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              py: 0,
              marginTop: 1,
            }}
          >
            {!showDeleteAlert && (
              <Button
                sx={{ color: "black" }}
                size="small"
                onClick={(e) => {
                  setShowDeleteAlert(true);
                  e.stopPropagation();
                }}
              >
                Disable Account
              </Button>
            )}

            {showDeleteAlert && (
              <Box
                display="flex"
                sx={{ width: "100%", alignItems: "center", justifyContent: "flex-end" }}
              >
                <Typography variant="body1" color="red" sx={{ width: "100%", fontSize: "12px" }}>
                  Confirm disabling account ?{" "}
                </Typography>
                <Button
                  size="small"
                  sx={{ color: "black" }}
                  variant="text"
                  onClick={(e) => {
                    setShowDeleteAlert(false);
                    e.stopPropagation();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={handleDeleteClick}
                >
                  Disable
                </Button>
              </Box>
            )}
          </CardActions>
        </Collapse> */}
      </Box>
    </Card>
  );
};

export default FundAccountCard;
