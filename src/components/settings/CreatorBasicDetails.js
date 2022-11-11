import { Edit } from "@mui/icons-material";
import { Avatar, Box, Card, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { getInitials } from "src/utils/get-initials";
import LoadingModal from "src/components/common/loading-modal";
import { EditCreatorBasicDetails } from "./Drawer/EditCreatorDetails";

const CreatorBasicDetails = ({ userData, loading }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {loading && <LoadingModal sx={{ position: "absolute", top: 0, width: "100%" }} />}
      <Card className="card" elevation={5}>
        <EditCreatorBasicDetails
          open={isDrawerOpen}
          userData={userData}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <Box>
          <Grid container justifyContent="space-between">
            <Typography variant="h1" className="primary-title">
              Creator Details :
            </Typography>
            <Edit
              onClick={() => {
                setIsDrawerOpen(true);
              }}
              sx={{ color: "white", cursor: "pointer" }}
            />
          </Grid>
          <Grid container direction="row" alignItems="center" mt={2}>
            <Grid
              xs={12}
              sm={12}
              md={2}
              lg={2}
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              position="relative"
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: 2,
                }}
              >
                <Avatar
                  src={userData?.profile_pic}
                  sx={{
                    width: "10rem",
                    height: "10rem",
                  }}
                >
                  <Stack alignItems="center" sx={{ fontSize: "60px" }}>
                    {getInitials(userData?.name)}
                  </Stack>
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={10} md={10}>
              <Grid container justifyContent="space-between">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={5.9}
                  lg={5.9}
                  sx={{ backgroundColor: "rgb(6 14 19)", borderRadius: "10px", padding: "10px" }}
                >
                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      textAlign: "start",
                      alignItems: "center",
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      Handle
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      {userData.handle}
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      Name
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      {userData.name}
                    </Grid>
                  </Grid>

                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "column", md: "row" },
                      justifyContent: "flex-start",
                      alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      Email
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      {userData.email}
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "column", md: "row" },
                      justifyContent: "flex-start",
                      alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      Mobile
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      {userData.mobile}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  className="user-details"
                  xs={12}
                  sm={5.9}
                  lg={5.9}
                  md={5.9}
                  sx={{ backgroundColor: "rgb(6 14 19)", borderRadius: "10px", padding: "10px" }}
                >
                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      Gender
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      {userData.gender}
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      DOB
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      {userData.dob}
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "column", md: "row" },
                      justifyContent: "flex-start",
                      alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      Alternate Email
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      amit@upcred.ai
                    </Grid>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    item
                    sx={{
                      px: 0,
                      pt: 1,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "column", md: "row" },
                      justifyContent: "flex-start",
                      alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
                    }}
                  >
                    <Grid item sm={2.8} className="userdetails-key">
                      Alternate Mobile
                    </Grid>
                    <Grid item sm={0.5} className="userdetails-value">
                      :
                    </Grid>
                    <Grid item sm={8} className="userdetails-value">
                      {userData.alternate_mobile}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                sm={12}
                mt={3}
                sx={{
                  backgroundColor: "rgb(6 14 19)",
                  borderRadius: "10px",
                  padding: "0px 10px",
                }}
              >
                <Grid
                  xs={12}
                  sm={12}
                  item
                  sx={{
                    px: 0,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>
                    {userData.about ? userData.about : "Tell us something about yourself"}{" "}
                  </span>
                  {/* <TextField
                    multiline
                    maxRows={4}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        color: "white",
                        width: "100%",
                      },
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                  ></TextField> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default CreatorBasicDetails;
