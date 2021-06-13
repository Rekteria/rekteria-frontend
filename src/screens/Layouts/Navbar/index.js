import React from "react";
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";

import { Link as RouterLink } from "react-router-dom";

import SmallLogo from "../../../assets/img/logo_small.png";
import NavbarBackground from "../../../assets/img/navbar_bg.png";
import NavbarOrnament from "../../../assets/img/navbar_ornament_v2.png";
import { playerGetCharacter } from '../../../actions/PlayerActions';
import { getAccount } from '../../../helpers/Account';
import NavbarMenu from "./NavbarMenu";
import NavbarButton from "./NavbarButton";
import DrawerMenu from "./DrawerMenu";
import DrawerButton from "./DrawerButton";
import Search from "./Search"

const useStyles = makeStyles((theme) => ({
  root: {},
  navbar: {
    borderRadius: 5,
    backgroundColor: "transparent",
    background: [
      [`url(${NavbarOrnament})`,"left -36px top -36px", "no-repeat"],
      [`url(${NavbarOrnament})`,"left -36px bottom -36px", "no-repeat"],
      [`url(${NavbarOrnament})`,"right -36px top -36px", "no-repeat"],
      [`url(${NavbarOrnament})`,"right -36px bottom -36px", "no-repeat"],
      [`url(${NavbarBackground})`,"left top", "repeat-x"],
      ["linear-gradient(#216669, #144144)","center center", "repeat"]
    ]
  },
  logo: {
    width: 65,
    height: 65,
  },
  navbarSearch: {
    maxWidth: 250
  },
  drawerMenuButton: {
    color: 'white'
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.menu.color,
  },
  drawerRoot: {
    width: "70vw",
    backgroundColor: theme.palette.background.menu.color,
  },
  drawerList: {
    width: "100%",
    backgroundColor: theme.palette.background.menu.color,
  },
  drawerSearch: {
    margin: theme.spacing(2,2),
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const account = getAccount();
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchName, setSearchName] = React.useState('');

  const searchOnChange = (e) => setSearchName(e.target.value)
  const onSearchSubmitHandler = (e) => {
    e.preventDefault();
    if (searchName) {
      dispatch(playerGetCharacter(searchName))
        .then(({ payload }) => {
          const name = payload.data.data.rows[0].name
          console.log(`INFO: Character was found - ${name}`)
          history.push(`/character/${name}`);
        })
        .catch((err) => {
          const { data } = err.response;
          history.push({
            pathname: '/PageSearch',
            customNameData: { error: data.message, name: searchName },
          });
        });
    }
  }

  // Mobile Drawer
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerIsOpen(open);
  };
  // Mobile Drawer End

  const buttons = {
    home: { label: "Home", to: "/" },
    forum: { label: "Forum", to: "/forum" },
  };

  const accountMenu = {
    label: "Account",
    options: [
      (account ? {
        label: "My Account", to: "/account"
      } : {
        label: "Create Account", to: "/sign-up"
      }),
      { label: "Accound Lost?", to: "/forgot" },
      { label: "Download Client", to: "/downloads" },
    ],
  };

  const communityMenu = {
    label: "Community",
    options: [
      { label: "Who is online?", to: "/online" },
      { label: "Character Bazar", to: "/bazar" },
      { label: "Helpdesk", to: "#" },
      { label: "Deaths", to: "/deaths" },
      { label: "Guilds", to: "/guilds" },
    ],
  };

  const statisticsMenu = {
    label: "Statistics",
    options: [
      { label: "Highscores", to: "/highscores" },
      { label: "Killers", to: "/killers" },
    ],
  };
  const libraryMenu = {
    label: "Library",
    options: [
      { label: "Server Info", to: "/info" },
      { label: "Support", to: "/support" },
      { label: "Houses", to: "/houses" },
      { label: "Spells", to: "/spells" },
      { label: "Changelog", to: "#" },
    ],
  };

  const shopMenu = {
    label: "Shop",
    options: [
      { label: "Buy Potions", to: "#" },
      { label: "Shop Offers", to: "#" },
      { label: "Character Auction", to: "#" },
    ],
  };

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        {/* Desktop Navbar */}
        <RouterLink to="/">
          <img
            src={SmallLogo}
            alt="rekteria logo"
            loading="lazy"
          />
        </RouterLink>

        <Hidden smDown>
          <NavbarButton {...buttons.home} />
          <NavbarButton {...buttons.forum} />
          <NavbarMenu {...accountMenu} />
          <NavbarMenu {...communityMenu} />
          <NavbarMenu {...statisticsMenu} />
          <NavbarMenu {...libraryMenu} />
          <NavbarMenu {...shopMenu} />
          <div style={{flex: 1}}/>
          <Search
            value={searchName}
            onChange={searchOnChange}
            onSubmit={onSearchSubmitHandler}
            className={classes.navbarSearch}
          />
        </Hidden>

        {/* Mobile Drawer */}
        <Hidden mdUp>
          <div style={{flex: 1}}/>
          <IconButton
            disableRipple
            onClick={toggleDrawer(true)}
            className={classes.drawerMenuButton}
            aria-label="menu">
              <MenuIcon fontSize="large" />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerIsOpen}
            onClose={toggleDrawer(false)}
            classes={{paper: classes.drawerPaper}}>

            <div className={classes.drawerRoot} role="presentation">
              <List component="nav" className={classes.drawerList}>
                <DrawerButton setDrawerIsOpen={setDrawerIsOpen} {...buttons.home} />
                <DrawerButton setDrawerIsOpen={setDrawerIsOpen} {...buttons.forum} />
                <DrawerMenu setDrawerIsOpen={setDrawerIsOpen} {...accountMenu} />
                <DrawerMenu setDrawerIsOpen={setDrawerIsOpen} {...communityMenu} />
                <DrawerMenu setDrawerIsOpen={setDrawerIsOpen} {...statisticsMenu} />
                <DrawerMenu setDrawerIsOpen={setDrawerIsOpen} {...libraryMenu} />
                <DrawerMenu setDrawerIsOpen={setDrawerIsOpen} {...shopMenu} />
                <Search
                  value={searchName}
                  onChange={searchOnChange}
                  onSubmit={onSearchSubmitHandler}
                  className={classes.drawerSearch}
                />
              </List>
            </div>
          </Drawer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
