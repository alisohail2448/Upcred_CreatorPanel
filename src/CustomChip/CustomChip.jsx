import React from "react";
import Chip from "@mui/material";
import { makeStyles } from '@mui/styles';
import { emphasize } from "@material-ui/core/styles/colorManipulator";

const useChipStyles = makeStyles({
  chip: {
    color: ({ color }) => color,
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    "&:hover, &:focus": {
      backgroundColor: ({ hoverBackgroundColor, backgroundColor }) =>
        hoverBackgroundColor
          ? hoverBackgroundColor
          : emphasize(backgroundColor, 0.08)
    },
    "&:active": {
      backgroundColor: ({ hoverBackgroundColor, backgroundColor }) =>
        emphasize(
          hoverBackgroundColor ? hoverBackgroundColor : backgroundColor,
          0.12
        )
    }
  }
});
const CustomChip = ({
  color,
  backgroundColor,
  hoverBackgroundColor,
  ...rest
}) => {
  const classes = useChipStyles({
    color,
    backgroundColor,
    hoverBackgroundColor
  });
  return <Chip className={classes.chip} {...rest} />;
};
export default CustomChip;
