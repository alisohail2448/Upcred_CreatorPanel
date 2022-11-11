import { AddOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MockApi from "src/services/mockApi";
import { useFilePicker } from "use-file-picker";
import { useSnackbar } from "notistack";
import "react-phone-input-2/lib/style.css";
import { getCreator } from "src/services/authRequests";
import useStorage from "src/hooks/useStorage";
import { useRouter } from "next/router";
import { SocialIdBox } from "src/components/common/social-id-box";
import { useCreatorAllPlatforms } from "src/adapters/creatorsAdapters";
import { filteredInactive } from "src/utils/filteredInactive";
import { AddSocialPlatfrom } from "src/components/profile/AddSocialPlatfrom";
import { getInitials } from "src/utils/get-initials";
import LoadingModal from "src/components/common/loading-modal";

const BasicProfileCard = ({}) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageUpdating, setImageUpdating] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);
  const [loading, setLoading] = useState();
  const [userData, setUserData] = useState({});
  const { token } = useStorage();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { creatorAllPlatform = [], mutate } = useCreatorAllPlatforms(userData.id);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    getLoginUser();
  }, [token]);

  const getLoginUser = async () => {
    setLoading(true);
    try {
      let user = await getCreator();
      setLoading(false);
      setUserData(user);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading && <LoadingModal sx={{ position: "absolute", top: 0, width: "100%" }} />}
      <Card className="card" elevation={5}>
        <Box>
          <Typography variant="h1" className="primary-title">
            Creator Details :
          </Typography>
          <Grid container direction="row" alignItems="center">
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
                  {/* <Grid item sm={4} xs={10}>
                  <EditableText
                    type="text"
                    value={username}
                    inputProps={{ placeholder: "username" }}
                    onSave={updateInfo}
                  />
                </Grid> */}
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
                      {userData.alternate_email}
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

              <Grid container padding="none" mt={2} alignItems="center">
                {creatorAllPlatform?.filter(filteredInactive).length < 1 && (
                  <Typography
                    color="textSecondary"
                    sx={{ fontSize: "10px", fontWeight: "500", opacity: 0.8, ml: 3 }}
                  >
                    No Linked Platform found.
                  </Typography>
                )}
                <Grid container direction="row" flexWrap="wrap" minWidth="150px">
                  {[...creatorAllPlatform]?.filter(filteredInactive).map((item, index) => (
                    <Grid item>
                      <SocialIdBox key={index} data={item} userData={userData} />
                    </Grid>
                  ))}
                  <Grid
                    sx={{
                      backgroundColor: "transparent",
                      px: 0,
                      py: 0,
                      cursor: "pointer",
                      padding: "2px",
                      transform: "scale(0.9)",
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "10%",
                        backgroundColor: "rgb(6 14 19)",
                        "&:hover": { backgroundColor: "rgb(6 14 19)" },
                      }}
                      onClick={() => {
                        setIsDrawerOpen(true);
                      }}
                    >
                      <AddOutlined sx={{ color: "white" }} />
                    </Button>
                  </Grid>
                  <AddSocialPlatfrom
                    open={isDrawerOpen}
                    userData={userData}
                    mutate={mutate}
                    setIsDrawerOpen={setIsDrawerOpen}
                    creatorAllPlatform={creatorAllPlatform}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default BasicProfileCard;
