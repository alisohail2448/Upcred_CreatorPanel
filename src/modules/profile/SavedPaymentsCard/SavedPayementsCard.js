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
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useCreatorAllFundAccount } from "src/adapters/creatorsAdapters";
import AddPaymentDialog from "src/components/profile/AddPaymentDialog";
import { EditPaymentMethods } from "src/components/settings/Drawer/EditPaymentMethods";
import FundAccountCard from "src/components/settings/FundAccount";
import SectionLayout from "src/layouts/section-layout";
import { filteredInactive } from "src/utils/filteredInactive";

const SavedPaymentsCard = ({ userData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { creatorAllFundAccounts, mutate: mutateAllFundAccount } = useCreatorAllFundAccount(
    userData.id
  );

  return (
    <Card className="card" elevation={5}>
      <EditPaymentMethods
        open={isDrawerOpen}
        userData={userData}
        setIsDrawerOpen={setIsDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      {/* <AddPaymentDialog open={showAddPayment} onClose={() => setShowAddPayment(false)} /> */}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1" className="primary-title">
          Saved Payment Methods :
        </Typography>
        <Button
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "rgb(6 14 19)",
          }}
        >
          <Add fontSize="small" />
        </Button>
      </Box>
      <Grid container sx={{ px: 2 }}>
        {creatorAllFundAccounts?.filter(filteredInactive).length === 0 && (
          <CenteredColumn sx={{ minHeight: "200px" }}>
            <Typography color="white">No Account Found</Typography>
          </CenteredColumn>
        )}
        {creatorAllFundAccounts?.filter(filteredInactive).map((item, index) => (
          <FundAccountCard
            data={item}
            key={index}
            userData={userData}
            mutateAllFundAccount={mutateAllFundAccount}
          />
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
      ></Grid>
    </Card>
  );
};

export default SavedPaymentsCard;
