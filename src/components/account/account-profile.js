import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

import ImageCropper from "../common/image-cropper";

export const AccountProfile = (props) => {
  const user = props.user;
  const [updating, setUpdating] = useState(false);
  const [values, setValues] = useState({
    profile_pic: user?.profile_pic,
  });

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={props.profilePicture ? props.profilePicture : props.user?.profile_pic}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
              background: "-webkit-linear-gradient(30deg,#fe8c00,#f83600)",
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {props.user?.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {props.user?.email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {props.user?.mobile}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <ImageCropper
          // submitUpdate={submitUpdate}
          open={props.showImageCropper}
          image={props.profilePicture}
          handleClose={() => {
            props.setShowImageCropper(false);
          }}
          handleCancel={props.handleCancel}
          getCroppedResult={(imgData) => {
            props.getFinalImage(imgData);
          }}
          actionButtonLabel="Save"
        />
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => {
            props.openFileSelector();
          }}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};
