import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../../../assets/img/container_bg.png";
import BgCorners from "../../../assets/img/container_bg_corners.png";
import BgCornersMob from "../../../assets/img/container_bg_corners_mobile.png";
import BackgroundHorizontal from "../../../assets/img/container_bg_horizontal.png";
import BackgroundVeritical from "../../../assets/img/container_bg_veritical.png";

const useStyles = makeStyles(({ breakpoints }) => {
  const background_shared = [
    // horizontal border
    [`url(${BackgroundHorizontal})`, "left top -9px", "repeat-x"],
    [`url(${BackgroundHorizontal})`, "left bottom -9px", "repeat-x"],
    // horizontal border
    [`url(${BackgroundVeritical})`, "left -9px top", "repeat-y"],
    [`url(${BackgroundVeritical})`, "right -9px top", "repeat-y"],
    // background
    [`url(${Background})`, "left top", "repeat"],
  ];

  return {
    root: {
      width: "100%",
      height: 600,
      backgroundColor: "transparent",
      [breakpoints.down("lg")]: {
        background: [
          // border corners desktop
          [`url(${BgCorners})`, "left -80px top -80px", "no-repeat"],
          [`url(${BgCorners})`, "left -80px bottom -80px", "no-repeat"],
          [`url(${BgCorners})`, "right -80px top -80px", "no-repeat"],
          [`url(${BgCorners})`, "right -80px bottom -80px", "no-repeat"],
          ...background_shared,
        ],
      },
      [breakpoints.down("xs")]: {
        background: [
          // border corners mobile
          [`url(${BgCornersMob})`, "left -10px top -10px", "no-repeat"],
          [`url(${BgCornersMob})`, "left -10px bottom -10px", "no-repeat"],
          [`url(${BgCornersMob})`, "right -10px top -10px", "no-repeat"],
          [`url(${BgCornersMob})`, "right -10px bottom -10px", "no-repeat"],
          ...background_shared,
        ],
      },
    },
  };
});

const Paper = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default Paper;
