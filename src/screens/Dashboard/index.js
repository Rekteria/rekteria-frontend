import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { playerList } from '../../actions/PlayerActions';
import { getShopList } from '../../actions/ShopActions';
import { getAccount } from '../../helpers/Account';
import { getFormData } from '../../helpers/FormData';
import { newsCreate } from '../../actions/ForumActions';

// import Menu from '../Layouts/Menu';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

import './styles.css';
import Shopping from './Shopping';

const Dashboard = ({
  playerList,
  getShopList,
  newsCreate,
  account,
  players,
}) => {
  const [shopList, setShopList] = React.useState([]);

  React.useEffect(() => {
    playerList();
  }, [playerList]);

  React.useEffect(() => {
    getShopList()
      .then(({ payload }) => {
        const newData = payload.data.data.rows;
        setShopList(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getShopList]);

  if (!getAccount()[0]?.group_id) {
    return <Redirect to="/sign-in" />;
  }

  const submitHandle = (e) => {
    e.preventDefault();
    const data = getFormData(e);

    //converter string para inteiros.
    for (e in data) {
      data[e] = parseInt(data[e]) || data[e];
    }

    newsCreate(data);
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        {/* <Menu /> */}

        <div className="page-content-wrapper">
          <Header />

          <main id="js-page-content" role="main" className="page-content">
            <div className="topnav">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#home">
                    <i className="fal fa-home mr-1"></i>Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#shopping">
                    <i className="fal fa-shopping-cart mr-1"></i>Shopping
                  </a>
                </li>
              </ul>
            </div>

            <div className="subheader">
              <h1 className="subheader-title">
                <i className="subheader-icon fal fa-chart-area"></i> Marketing{' '}
                <span className="fw-300">Dashboard</span>
                <small></small>
              </h1>
              <div className="d-flex mr-4">
                <div className="mr-2">
                  <span
                    className="peity-donut"
                    data-peity='{ "fill": ["#967bbd", "#ccbfdf"],  "innerRadius": 14, "radius": 20 }'
                    style={{ display: 'none' }}
                  >
                    7/10
                  </span>
                  <svg className="peity" height="40" width="40">
                    <path
                      d="M 20 0 A 20 20 0 1 1 0.9788696740969307 26.18033988749895 L 6.685208771867851 24.326237921249266 A 14 14 0 1 0 20 6"
                      data-value="7"
                      fill="#967bbd"
                    ></path>
                    <path
                      d="M 0.9788696740969307 26.18033988749895 A 20 20 0 0 1 19.999999999999996 0 L 19.999999999999996 6 A 14 14 0 0 0 6.685208771867851 24.326237921249266"
                      data-value="3"
                      fill="#ccbfdf"
                    ></path>
                  </svg>
                </div>
                <div>
                  <label className="fs-sm mb-0 mt-2 mt-md-0">
                    New Sessions
                  </label>
                  <h4 className="font-weight-bold mb-0">70.60%</h4>
                </div>
              </div>
              <div className="d-flex mr-0">
                <div className="mr-2">
                  <span
                    className="peity-donut"
                    data-peity='{ "fill": ["#2196F3", "#9acffa"],  "innerRadius": 14, "radius": 20 }'
                    style={{ display: 'none' }}
                  >
                    3/10
                  </span>
                  <svg className="peity" height="40" width="40">
                    <path
                      d="M 20 0 A 20 20 0 0 1 39.02113032590307 26.18033988749895 L 33.31479122813215 24.326237921249263 A 14 14 0 0 0 20 6"
                      data-value="3"
                      fill="#2196F3"
                    ></path>
                    <path
                      d="M 39.02113032590307 26.18033988749895 A 20 20 0 1 1 19.999999999999996 0 L 19.999999999999996 6 A 14 14 0 1 0 33.31479122813215 24.326237921249263"
                      data-value="7"
                      fill="#9acffa"
                    ></path>
                  </svg>
                </div>
                <div>
                  <label className="fs-sm mb-0 mt-2 mt-md-0">Page Views</label>
                  <h4 className="font-weight-bold mb-0">14,134</h4>
                </div>
              </div>
            </div>

            <div className="tab-content py-3">
              <div
                className="tab-pane fade active show"
                id="home"
                role="tabpanel"
              >
                <div className="panel panel-default">
                  <div className="panel-heading">Home</div>
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-sm-6 col-xl-3">
                        <div className="p-3 bg-primary-300 rounded overflow-hidden position-relative text-white mb-g">
                          <div className="">
                            <h3 className="display-4 d-block l-h-n m-0 fw-500">
                              1274
                              <small className="m-0 l-h-n">Players</small>
                            </h3>
                          </div>
                          <i
                            className="fal fa-user position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n1"
                            style={{ fontSize: '6rem' }}
                          ></i>
                        </div>
                      </div>
                      <div className="col-sm-6 col-xl-3">
                        <div className="p-3 bg-warning-400 rounded overflow-hidden position-relative text-white mb-g">
                          <div className="">
                            <h3 className="display-4 d-block l-h-n m-0 fw-500">
                              $10,203
                              <small className="m-0 l-h-n">Donates</small>
                            </h3>
                          </div>
                          <i
                            className="fal fa-gem position-absolute pos-right pos-bottom opacity-15  mb-n1 mr-n4"
                            style={{ fontSize: '6rem' }}
                          ></i>
                        </div>
                      </div>

                      <div className="col-sm-6 col-xl-3">
                        <div className="p-3 bg-info-200 rounded overflow-hidden position-relative text-white mb-g">
                          <div className="">
                            <h3 className="display-4 d-block l-h-n m-0 fw-500">
                              +40%
                              <small className="m-0 l-h-n">
                                Product level increase
                              </small>
                            </h3>
                          </div>
                          <i
                            className="fal fa-globe position-absolute pos-right pos-bottom opacity-15 mb-n1 mr-n4"
                            style={{ fontSize: '6rem' }}
                          ></i>
                        </div>
                      </div>
                    </div>

                    <div className="card mb-g">
                      <div className="card-body pb-0 px-4">
                        <h1 className="subheader-title">
                          <i className="far fa-newspaper"></i> Create{' '}
                          <span className="fw-300">News</span>
                          <small></small>
                        </h1>
                        <div className="d-flex flex-row pb-3 pt-2  border-top-0 border-left-0 border-right-0"></div>

                        {account?.name}

                        <form onSubmit={submitHandle}>
                          <div className="form-group">
                            <label className="form-label">
                              Select Character
                            </label>
                            <select
                              className="custom-select form-control"
                              name="author_aid"
                            >
                              {players && players.length
                                ? players.map((player) => {
                                    return player.group_id >= 3 ? (
                                      <option key={player.id} value={player.id}>
                                        {player.name}
                                      </option>
                                    ) : null;
                                  })
                                : null}
                            </select>
                          </div>

                          <input
                            type="hidden"
                            name="author_guid"
                            value={account?.id}
                          />

                          <div className="form-group">
                            <label className="form-label" htmlFor="simpleinput">
                              Titulo
                            </label>
                            <input
                              type="text"
                              name="post_topic"
                              className="form-control"
                              placeholder="Titúlo"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="example-textarea"
                            >
                              Descrição
                            </label>
                            <textarea
                              className="form-control"
                              name="post_text"
                              rows="5"
                              required
                            ></textarea>
                          </div>

                          <button className="btn btn-primary shadow-0 ml-auto waves-effect waves-themed mb-3">
                            Post
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="shopping" role="tabpanel">
                <div className="panel panel-default">
                  <div className="panel-heading">Shopping</div>
                  <div className="panel-body">
                    <Shopping shopList={shopList} />
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    players: state.player.player,
    forum: state.forum.forum,
  };
};

export default connect(mapStateToProps, {
  playerList,
  getShopList,
  newsCreate,
})(Dashboard);
