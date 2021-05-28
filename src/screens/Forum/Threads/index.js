import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  forumBoard,
  threadRemove,
  setThreadToRemove,
} from '../../../actions/ForumActions';
import { formatDate } from '../../../helpers/DateTime';
import { getAccount } from '../../../helpers/Account';
import { getImageUrl } from '../../../helpers/Api';
import noneAvatar from '../../../assets/img/none_avatar.png';
import CreateThread from '../Threads/Create';

import { showNewThread } from '../../../assets/js/scripts';
import useFullPageLoader from '../../../Hooks/useFullPageLoader';

import Navbar from '../../Layouts/Navbar';
import Topbar from '../../Layouts/Topbar';
import Footer from '../../Layouts/Footer';

import { AiOutlineDelete } from 'react-icons/ai';

const Threads = ({
  forumBoard,
  threadRemove,
  forumToRemove,
  setThreadToRemove,
  mobile,
}) => {
  const account = getAccount();
  const { board_id } = useParams();
  const [threadList, setThreadList] = React.useState([]);
  const [postInteraction, setPostInteraction] = React.useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  function interaction() {
    setPostInteraction(!postInteraction);
  }

  React.useEffect(() => {
    showLoader();
    forumBoard(board_id)
      .then(({ payload }) => {
        const newData = payload.data.data;
        setThreadList(newData);
        hideLoader();
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumBoard, board_id, postInteraction]);

  const cancelDelete = (e) => setThreadToRemove(null);
  const confirmDelete = async (e) => {
    if (forumToRemove) {
      await threadRemove(forumToRemove);
      interaction();
    }
  };

  return (
    <>
      <div className="logo"></div>
      <div className="container" id="xds">
        <Navbar mobile={mobile} />
      </div>
      {/* /.container */}
      <div className="container">
        <div className="chainbg" />
        <Topbar />
        <div className="content-border">
          <div className="card mb-g border shadow-0 m-3">
            <div className="card-header bg-white">
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <span className="h6 font-weight-bold text-uppercase">
                    Forum
                  </span>
                </div>
              </div>
              {account?.page_access >= 3 || board_id > 1 ? (
                <div className="col d-flex">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm ml-auto mr-2 flex-shrink-0 waves-effect waves-themed"
                    onClick={() => showNewThread()}
                  >
                    Add new Thread
                  </button>
                </div>
              ) : null}
            </div>
            <div className="card-header bg-white p-0">
              <div className="row no-gutters row-grid align-items-stretch">
                <div className="col-12 col-md">
                  <div className="text-uppercase text-muted py-2 px-3">
                    Title
                  </div>
                </div>
                <div className="col-sm-6 col-md-2 col-xl-1 hidden-md-down">
                  <div className="text-uppercase text-muted py-2 px-3">
                    Views
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 hidden-md-down">
                  <div className="text-uppercase text-muted py-2 px-3">
                    Last update
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="row no-gutters row-grid">
                {threadList.map((thread) => {
                  const deleteClick = (e) => setThreadToRemove(thread);
                  return (
                    <div key={thread.id} className="col-12">
                      <div className="row no-gutters row-grid align-items-stretch">
                        <div className="col-md">
                          <div className="p-3">
                            <div className="d-flex flex-column">
                              <Link
                                to={`/forum/thread/${thread.board_id}/${thread.id}`}
                                className="fs-lg fw-500 d-flex align-items-start"
                              >
                                {thread.title}
                              </Link>
                              <div className="d-block text-muted fs-sm">
                                Started by{' '}
                                <Link
                                  to="/characters/:name"
                                  className="text-info"
                                >
                                  {thread.character_name}
                                </Link>{' '}
                                on {formatDate(thread.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        {account?.page_access >= 3 ? (
                          <div className="col-md">
                            <div className="p-3">
                              <div className="d-flex">
                                <div className="d-inline-flex flex-column">
                                  <span
                                    className="btn btn-outline-danger btn-xs waves-effect waves-themed"
                                    title="Delete Board"
                                    onClick={deleteClick}
                                  >
                                    <AiOutlineDelete size={20} />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <div className="col-4 col-md-2 col-xl-1 hidden-md-down">
                          <div className="p-3 p-md-3">
                            <span className="d-block text-muted">
                              {thread.views} <i>Views</i>
                            </span>
                          </div>
                        </div>
                        <div className="col-8 col-md-3 hidden-md-down">
                          <div className="p-3 p-md-3">
                            <div className="d-flex align-items-center">
                              <div className="d-inline-block align-middle status-success status-sm mr-2">
                                <img
                                  src={`${
                                    thread.account.avatar
                                      ? getImageUrl(thread.account.avatar)
                                      : `${noneAvatar}`
                                  }`}
                                  alt="None Avatar"
                                  className="profile-image-md rounded-circle d-block"
                                  style={{
                                    backgroundSize: 'cover',
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-width-0">
                                <div
                                  className="d-blockd-inline-block text-truncate"
                                  style={{ maxWidth: 150 }}
                                  dangerouslySetInnerHTML={{
                                    __html: thread.body_text,
                                  }}
                                ></div>
                                <div className="text-muted small text-truncate">
                                  {formatDate(thread.updatedAt)}{' '}
                                  <Link
                                    to="/characters/:name"
                                    className="text-info"
                                  >
                                    {thread.character_name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {forumToRemove ? (
                  <div className="alert alert-danger rounded shadow-bold col-xl-6 ml-auto mr-auto pl-3 pr-3">
                    <h4 className="alert-heading">Delete Confirmation!</h4>
                    <p>
                      Are you sure you want to delete, this action cannot be
                      undone.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-outline-dark"
                        onClick={cancelDelete}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={confirmDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}

                <CreateThread interaction={interaction} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {loader}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    player: state.player.player,
    forumToRemove: state.forum.forumToRemove,
  };
};

export default connect(mapStateToProps, {
  forumBoard,
  threadRemove,
  setThreadToRemove,
})(Threads);
