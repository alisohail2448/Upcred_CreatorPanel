import {
  CheckCircleOutlined,
  DeleteFilled,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import {
  Add,
  AddBox,
  CheckCircleOutline,
  CheckCircleOutlineOutlined,
  EditOutlined,
  Facebook,
  FacebookOutlined,
  Instagram,
  PlaceOutlined,
  YouTube,
} from "@mui/icons-material";
import {
  Card,
  Grid,
  Box,
  Stack,
  Typography,
  Link,
  Button,
  Tooltip,
  Chip,
  IconButton,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import AddAddressDialog from "src/components/profile/AddAddressDialog";
import EditAddressDialog from "src/components/profile/EditAddressDialog";
import DeleteAddressDialog from "src/components/socialDialog/DeleteAddressDialog";
import { COLORS } from "src/configs/colors";
import { getCreatorAllAddresses } from "src/services/creatorRequests";
const AddressCard = ({}) => {
  const [showAddPlatform, setShowAddPlatform] = useState(false);
  const [showEditPlatform, setShowEditPlatform] = useState({ show: false, data: null });
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [addressesData, setAddressesData] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    getCreatorAddresses();
  }, [showAddPlatform, deleteAddress]);
  const getCreatorAddresses = async () => {
    try {
      const res = await getCreatorAllAddresses();
      setAddressesData(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (addressId) => {
    setDeleteAddress(true);
    setId(addressId);
    console.log(id);
  };
  return (
    <Card className="card" elevation={5} sx={{ height: "250px", marginBottom: "15px" }}>
      <AddAddressDialog open={showAddPlatform} onClose={() => setShowAddPlatform(false)} />
      <EditAddressDialog
        data={showEditPlatform.data}
        open={showEditPlatform.show}
        onClose={() => setShowEditPlatform({ show: false, data: null })}
      />
      <DeleteAddressDialog open={deleteAddress} id={id} onClose={() => setDeleteAddress(false)} />
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1" className="primary-title">
          Addresses :
        </Typography>
        <Button
          onClick={() => setShowAddPlatform(true)}
          color="success"
          variant="contained"
          size="small"
          sx={{
            background: "-webkit-linear-gradient(30deg,#4647da,#3ad57c)",
            color: "white",
          }}
        >
          <Add fontSize="small" /> ADD NEW ADDRESS
        </Button>
      </Box>
      <Grid sx={{ px: 2, py: 2, display: "flex", flexDirection: "row" }}>
        {addressesData.slice(0, 2).map((item, index) => (
          <Grid
            key={index}
            maxWidth={"400px"}
            container
            display="flex"
            justifyContent="space-between"
            direction="row"
            sx={{ p: 1, mx: 1, background: "#00000090", borderRadius: 1.5 }}
          >
            <Grid item flexDirection="row">
              <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                <PlaceOutlined color="secondary" style={{ color: "#0175f8" }} />
                <Stack>
                  <Typography
                    sx={{ px: 2, color: "white", fontSize: { xs: "12px", sm: "14px", md: "16px" } }}
                  >
                    {item.line_1} {item.line_2}
                  </Typography>
                  <Typography
                    sx={{
                      px: 2,
                      color: "#e1e1e190",
                      fontSize: { xs: "12px", sm: "14px", md: "16px" },
                    }}
                  >
                    {item.city} {item.state} {item.country}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid
              item
              display="flex"
              width="100%"
              justifyContent={{ xs: "space-between", sm: "flex-end" }}
            >
              <Box>
                <FormControlLabel
                  sx={{ color: "#e1e1e1" }}
                  componentsProps={{ typography: { fontSize: "14px" } }}
                  control={<Checkbox style={{ color: "#0175f8" }} defaultChecked size="small" />}
                  label="Barter"
                />
              </Box>
              <Stack direction="row">
                <IconButton
                  style={{ color: "#0175f8" }}
                  sx={{ mx: 1 }}
                  onClick={() => setShowEditPlatform({ show: true, data: item })}
                >
                  <EditOutlined />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  <DeleteFilled />
                </IconButton>
              </Stack>
            </Grid>
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
      ></Grid>
    </Card>
  );
};
export default AddressCard;
