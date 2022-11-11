/* eslint-disable react/jsx-key */
import { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import { COLORS } from "src/configs/colors";

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form {...props}>
      <Card
        sx={{
          width: "100%",

          background: COLORS.cardBackground,
          position: "relative",
        }}
        elevation={5}
      >
        <CardHeader
          sx={{
            padding: "10px 20px",
            "& .MuiCardHeader-title": {
              color: "white",
            },
            "& .MuiCardHeader-content": {
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            },
          }}
          subheader="Update password"
          title="Password"
        />
        <CardContent sx={{ padding: "0px 20px" }}>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "rgb(6 14 19)",
              "&:hover": { backgroundColor: "rgb(6 14 19)" },
            }}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
