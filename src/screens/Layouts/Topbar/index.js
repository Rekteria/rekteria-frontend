import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import GetAppIcon from '@material-ui/icons/GetApp';

import IconCast from "../../../assets/img/icon-cast.png";
import IconStreamers from "../../../assets/img/icon-streamers.png";
import IconViwers from "../../../assets/img/icon-viewers.png";
import IconYoutubeFull from "../../../assets/img/icon-youtube.png";
import IconYoutube from "../../../assets/img/icon-youtube-logo.png";
import TopbarBg from "../../../assets/img/topbar_bg.png";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "transparent",
      background: [
        [`url(${TopbarBg})`, "center top", "repeat-x"],
        ["linear-gradient(#8a2323, #560909)"]
      ],
      boxShadow: "0 2px 10px #0005, 0 1px 1px #c15454 inset",
    },
    toolbar: {
      display: "flex",
      alignItems: "stretch",
      minHeight: 43,
      [theme.breakpoints.down("sm")]: {
        minHeight: 40,
      },
      [theme.breakpoints.down("xs")]: {
        minHeight: 38,
      },
    },
    status: {
      color: "#f7bfbf",
    },
    fields: {
      display: "flex",
      alignItems: "center",
      borderLeft: "1px solid #ffffff24",
      borderRight: "1px solid #00000024",
      [theme.breakpoints.down("xl")]: {
        padding: theme.spacing(0, 1.5),
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 1),
      },
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(0, 0.5),
      },
    },
    castUrl: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },
    castIcons: {
      marginLeft: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      fontSize: 12,
      fontWeight: "bold",
      color: "white",
    },
    downloadButton: {
      color: "#ce5f5f",
      background: "linear-gradient(#541717, #2d0909)",
      textTransform: "none",
      fontWeight: "bold",
      "&:hover": {
        color: "#822323",
      },
    },
  };
});

const TopbarInfo = ({ children, classes: classesProp }) => {
  const classes = useStyles();

  return (
    <div className={classes.fields}>
      <Typography className={clsx(classesProp?.typography)}>
        {children}
      </Typography>
    </div>
  );
};

const Topbar = ({ currentStatus }) => {
  const serverInfo = {
    ip: "IP: Rekteria.net",
    port: "Port: 7171",
  };

  const cast = {
    path: "/cast",
    streamers: 20,
    viewers: 100,
  };

  const socials = {
    youtube: "https://youtube.com",
  };

  const clientVersions = {
    windows: "10.00/12.61",
  };
  const downloadOnClickHandler = () => {
    console.log("INFO: Download Client");
  };

  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar variant="dense" disableGutters className={classes.toolbar}>
        {/* Server Info */}
        <TopbarInfo classes={{ typography: classes.status }}>
          {currentStatus}
        </TopbarInfo>
        <TopbarInfo>{serverInfo.ip}</TopbarInfo>
        <TopbarInfo>{serverInfo.port}</TopbarInfo>

        <div style={{ flex: 1 }} />

        {/* Cast */}
        <div className={classes.fields}>
          <RouterLink className={classes.castUrl} to={cast.path}>
            <img src={IconCast} alt="cast logo" loading="lazy" />

            <Hidden smDown>
              <div className={classes.castIcons}>
                <span>
                  <img src={IconStreamers} alt="cast streamers" />
                  <span> - {cast.streamers}</span>
                </span>
                <span>
                  <img src={IconViwers} alt="cast viewers" />
                  <span> - {cast.viewers}</span>
                </span>
              </div>
            </Hidden>
          </RouterLink>
        </div>

        {/* Youtube */}
        <div className={classes.fields}>
          <a
            href={socials.youtube}
            style={{ display: "flex" }} // fix - a is larger than child img
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Hidden smDown>
              <img src={IconYoutubeFull} alt="youtube logo" loading="lazy" />
            </Hidden>
            <Hidden mdUp>
              <img src={IconYoutube} alt="youtube logo" loading="lazy" />
            </Hidden>
          </a>
        </div>

        {/* Download */}

        <Hidden xsDown>
          <div className={classes.fields}>
            <Button
              onClick={downloadOnClickHandler}
              startIcon={<GetAppIcon />}
              disableRipple
              size="small"
              variant="contained"
              className={classes.downloadButton}
            >
              <Hidden smDown>
              {"Download "}
              </Hidden>
              <Hidden mdUp>
              {"Get "}
              </Hidden>
              Client <Hidden smDown>{clientVersions.windows}</Hidden>
            </Button>
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
