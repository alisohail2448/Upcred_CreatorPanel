/* eslint-disable react/jsx-key */
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { logout } from "src/services/authRequests";
import useAuth from "src/adapters/authAdapters";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  background: "#191c24",
  boxShadow: theme.shadows[0],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { push } = useRouter();
  const { user, mutateUser } = useAuth();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    // const data = await signOut({ redirect: false, callbackUrl: "/login" });
    localStorage.clear();
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
    push('/login');
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 72,
          },
          width: {
            lg: "calc(100% - 72px)",
          },
        }}
        {...other}
        className="dashboard-navbar"
      >
        <Toolbar
          variant="dense"
          disableGutters
          sx={{
            minHeight: 50,
            maxHeight: 55,
            left: 0,
            px: 2,
            py: 1,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          {false && (
            <Tooltip title="Search">
              <IconButton sx={{ ml: 1 }}>
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="secondary" variant="dot">
                <BellIcon fontSize="small" sx={{ color: "white" }} />
              </Badge>
            </IconButton>
          </Tooltip>
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
            src={user?.profile_pic}
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
                handleSignOut();
                // router.push("/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
