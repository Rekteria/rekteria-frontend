import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MuiContainer from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { getAccount } from "../../../helpers/Account";
import { serverStatus } from "../../../actions/OnlineActions";
import useMedia from "../../../Hooks/useMedia";

import LogoImg from "../../../assets/img/logo.png";
import ChainImg from "../../../assets/img/chain.gif";

import Navbar from "../Navbar";
import Topbar from "../Topbar";
import Paper from "../Paper";
import Footer from "../Footer";

import AccountWidget from "../Widgets/AccountWidget";
import ComingEventsWidget from "../Widgets/ComingEventsWidget";
import BuyCharacterWidget from "../Widgets/BuyCharacterWidget";
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    // width: "40vw",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  chains: {
    width: "100%",
    height: 30,
    background: [
      [`url(${ChainImg})`, "1% 0", "repeat-y"],
      [`url(${ChainImg})`, "99% 0", "repeat-y"],
    ],
  },
  main: {
    marginTop: theme.spacing(4)
  },
}));

const Container = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const account = getAccount();
  const { pathname } = useLocation("");
  const [, setMobileMenu] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState("");

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  React.useEffect(() => {
    dispatch(serverStatus()).then(({ payload }) => {
      setCurrentStatus(payload.data);
    });
  }, [dispatch]);

  return (
    <MuiContainer className={classes.root}>
      <header className={classes.header}>
        <img src={LogoImg} alt="logo" className={classes.logo} />
        <Navbar />
        <div id="chain-bg" className={classes.chains} />
        <Topbar currentStatus={currentStatus} />
      </header>

      <main className={classes.main}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
          <Grid item xs={12} md={3}>
            <AccountWidget account={account} />
          </Grid>
        </Grid>
      </main>

      <footer></footer>
    </MuiContainer>
  );
};

export default Container;
