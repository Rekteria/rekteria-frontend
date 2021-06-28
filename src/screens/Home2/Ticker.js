import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import NavBg from "../../assets/img/navbar_bg.png";
import Grid from "@material-ui/core/Grid";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    // borderRadius: 5
  },
  header: {
    color: "white",
    height: 45,
    paddingLeft: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    background: [
      [`url(${NavBg})`, "left top", "repeat-x"],
      ["linear-gradient(#216669, #144144)", "center center", "repeat"],
    ],
  },
  tickerContent: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "15%",
    [theme.breakpoints.down("md")]: {
      flexBasis: "20%",
    },
    [theme.breakpoints.down("sm")]: {
      flexBasis: "25%",
    },
    [theme.breakpoints.down("xs")]: {
      flexBasis: "30%",
    },
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    width: 500,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
    [theme.breakpoints.down("xs")]: {
      width: 100,
    },

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const Ticker = ({ ticker, expanded, onChange }) => {
  const classes = useStyles();
  const rawDate = new Date(ticker.createdAt);
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  const date = rawDate.toLocaleString("en-US", dateOptions);
  const isExpanded = expanded === ticker.id;
  return (
    <Accordion expanded={isExpanded} onChange={onChange(ticker.id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${ticker.id}-content`}
        id={`panel${ticker.id}-header`}
      >
        <Typography className={classes.heading}>{date}</Typography>
        <Fade in={!isExpanded}>
          <Typography className={classes.secondaryHeading}>
            {ticker.body_text}
          </Typography>
        </Fade>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{ticker.body_text}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const NewsTicker = ({ newsTicker }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">News Ticker</Typography>
      </div>
      <div className={classes.tickerContent}>
        {newsTicker.map((item) => {
          return (
            <Ticker ticker={item} onChange={handleChange} expanded={expanded} />
          );
        })}
      </div>
    </>
  );
};

export default NewsTicker;
