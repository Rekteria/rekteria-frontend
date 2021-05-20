import React from 'react';
import { connect } from 'react-redux';
import { forumBoard } from '../../actions/ForumActions';

import Container from '../Layouts/Container';

import IconPlus from '../../assets/img/plus.gif';
import IconMinus from '../../assets/img/minus.gif';
import { Link } from 'react-router-dom';

const Home = ({ forumBoard }) => {
  // const [newsPost, setNewsPost] = useState([]);
  // const [postInteraction, setPostInteraction] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);

  // function interaction() {
  //   setPostInteraction(!postInteraction);
  // }

  // useEffect(() => {
  //   forumBoard(1)
  //     .then(({ payload }) => {
  //       const newData = payload.data.data;

  //       setNewsPost(newData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [forumBoard, postInteraction]);

  const newsTickerToggle = () => {
    setIsOpened(!isOpened);
    document.querySelector('.ticker-text').classList.toggle('active');
  };

  return (
    <Container>
      <div className="col-bg">
        <table
          id="changelogTable"
          className="table table-bordered table-sm table-striped"
        >
          <tbody>
            <tr>
              <td
                colSpan={3}
                style={{
                  background: '#0002',
                  textAlign: 'center',
                  color: '#266f74',
                }}
              >
                News Ticker
                <Link to="changelog.php" />
              </td>
            </tr>
            <tr>
              <td width="5%">
                <span className="badge badge-light">Feb/09/21</span>
              </td>
              <td>
                <div className="ticker-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  sodales fringilla ex, a tincidunt augue viverra et. Aenean vel
                  viverra diam. Vivamus gravida velit at metus imperdiet
                  convallis. Pellentesque vel faucibus urna. Nullam id dui
                  tempus, fringilla
                </div>
              </td>
              <td width="1%">
                <span className="tickerbtn" onClick={newsTickerToggle}>
                  <img src={isOpened ? IconMinus : IconPlus} alt="" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <p>No news exist.</p>{' '}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    forum: state.forum.forum,
  };
};

export default connect(mapStateToProps, { forumBoard })(Home);
