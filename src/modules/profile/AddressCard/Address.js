import { DeleteFilled } from "@ant-design/icons";
import { Add, EditOutlined, PlaceOutlined } from "@mui/icons-material";
import { Card, Grid, Box, Stack, Typography, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useCreatorAllAddresses } from "src/adapters/creatorsAdapters";
import LoadingModal from "src/components/common/loading-modal";
import AddAddressDialog from "src/components/profile/AddAddressDialog";
import EditAddressDialog from "src/components/profile/EditAddressDialog";
import AddressCard from "src/components/settings/AddressCard";
import { AddCreatorAddress } from "src/components/settings/Drawer/AddCreatorAddress";
import DeleteAddressDialog from "src/components/socialDialog/DeleteAddressDialog";
import CenteredColumn from "src/layouts/centered-column";
import { filteredInactive } from "src/utils/filteredInactive";

const Address = ({ userData }) => {
  const [showEditPlatform, setShowEditPlatform] = useState({ show: false, data: null });
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { creatorAllAddress, mutate, loading } = useCreatorAllAddresses(userData.id);

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Card className="card" elevation={5}>
      <AddCreatorAddress
        handleClose={handleClose}
        userData={userData}
        open={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <EditAddressDialog
        data={showEditPlatform.data}
        open={showEditPlatform.show}
        onClose={() => setShowEditPlatform({ show: false, data: null })}
      />
      <DeleteAddressDialog
        creatorAllAddress={creatorAllAddress}
        open={deleteAddress}
        onClose={() => setDeleteAddress(false)}
        userData={userData}
      />
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        {loading && <LoadingModal sx={{ position: "absolute", top: 0, width: "100%" }} />}
        <Typography variant="h1" className="primary-title">
          Addresses :
        </Typography>
        <Button
          onClick={() => setIsDrawerOpen(true)}
          color="success"
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "rgb(6 14 19)",
          }}
        >
          <Add fontSize="small" />
        </Button>
      </Box>
      <Grid container sx={{ px: 2, py: 2 }}>
        <Grid container sx={{ px: 2 }}>
          {creatorAllAddress?.length === 0 && (
            <CenteredColumn sx={{ minHeight: "200px" }}>
              <Typography color="white">No address Found</Typography>
            </CenteredColumn>
          )}
          {creatorAllAddress?.map((item, index) => (
            <AddressCard
              data={item}
              key={index}
              userData={userData}
              setDeleteAddress={setDeleteAddress}
            />
          ))}
        </Grid>
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

export default Address;
