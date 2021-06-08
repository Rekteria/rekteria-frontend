import React from "react";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    color: "white",
    "&:hover,&:focus,&:active": {
      backgroundColor: theme.palette.background.menu.hover,
    },
  },
}));

export default function DrawerMenu({ setDrawerIsOpen, label, options }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    setDrawerIsOpen(true);
  };

  return (
    <>
      <ListItem
        className={classes.button}
        onClick={handleClick}
        button
        disableRipple
      >
        <ListItemText primary={label} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {options.map((option, index) => (
            <ListItem
              key={option.label}
              className={clsx(classes.nested, classes.button)}
              component={RouterLink}
              to={option.to}
              button
              onClick={() => setDrawerIsOpen(false)}
            >
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
