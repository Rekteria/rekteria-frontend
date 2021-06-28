import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Background from "../../../assets/img/container_bg.png";
import BgCorners from "../../../assets/img/container_bg_corners.png";
import BgCornersMob from "../../../assets/img/container_bg_corners_mobile.png";
import BackgroundHorizontal from "../../../assets/img/container_bg_horizontal.png";
import BackgroundVeritical from "../../../assets/img/container_bg_veritical.png";

const useStyles = makeStyles(({ breakpoints, spacing }) => {
  const backgroundShared = [
    // horizontal border
    [`url(${BackgroundHorizontal})`, "left top -9px", "repeat-x"],
    [`url(${BackgroundHorizontal})`, "left bottom -9px", "repeat-x"],
    // horizontal border
    [`url(${BackgroundVeritical})`, "left -9px top", "repeat-y"],
    [`url(${BackgroundVeritical})`, "right -9px top", "repeat-y"],
    // background
    [`url(${Background})`, "left top", "repeat"],
  ];

  const bigCorners = [
    // border corners desktop
    [`url(${BgCorners})`, "left -80px top -80px", "no-repeat"],
    [`url(${BgCorners})`, "left -80px bottom -80px", "no-repeat"],
    [`url(${BgCorners})`, "right -80px top -80px", "no-repeat"],
    [`url(${BgCorners})`, "right -80px bottom -80px", "no-repeat"],
    ...backgroundShared,
  ];

  const smallCorners = [
    // border corners mobile
    [`url(${BgCornersMob})`, "left -10px top -10px", "no-repeat"],
    [`url(${BgCornersMob})`, "left -10px bottom -10px", "no-repeat"],
    [`url(${BgCornersMob})`, "right -10px top -10px", "no-repeat"],
    [`url(${BgCornersMob})`, "right -10px bottom -10px", "no-repeat"],
    ...backgroundShared,
  ]

  return {
    root: {
      width: "100%",
      // height: 600,
      backgroundColor: "transparent",
      [breakpoints.down("xl")]: {
        background: ({ onlySmallCorners }) =>
          onlySmallCorners ? smallCorners : bigCorners,
        padding: spacing(5),
      },
      [breakpoints.down("xs")]: {
        background: smallCorners,
        padding: spacing(3),
      },
    },
  };
});

const Paper = ({ children, className, onlySmallCorners }) => {
  const classes = useStyles({ onlySmallCorners });
  return <div className={clsx(classes.root, className)}>{children}</div>;
};

export default Paper;
