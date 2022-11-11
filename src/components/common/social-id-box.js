import { Typography, Button, Grid } from "@mui/material";
import React from "react";
import { formatFollowerCount } from "src/utils/formatFollowerCount";
import getSocialIcon from "./get-social-icon";
import { getSocialProfileLink } from "../../utils/getSocialProfileLink";

export const SocialIdBox = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <>
      <Grid
        container
        component="a"
        href={getSocialProfileLink({
          platform: data.platform.name,
          socialHandle: data.social_handle,
        })}
        target="_blank"
        sx={{
          borderRadius: 0.5,
          backgroundColor: "transparent",
          padding: "4px",
          transform: "scale(0.99)",
          textDecoration: "none",
        }}
      >
        <Button
          variant="contained"
          size="small"
          className="standard-button"
          sx={{ backgroundColor: "rgb(6 14 19)", "&:hover": { backgroundColor: "rgb(6 14 19)" } }}
        >
          {getSocialIcon(data.platform?.name)}
          <Typography sx={{ ml: 1 }}>{data?.social_handle}</Typography>
          <Typography sx={{ fontSize: "11px", fontWeight: "700", pl: 1, color: "white" }}>
            {formatFollowerCount(data.followers) || "--"}
          </Typography>
        </Button>
      </Grid>
    </>
  );
};
