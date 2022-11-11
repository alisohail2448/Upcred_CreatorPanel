import Head from "next/head";
import Router, { useRouter } from "next/router";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect } from "react";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>UPCRED Creator Panel | We Power Creator Economy™ across the Globe</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          pl: 2,
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h5" sx={{ mb: 2, color: "white" }}>
            🙏 Welcome !
          </Typography>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
