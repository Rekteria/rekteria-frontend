import React from "react";
import MuiPaper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { forumBoard } from "../../actions/ForumActions";

import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getImageUrl } from "../../helpers/Api";
import { groupsId } from "../../config";
import { formatDate } from "../../helpers/DateTime";
import Container from "../Layouts/Container2";

import IconPlus from "../../assets/img/plus.gif";
import IconMinus from "../../assets/img/minus.gif";
import noneAvatar from "../../assets/img/none_avatar.png";
import News from "./News";
import NewsTicker from "./Ticker";
import Paper from "../Layouts/Paper";

import { FaNewspaper } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";

import { Link } from "react-router-dom";
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 9,
  },
}));

const Home = ({ forumBoard, showLoading, hideLoading }) => {
  const classes = useStyles();
  const [newsPost, setNewsPost] = React.useState([]);
  const [isOpened, setIsOpened] = React.useState(false);

  React.useEffect(() => {
    showLoading();
    forumBoard(1)
      .then(({ payload }) => {
        const newData = payload.data.data;
        setNewsPost(newData);
        hideLoading();
      })
      .catch((err) => {
        console.log(err);
        hideLoading();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumBoard]);
  console.log(newsPost);

  const newsTickerToggle = () => {
    setIsOpened(!isOpened);
    document.querySelector(".ticker-text").classList.toggle("active");
  };

  const newsPostMock = [
    {
      id: 1,
      title: "Some great news",
      createdAt: "2021-05-26T22:23:12.000Z",
      body_text:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam velit, pharetra sit amet vehicula sit amet, laoreet sit amet tellus. Phasellus accumsan posuere lacus, id ornare mauris efficitur in. Cras eget nulla mi. In mollis erat odio, sed tristique diam volutpat ac. Nunc suscipit libero eu purus feugiat tempor. Quisque nulla justo, efficitur in rhoncus ac, elementum sed neque. Sed ac malesuada purus. Suspendisse dolor ipsum, lobortis id auctor a, mattis vitae augue. Aenean a tempor augue. Morbi tincidunt pellentesque turpis, non porttitor ante rhoncus maximus. Proin eleifend massa et ultricies tristique. Aliquam lacinia nulla quam, eu venenatis nibh molestie eget. Vestibulum mattis nisl tellus, tincidunt mattis ex cursus non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>",
    },
    {
      id: 2,
      title: "Another news",
      createdAt: "2021-05-10T13:46:30.000Z",
      body_text:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam velit, pharetra sit amet vehicula sit amet, laoreet sit amet tellus. Phasellus accumsan posuere lacus, id ornare mauris efficitur in. Cras eget nulla mi. In mollis erat odio, sed tristique diam volutpat ac. Nunc suscipit libero eu purus feugiat tempor. Quisque nulla justo, efficitur in rhoncus ac, elementum sed neque. Sed ac malesuada purus. Suspendisse dolor ipsum, lobortis id auctor a, mattis vitae augue. Aenean a tempor augue. Morbi tincidunt pellentesque turpis, non porttitor ante rhoncus maximus. Proin eleifend massa et ultricies tristique. Aliquam lacinia nulla quam, eu venenatis nibh molestie eget. Vestibulum mattis nisl tellus, tincidunt mattis ex cursus non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>",
    },
    {
      id: 3,
      title: "One more news",
      createdAt: "2021-05-02T12:50:22.000Z",
      body_text:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam velit, pharetra sit amet vehicula sit amet, laoreet sit amet tellus. Phasellus accumsan posuere lacus, id ornare mauris efficitur in. Cras eget nulla mi. In mollis erat odio, sed tristique diam volutpat ac. Nunc suscipit libero eu purus feugiat tempor. Quisque nulla justo, efficitur in rhoncus ac, elementum sed neque. Sed ac malesuada purus. Suspendisse dolor ipsum, lobortis id auctor a, mattis vitae augue. Aenean a tempor augue. Morbi tincidunt pellentesque turpis, non porttitor ante rhoncus maximus. Proin eleifend massa et ultricies tristique. Aliquam lacinia nulla quam, eu venenatis nibh molestie eget. Vestibulum mattis nisl tellus, tincidunt mattis ex cursus non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae</p>",
    },
  ];
  const newsTickerMock = [
    {
      id: 1,
      createdAt: "2021-05-26T22:23:12.000Z",
      body_text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam velit, pharetra sit amet vehicula sit amet, laoreet sit amet tellus. Phasellus accumsan posuere lacus, id ornare mauris efficitur in. Cras eget nulla mi.",
    },
    {
      id: 2,
      createdAt: "2021-05-10T13:46:30.000Z",
      body_text:
        "Nulla diam velit, pharetra sit amet vehicula sit amet, laoreet sit amet tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan posuere lacus, id ornare mauris efficitur in. Cras eget nulla mi.",
    },
    {
      id: 3,
      createdAt: "2021-05-02T12:50:22.000Z",
      body_text:
        "Phasellus accumsan posuere lacus, id ornare mauris efficitur in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam velit, pharetra sit amet vehicula sit amet, laoreet sit amet tellus. Cras eget nulla mi.",
    },
  ];

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper className={classes.paper} onlySmallCorners>
            <NewsTicker newsTicker={newsTickerMock} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} onlySmallCorners>
            <News news={newsPostMock} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    forum: state.forum.forum,
  };
};

export default connect(mapStateToProps, {
  forumBoard,
  showLoading,
  hideLoading,
})(Home);
