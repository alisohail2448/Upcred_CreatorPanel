/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Menu,
  IconButton,
  Tooltip,
  Typography,
  Badge,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Bell as BellIcon } from "../icons/bell";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { User as UserIcon } from "../icons/user";
import { Users as UsersIcon } from "../icons/users";
import { Logo } from "./logo";
import header from "../styles/header.module.css";
import { NavItem } from "./nav-item";
import useStorage from "src/hooks/useStorage";
import { logout } from "src/services/authRequests";

export const DashboardSidebar = (props) => {
  const { role } = useStorage();
  const isSuperAdmin = role === "SUPER_ADMIN";

  const items = [
    {
      href: "/",
      icon: <ChartBarIcon fontSize="small" />,
      title: "Overview",
      isInactive: true,
      isComingSoon: true,
    },
    {
      href: "/campaigns",
      icon: <UsersIcon fontSize="small" />,
      title: "Campaigns",
      isInactive: true,
      isComingSoon: true,
    },
    {
      href: "/profile",
      icon: <UserIcon fontSize="small" />,
      title: "Profile",
    },

    {
      href: "/settings",
      icon: <CogIcon fontSize="small" />,
      title: "Settings",
    },
  ];

  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "auto",
          height: "97vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "5vh",
            flexDirection: "column",
            alignItems: "center",
            padding: "0px",
          }}
        >
          <Box>
            <NextLink href="/" passHref>
              <a>
                <img src="/assets/icons/upcred_logo.png" className={header.logo} />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1, width: "70px" }}>
          {items
            .filter((i) => !i.isDisabled)
            .map((item) => (
              <NavItem
                key={item.title}
                icon={item.icon}
                isComingSoon={item.isComingSoon}
                isInactive={item.isInactive}
                href={item.href}
                // title={item.title}
              />
            ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748", mb: 2 }} />
        <Box
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="mobile-sidebar"
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Tooltip title="Notifications">
                <IconButton sx={{ ml: 1 }}>
                  <Badge badgeContent={4} color="secondary" variant="dot">
                    <BellIcon fontSize="small" sx={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  ml: 1,
                  cursor: "pointer",
                  backgroundColor: "black",
                  color: "orange",
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                // src={user?.profile_pic}
              >
                <UserCircleIcon fontSize="small" />
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => router.push("/account")}>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    // mutateUser();
                    // handleSignOut();
                    router.push("/login");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Tooltip title="Need Help? Contact support team ! ">
              <Box>
                <Box>
                  <IconButton sx={{ padding: "0px", my: 2 }}>
                    <Help sx={{ color: "#D1D5DB", fontSize: "20px" }} />
                  </IconButton>
                </Box>
              </Box>
            </Tooltip>
          </Box>
        </Box> */}
      </Box>
    </div>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            backgroundColor: "#191c24",
            color: "#FFFFFF",
            width: "70px",
            top: 0,
            left: 0,
            bottom: 0,
            height: "100vh",
            borderRight: "1px solid black",
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#191c24",
          color: "#FFFFFF",
          width: "70px",
          top: 0,
          left: 0,
          bottom: 0,
          overflowY: "auto",
          overflowX: "hidden",
          height: "100vh",
          borderRight: "1px solid black",
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
