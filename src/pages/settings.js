import { SettingsPassword } from "../components/settings/settings-password";
import { Box, Container, Grid, Tabs, Tab } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { Address, DocumentsCard, LocationsCard, SavedPaymentsCard } from "src/modules/profile";
import { useEffect, useState } from "react";
import useStorage from "src/hooks/useStorage";
import { useRouter } from "next/router";
import CreatorBasicDetails from "src/components/settings/CreatorBasicDetails";
import { getCreator } from "src/services/authRequests";

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState();
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const { token } = useStorage();

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    getLoginUser();
  }, []);

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
      <Box component="main" className="main">
        <Container maxWidth={true} sx={{ p: "0 !important" }}>
          <Grid container className="layout-container">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Box>
                  <Tabs value={tabIndex} onChange={handleTabChange}>
                    <Tab label="Creator Details" />
                    <Tab label="Address" />
                    <Tab label="Location" />
                    <Tab label="Payment" />
                    <Tab label="Document" />
                    <Tab label="Reset Password" />
                  </Tabs>
                </Box>
                <Box sx={{ padding: 2 }}>
                  {tabIndex === 0 && (
                    <Box>
                      <CreatorBasicDetails userData={userData} loading={loading} />
                    </Box>
                  )}
                  {tabIndex === 1 && (
                    <Box>
                      <Address userData={userData} />
                    </Box>
                  )}
                  {tabIndex === 2 && (
                    <Box>
                      <LocationsCard />
                    </Box>
                  )}
                  {tabIndex === 3 && (
                    <Box>
                      <SavedPaymentsCard userData={userData} />
                    </Box>
                  )}
                  {tabIndex === 4 && (
                    <Box>
                      <DocumentsCard />
                    </Box>
                  )}
                  {tabIndex === 5 && (
                    <Box>
                      <SettingsPassword />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
