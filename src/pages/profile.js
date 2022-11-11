import Head from "next/head";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import {
  BasicProfileCard,
   BrandPortfolioCard,
  CreatorAttributesCard,
  DocumentsCard,
  LocationsCard,
  PersonalDetailsCard,
  SavedPaymentsCard,
  PlatformContentCard,
} from "src/modules/profile";
import { getCreator } from "src/services/authRequests";
import { useEffect } from "react";
import useStorage from "src/hooks/useStorage";
import { useRouter } from "next/router";
import AddressCard from "src/components/settings/AddressCard";

const Profile = () => {
  const router = useRouter();
  const {token} = useStorage();

  useEffect(() => {
    if(!token){
      router.push('/login')
    }
    // getLoginUser();
  }, [])


  // const getLoginUser  = async() =>{
  //   let user = await getCreator()
  //   // console.log(user);
  //   setUserData(user);
  //   // console.log(userData);
  // }


  return (
    <>
      <Head>
        <title>Profile | Manage Creator Profile</title>
      </Head>
      <Box component="main" className="main">
        <Container maxWidth={true} sx={{ p: "0 !important" }}>
          <Grid container className="layout-container">
            <BasicProfileCard />
            <PlatformContentCard />
            <AddressCard />
            <LocationsCard />
            <CreatorAttributesCard />
            <BrandPortfolioCard />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Profile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profile;
