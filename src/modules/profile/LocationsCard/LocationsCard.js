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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddLocationDialog from "src/components/profile/AddLocationDialog";
import EditLocationDialog from "src/components/profile/EditLocationDialog";
import { COLORS } from "src/configs/colors";
import { getCreatorLocations } from "src/services/creatorRequests";

const LocationsCard = ({}) => {
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState({ show: false, data: null });
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    getAllLocations();
  }, []);

  const getAllLocations = async () => {
    try {
      const res = await getCreatorLocations();
      setLocationData(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="card" elevation={5}>
      <EditLocationDialog
        open={showEditLocation.show}
        data={showEditLocation.data}
        onClose={() => setShowEditLocation({ show: false, data: null })}
      />

      <AddLocationDialog open={showAddLocation} onClose={() => setShowAddLocation(false)} />
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1" className="primary-title">
          Locations :
        </Typography>
        <Button
          onClick={() => setShowAddLocation(true)}
          color="success"
          variant="contained"
          size="small"
          sx={{
            background: "-webkit-linear-gradient(30deg,#4647da,#3ad57c)",
            color: "white",
          }}
        >
          <Add fontSize="small" /> ADD LOCATION
        </Button>
      </Box>
      <Grid container>
        {locationData.map((item, index) => (
          <Grid
            maxWidth={"400px"}
            container
            display="flex"
            justifyContent="space-between"
            direction="row"
            sx={{ p: 1 }}
            key={index}
          >
            <Grid item flexDirection="row">
              <Box
                style={{ backgroundColor: "#00000090", padding: "10px 15px", borderRadius: "10px" }}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <PlaceOutlined style={{ color: "#0175f8" }} />
                <Typography
                  sx={{
                    px: 2,
                    color: "white",
                    fontSize: { xs: "12px", sm: "16px", md: "18px" },
                    mr: 1,
                  }}
                >
                  {item.city.name}, {item.city.state.name}, {item.city.state.country.name}
                </Typography>
                <Stack direction="row">
                  <IconButton
                    sx={{ mx: 1 }}
                    size="small"
                    onClick={() => setShowEditLocation({ show: true, data: item })}
                  >
                    <EditOutlined fontSize="small" style={{ color: "#0175f8" }} />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteFilled fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>
            <Grid
              item
              display="flex"
              width="100%"
              justifyContent={{ xs: "flex-end", sm: "flex-end" }}
            ></Grid>
          </Grid>
        ))}
      </Grid>
      {/* <Grid
        container
        sx={{
          width: "100%",
          justifyContent: { xs: "flex-start", sm: "center" },
          alignItems: "center",
          py: 2,
          px: 2,
        }}
      >

      </Grid> */}
    </Card>
  );
};

export default LocationsCard;
