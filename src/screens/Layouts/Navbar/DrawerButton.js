import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    "&:hover,&:focus,&:active": {
      backgroundColor: theme.palette.background.menu.hover,
    },
  },
}));

export default function DrawerButton({ setDrawerIsOpen, label, to }) {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.button}
      disableRipple
      onClick={() => setDrawerIsOpen(false)}
      component={RouterLink}
      to={to}
      button
    >
      <ListItemText primary={label} />
    </ListItem>
  );
}
