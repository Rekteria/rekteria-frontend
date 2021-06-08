import React from "react";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DropdownIcon from "./DropdownIcon";

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    alignSelf: "stretch",
  },
  button: {
    alignSelf: "stretch",
    height: "100%",
    paddingBottom: 3,
    borderBottomWidth: 3,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    borderRadius: 0,
    margin: spacing(0, 1),
    "&:hover,&:focus,&:active": {
      borderBottomColor: palette.primary.main,
      color: "white",
    },
  },
  buttonOpen: {
    borderBottomColor: palette.primary.main,
  },
  buttonEndIcon: {
    marginLeft: spacing(0.5),
  },
  menu: {
    backgroundColor: palette.background.menu.color,
  },
  menuItem: {
    paddingLeft: spacing(3),
    paddingRight: spacing(3),
    color: "white",
    "&:hover,&:focus,&:active": {
      backgroundColor: palette.background.menu.hover,
      color: "white",
    },
  },
}));

const NavbarMenuItem = ({ label, to, onClick }) => {
  const classes = useStyles();
  return (
    <MenuItem
      onClick={onClick}
      component={RouterLink}
      to={to}
      disableRipple
      className={classes.menuItem}
    >
      {label}
    </MenuItem>
  );
};

const NavbarMenu = ({ className, label, options }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isOpen = Boolean(anchorEl);

  return (
    <div className={clsx(classes.root, className)}>
      <Button
        className={clsx(classes.button, { [classes.buttonOpen]: isOpen })}
        classes={{
          endIcon: classes.buttonEndIcon,
        }}
        disableRipple
        aria-controls={`${label}-menu`}
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
        endIcon={<DropdownIcon isOpen={isOpen} />}
      >
        {label}
      </Button>
      <Menu
        classes={{
          paper: classes.menu,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        id={`${label}-menu`}
        getContentAnchorEl={null}
        elevation={1}
        anchorEl={anchorEl}
        keepMounted
        open={isOpen}
        onClose={handleClose}
        disableScrollLock
      >
        {options.map((option, index) => (
          <NavbarMenuItem
            key={option.label}
            to={option.to}
            onClick={handleClose}
            label={option.label}
          />
        ))}
      </Menu>
    </div>
  );
};

export default NavbarMenu;
