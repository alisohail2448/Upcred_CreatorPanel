import { CheckCircleOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";
import {
  Add,
  AddBox,
  CheckCircleOutline,
  CheckCircleOutlineOutlined,
  Facebook,
  FacebookOutlined,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import { Card, Grid, Box, Stack, Typography, Link, Button, Tooltip, Chip } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "src/configs/colors";

const SavedPaymentsCard = ({}) => {
  const [showAddPlatform, setShowAddPlatform] = useState(false);

  let savedPayments = [""];

  return (
    <Card className="card" elevation={5}>
      <Typography sx={{ px: 1, color: "#e1e1e1", fontSize: "12px", mb: 1 }}>
        Saved Payment Methods :
      </Typography>
      <Grid container sx={{ px: 2 }}>
        {savedPayments.map((item, index) => (
          <Grid container display="flex" direction="row" sx={{ my: 2 }}>
            <Box sx={{ borderRadius: 1, border: "1px solid #e1e1e1", borderColor: "white", p: 1 }}>
              <img src="/assets/icons/upi.png" alt="upi" />
            </Box>
            <Stack>
              <Typography
                sx={{ px: 2, color: "white", fontSize: { xs: "14px", sm: "16px", md: "18px" } }}
              >
                HDFC BANK 6645
              </Typography>
              <Typography
                sx={{ px: 2, color: "#e1e1e1aa", fontSize: { xs: "10px", sm: "12px", md: "14px" } }}
              >
                --
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        sx={{
          width: "100%",
          justifyContent: { xs: "flex-start", sm: "center" },
          alignItems: "center",
          py: 2,
          px: 2,
        }}
      >
        <Button
          color="success"
          variant="contained"
          size="small"
          sx={{ px: 0.5, py: 0, borderRadius: 0.5 }}
        >
          <Add fontSize="small" /> ADD PAYMENT MODE
        </Button>
      </Grid>
    </Card>
  );
};

export default SavedPaymentsCard;
