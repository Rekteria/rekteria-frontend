import React from 'react';
import { connect } from 'react-redux';
import { forumBoard } from '../../actions/ForumActions';

import { getImageUrl } from '../../helpers/Api';
import { groupsId } from '../../config';
import { formatDate } from '../../helpers/DateTime';
import Container from '../Layouts/Container';

import IconPlus from '../../assets/img/plus.gif';
import IconMinus from '../../assets/img/minus.gif';
import noneAvatar from '../../assets/img/none_avatar.png';

import { FaNewspaper } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi';

import { Link } from 'react-router-dom';

const Home = ({ forumBoard }) => {
  const [newsPost, setNewsPost] = React.useState([]);

  const [isOpened, setIsOpened] = React.useState(false);

  React.useEffect(() => {
    forumBoard(1)
      .then(({ payload }) => {
        const newData = payload.data.data;
        setNewsPost(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [forumBoard]);

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
        {newsPost.map((news) => {
          return (
            <div key={news.id} className="card mb-g">
              <div className="card-body pb-0 px-4">
                <div class="row">
                  <div class="col-1">
                    <div className="d-inline-block align-middle status status-success mr-3">
                      {news?.account.avatar ? (
                        <img
                          src={getImageUrl(news?.account.avatar)}
                          className="profile-image rounded-circle"
                          alt=""
                        />
                      ) : (
                        <img
                          src={noneAvatar}
                          className="profile-image rounded-circle"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div class="col-8">
                    <h5 className="mb-0 flex-1 text-dark fw-500">
                      {news.character_name}
                    </h5>
                    <small className="m-0 l-h-n">
                      {groupsId[news?.account.players[0].group_id]}
                    </small>
                  </div>
                  <div class="col-3 text-right">
                    <span className="float-right">
                      <BiTimeFive size={20} className="mr-1" />
                      {formatDate(news.createdAt)}
                    </span>
                  </div>
                </div>

                <hr className="m-0 w-100" />
                <br />
                <h2 className="subheader-title">
                  <FaNewspaper size={20} className="mr-2" />
                  {news.title}
                </h2>
                <div
                  className="pb-3 pt-2 border-top-0 border-left-0 border-right-0 text-muted"
                  dangerouslySetInnerHTML={{ __html: news.body_text }}
                />
              </div>
              <div className="card-body py-0 px-4 border-faded border-right-0 border-bottom-0 border-left-0">
                <div className="d-flex flex-column align-items-center">
                  <hr className="m-0 w-100" />
                </div>
              </div>
            </div>
          );
        })}
        {/* <p>No news exist.</p>{' '} */}
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
