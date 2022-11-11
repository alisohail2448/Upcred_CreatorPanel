import { CloseCircleFilled } from "@ant-design/icons";
import { Check, Close } from "@mui/icons-material";
import {
  Button,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { formatFollowerCount } from "src/utils/formatFollowerCount";
import EditableText from "../EditableText";

export const currencies = [
  {
    value: "USD",
    label: "$ USD",
  },
  {
    value: "EUR",
    label: "€ EUR",
  },
  ,
  {
    value: "INR",
    label: "₹ INR",
  },
  {
    value: "DHS",
    label: "د.إ DHS",
  },
];

const PricingCard = ({ updateInfo, label,setDeleteSocialComponent }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [price, setPrice] = useState("2000");
  const [currency, setCurrency] = useState("INR");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid
      item
      sx={{
        mr: 1,
        mb: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Chip
        style={{ padding: "15px 10px", color: "white" }}
        variant="outlined"
        label={
          <Typography sx={{ color: "white", fontSize: "0.8rem" }}>
            {label} - {currencies.find((i) => i?.value === currency)?.label?.[0]}
            {formatFollowerCount(price)}
          </Typography>
        }
        color="info"
        size="small"
        sx={{ borderRadius: 0.5, mr: 1, mb: 1 }}
        onClick={handleClick}
        onDelete={() => {
          setDeleteSocialComponent(true)
        }}
      />
      {/* <Button
        size="small"
        variant="outlined"
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          // borderRadius: 0.5,
          // paddingX: 1,
        }}
        className="standard-button"
      >
        <Typography sx={{ color: "white", fontSize: "0.8rem" }}>
          {label} - {currencies.find((i) => i?.value === currency)?.label?.[0]}
          {formatFollowerCount(price)}
        </Typography>
      </Button> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{ sx: { background: "#000000", borderRadius: 0.5, padding: 1 } }}
      >
        <Stack direction="row" justifyContent={"center"} alignItems="center">
          <FormLabel
            sx={{
              fontSize: "14px",
              paddingRight: 1,
              fontWeight: "500",
              color: "#e1e1e1aa",
            }}
          >
            {label}:
          </FormLabel>
          <TextField
            type="number"
            color="primary"
            size="small"
            fullWidth
            name="Budget"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            inputProps={{
              style: {
                border: "none",
              },
            }}
            InputProps={{
              sx: {
                // width: "250px",
                padding: "0px",
                border: "none",
                color: "white",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <FormControl>
                    <Select
                      size="small"
                      MenuProps={{
                        MenuListProps: {
                          style: {
                            backgroundColor: "#484848",
                            color: "white",
                          },
                        },
                      }}
                      sx={{
                        color: "white",
                        height: "40px",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={currency}
                      onChange={handleChangeCurrency}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={0.5} marginLeft={0.5}>
            <IconButton
              onClick={() => {
                handleClose();
                updateInfo();
              }}
              sx={{ width: "35px", height: "35px", borderRadius: 0, background: "#f0f0f0" }}
            >
              <Check sx={{ fontSize: "15px", color: "green" }} />
            </IconButton>
            <IconButton
              onClick={handleClose}
              sx={{ width: "35px", height: "35px", borderRadius: 0, background: "#f0f0f0" }}
            >
              <Close sx={{ fontSize: "15px", color: "red" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Popover>
    </Grid>
  );
};

export default PricingCard;
