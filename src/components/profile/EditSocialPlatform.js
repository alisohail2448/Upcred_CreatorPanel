import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { CloseOutlined, Edit, Group } from "@mui/icons-material";
import {
  Typography,
  CardActions,
  Card,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { deleteCreatorPlatform } from "src/services/authRequests";
import { formatFollowerCount } from "src/utils/formatFollowerCount";
import { getSocialProfileLink } from "../../utils/getSocialProfileLink";
import getSocialIcon from "../common/get-social-icon";

export const EditSocialPlatform = ({
  data,
  submitting,
  setSubmitting,
  userData,
  mutate,
  handleClose,
}) => {
  if (!data) {
    return null;
  }
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await deleteCreatorPlatform(userData.id, data?.id);
      setSubmitting(false);
      mutate();
      // handleClose();
      enqueueSnackbar("Platform deleted successfully", { variant: "success" });
    } catch (error) {
      setSubmitting(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
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
          // px: 0,
          // py: 0,
          // cursor: "pointer",
          padding: "4px",
          transform: "scale(0.99)",
          textDecoration: "none",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "rgb(6 14 19)",
            "&:hover": { backgroundColor: "rgb(6 14 19)" },
          }}
        >
          {getSocialIcon(data.platform?.name)}
          <Typography sx={{ ml: 1 }}>{data.social_handle}</Typography>
          <Typography sx={{ fontSize: "11px", fontWeight: "700", pl: 1, color: "white" }}>
            {formatFollowerCount(data.followers) || "--"}
          </Typography>
          <CloseOutlined onClick={handleDelete} sx={{ color: "white", fontSize: "14px", ml: 2 }} />
        </Button>
      </Grid>
    </>
  );
};
