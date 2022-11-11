import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { updateAdmin } from "src/services/authRequests";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

export const AccountProfileDetails = (props) => {
  const user = props.user;

  const [updating, setUpdating] = useState(false);

  const [values, setValues] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.mobile,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submitUpdate = async () => {
    setUpdating(true);
    try {
      await updateAdmin({ name: values.name });
      props.mutateUser();
      setUpdating(false);
    } catch (error) {
      setUpdating(false);
    }
  };

  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 3,
        backgroundColor: "neutral.0",
        border: "1px solid #a044ff20",
      }}
      elevation={20}
    >
      {updating && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#ffffff90",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <CardHeader
        subheader="The information can be edited"
        title="Profile"
        sx={{
          color: "primary.main",
        }}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label="name"
              name="name"
              onChange={handleChange}
              required
              value={values.name}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={values.email}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              onChange={handleChange}
              type="number"
              value={values.phone}
              variant="outlined"
            />
          </Grid>

          {/*<Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
                </Grid>*/}
        </Grid>
      </CardContent>
      <Divider />
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
          type="submit"
          onClick={submitUpdate}
          style={{
            borderRadius: "40px",
            border: "0.5px solid #a044ff20",
            boxShadow: "2px 2px 5px #12121260",
            width: "150px",
            background: "-webkit-linear-gradient(30deg,#fe8c00,#f83600)",
            py: 1.1,
          }}
        >
          Save details
        </Button>
      </Box>
    </Card>
  );
};
