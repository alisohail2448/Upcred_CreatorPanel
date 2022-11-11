/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Box, imageListClasses } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import useAuth from "src/adapters/authAdapters";
import LoadingModal from "./common/loading-modal";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  // paddingTop: 55,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 72,
    paddingTop: 0,
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: 55,
  },
  [theme.breakpoints.up("xs")]: {
    paddingTop: 55,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const router = useRouter();

  const { user, isLoading, isValidating, error, mutateUser, loggedOut } = useAuth();

  // useEffect(() => {
  //   if (!loggedOut) {
  //     router.replace("/login");
  //   }
  // }, [router, loggedOut]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Upcred Panel | All in one management</title>
        </Head>
        <LoadingModal />
      </>
    );
  }

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          className="dashboard-layout"
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            // height: "100vh-55px", // it should be calc(100vh - 55px )
            height: "calc(100vh - 55px )",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};
