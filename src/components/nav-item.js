/* eslint-disable react/jsx-key */
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem, Typography } from "@mui/material";

export const NavItem = (props) => {
  const { href, icon, title, isInactive, isComingSoon, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        // px: 1,
      }}
      {...others}
    >
      <NextLink href={isInactive ? "" : href} passHref>
        <Button
          component="a"
          disableRipple
          sx={{
            // background: active && "#000000",
            // borderRadius: "0 30px 30px 0",
            color: active ? "white" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            // borderLeft: active && "3px solid #3ad57c",
            justifyContent: "center",
            padding: "7px 0px",
            textAlign: "center",
            textTransform: "none",

            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.300",
            },
            "&:hover": {
              backgroundColor: "rgba(0,0,0, 0.08)",
            },
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "40px",
                height: "40px",
                lineHeight: "1rem",
                borderRadius: "40px",

                background: active && "-webkit-linear-gradient(30deg,#4647da,#3ad57c)",
                color: active && "white",

                padding: "10px",
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: active && "transparent",
                  backgroundImage: active && "linear-gradient(36deg, #4647da, transparent)",
                  backgroundColor: active && "#3ad57c",
                  WebkitBackgroundClip: active && "text",
                  WebkitTextFillColor: active && "transparent",
                }}
              >
                {title}
              </Typography>
            </Box>
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
