import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MuiPaper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import NavBg from "../../assets/img/navbar_bg.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
  newsContent: {
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
    },
  },
  postBody: {
    "& h2": theme.typography["h2"],
    "& h3": theme.typography["h3"],
    "& h4": theme.typography["h4"],
    "& h5": theme.typography["h5"],
    "& h6": theme.typography["h5"],
    "& p": theme.typography["body1"],
  },
  post: {
    padding: theme.spacing(2, 2, 10, 2),
    marginBottom: theme.spacing(10)
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const rawDate = new Date(post.createdAt)
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const date = rawDate.toLocaleString('en-US', dateOptions)

  return (
    <MuiPaper square className={classes.post}>
      <Typography variant="h2">{post.title}</Typography>
      <Typography variant="body2">{date}</Typography>
      <div
        className={classes.postBody}
        dangerouslySetInnerHTML={{ __html: post.body_text }}
      />
    </MuiPaper>
  );
};

const News = ({ news }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">News</Typography>
      </div>
      <div className={classes.newsContent}>
        {news.map((item) => {
          return <Post key={item.id} post={item} />;
        })}
      </div>
    </>
  );
};

// AccountWidget.propTypes = {
//   account: PropTypes.shape({
//     avatar: PropTypes.string,
//     profileName: PropTypes.string,
//     location: PropTypes.string,
//     coins: PropTypes.number,
//   }),
// };

export default News;
