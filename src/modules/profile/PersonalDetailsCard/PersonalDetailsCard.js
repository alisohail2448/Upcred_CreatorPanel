import {
  CheckCircleOutlined,
  DeleteFilled,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import {
  Add,
  AddBox,
  CheckCircleOutline,
  CheckCircleOutlineOutlined,
  EditOutlined,
  Facebook,
  FacebookOutlined,
  Instagram,
  PlaceOutlined,
  YouTube,
} from "@mui/icons-material";
import {
  Card,
  Grid,
  Box,
  Stack,
  Typography,
  Link,
  Button,
  Tooltip,
  Chip,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import EditableText from "src/components/EditableText";
import { COLORS } from "src/configs/colors";

const PersonalDetailsCard = ({}) => {
  return (
    <Card className="card" elevation={5}>
      <Grid container>
        <Grid
          item
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          sm={6}
        >
          <Typography variant="h1" className="primary-title">
            Gender :
          </Typography>

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                sx={{ color: "white", m: 0, mr: 1 }}
                componentsProps={{ typography: { sx: { fontSize: "14px" } } }}
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />

              <FormControlLabel
                sx={{ color: "white" }}
                componentsProps={{ typography: { sx: { fontSize: "14px" } } }}
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                sx={{ color: "white" }}
                componentsProps={{ typography: { sx: { fontSize: "14px" } } }}
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

       <Box style={{display:'flex', justifyContent:'space-between', width:'100%'}} >
       <Grid
          xs={12}
          sm={8}
          item
          sx={{ px: 0, display: "flex", justifyContent: "flex-start", alignItems: "center" }}
        >
          <Typography sx={{ px: 1, color: "#e1e1e1", fontSize: "12px" }}>AGE :</Typography>

          <EditableText
            type="tel"
            value={"Not Set"}
            inputProps={{ placeholder: "email" }}
            onSave={(value) => console.log(value)}
            style={{color:'#0175f8'}}
          />
        </Grid>
        <Grid 
          xs={12}
          sm={12}
          item
          sx={{ px: 0, display: "flex", justifyContent: "flex-start", alignItems: "center" }}
        >
          <Typography sx={{ px: 1, color: "#e1e1e1", fontSize: "12px" }}>About :</Typography>
          <EditableText
          style={{color:'#0175f8'}}
            type="tel"
            value={"Not Set"}
            inputProps={{
              placeholder: "email",
              multiline: true,
            }}
            onSave={(value) => console.log(value)}
          />
        </Grid>
       </Box>

    </Card>
  );
};

export default PersonalDetailsCard;
