import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  forumList,
  forumCreateBoard,
  setBoardToRemove,
  boardRemove,
} from '../../actions/ForumActions';
import { getToken } from '../../helpers/Account';

import InvalidToken from '../../components/Error/InvalidToken';
import noneAvatar from '../../assets/img/none_avatar.png';
import { formatDate } from '../../helpers/DateTime';

import useFullPageLoader from '../../Hooks/useFullPageLoader';

import Navbar from '../Layouts/Navbar';
import Topbar from '../Layouts/Topbar';
import Footer from '../Layouts/Footer';

import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

const Forum = ({
  forumList,
  forumCreateBoard,
  setBoardToRemove,
  forumToRemove,
  boardRemove,
  mobile,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { account } = useSelector((state) => state.account);

  const [categoryLists, setCategoryLists] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [postInteraction, setPostInteraction] = React.useState(false);
  const [loader, showLoader, hideLoader] = useFullPageLoader();

  function interaction() {
    setPostInteraction(!postInteraction);
  }

  React.useEffect(() => {
    showLoader();

    if (account?.profileName === '' || account?.profileName === null) {
      history.push('/account/profile_name');
    }

    forumList().then(({ payload }) => {
      const newData = payload.data.data;
      setCategoryLists(newData);
      hideLoader();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumList, postInteraction]);

  if (!getToken()) {
    return <InvalidToken />;
  }

  const cancelDelete = (e) => setBoardToRemove(null);
  const confirmDelete = async (e) => {
    if (forumToRemove) {
      await boardRemove(forumToRemove);
      interaction();
    }
  };

  const data = {
    title,
    description,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(forumCreateBoard(data))
      .then(() => {
        interaction();
      })
      .catch((err) => {
        console.error(err);
      });
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
          <div className="row">
            <div className="col-xl-12 p-3">
              <div className="input-group input-group-lg mb-g">
                <input
                  type="text"
                  className="form-control shadow-inset-2"
                  placeholder="Search topics"
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <AiOutlineSearch />
                  </span>
                </div>
              </div>

              <div className="card mb-g border shadow-0">
                <div className="card-header bg-white p-0">
                  <div className="card-header bg-white">
                    <div className="row no-gutters align-items-center">
                      <div className="col">
                        <span className="h6 font-weight-bold text-uppercase">
                          General
                        </span>
                      </div>
                      {account?.page_access >= 3 ? (
                        <div className="col d-flex">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm ml-auto mr-2 flex-shrink-0 waves-effect waves-themed"
                            data-toggle="modal"
                            data-target=".example-modal-centered-transparent"
                          >
                            Add new Category
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row no-gutters row-grid align-items-stretch">
                    <div className="col-12 col-md">
                      <div className="text-uppercase text-muted py-2 px-3">
                        Title
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-2 col-xl-1 hidden-md-down">
                      <div className="text-uppercase text-muted py-2 px-3">
                        Status
                      </div>
                    </div>

                    <div className="col-sm-6 col-md-3 hidden-md-down">
                      <div className="text-uppercase text-muted py-2 px-3">
                        Last posts
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="modal fade example-modal-centered-transparent"
                  tabIndex={-1}
                  role="dialog"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                  id="newCategory"
                >
                  <div
                    className="modal-dialog modal-dialog-centered modal-transparent"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title text-primary">
                          Add new Category
                        </h4>
                        <button
                          type="button"
                          className="close text-primary"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">
                            <AiOutlineCloseCircle size={20} />
                          </span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group">
                          <label
                            htmlFor="title"
                            className="form-label text-primary"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control form-control-lg rounded-pill"
                            placeholder="Category Title"
                            onChange={(event) =>
                              setTitle(
                                event.target.value
                                  .toLowerCase()
                                  .split(' ')
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(' ')
                              )
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor="description"
                            className="form-label text-white"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            id="description"
                            name="description"
                            className="form-control form-control-lg rounded-pill"
                            placeholder="Category Description"
                            onChange={(event) =>
                              setDescription(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary waves-effect waves-themed"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary waves-effect waves-themed"
                          data-dismiss="modal"
                          onClick={handleSubmit}
                        >
                          Add new Category!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body p-0">
                  <div className="row no-gutters row-grid">
                    {categoryLists.map((boards) => {
                      const deleteClick = (e) => setBoardToRemove(boards);
                      return (
                        <div key={boards.id} className="col-12">
                          {console.log(boards)}
                          <div className="row no-gutters row-grid align-items-stretch">
                            <div className="col-md">
                              <div className="p-3">
                                <div className="d-flex">
                                  <div className="d-inline-flex flex-column">
                                    <Link
                                      to={`/forum/${boards.id}`}
                                      className="fs-lg fw-500 d-block"
                                    >
                                      {boards.title}
                                    </Link>

                                    <div className="d-block text-muted fs-sm">
                                      {boards.description}
                                    </div>
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
                                        <AiOutlineDelete size={16} />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            <div className="col-4 col-md-2 col-xl-1 hidden-md-down">
                              <div className="p-3 p-md-3">
                                <span className="d-block text-muted">
                                  {boards.threads.length} <i>Topics</i>
                                </span>
                                <span className="d-block text-muted">
                                  {boards.posts} <i>Views</i>
                                </span>
                              </div>
                            </div>
                            <div className="col-8 col-md-3 hidden-md-down">
                              <div className="p-3 p-md-3">
                                <div className="d-flex align-items-center">
                                  <div className="d-inline-block align-middle status-success status-sm mr-2">
                                    <img
                                      src={noneAvatar}
                                      className="profile-image-md rounded-circle d-block"
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex-1 min-width-0">
                                    <Link
                                      to="#"
                                      className="d-block text-truncate"
                                    >
                                      {boards.threads?.[0].title}
                                    </Link>
                                    <div className="text-muted small text-truncate">
                                      {formatDate(
                                        boards.threads?.[0].updatedAt
                                      )}
                                      <Link to="#" className="text-info ml-1">
                                        {boards.threads?.[0].character_name}
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
                  </div>
                </div>
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
    forum: state.forum.forums,
    forumToRemove: state.forum.forumToRemove,
  };
};

export default connect(mapStateToProps, {
  forumList,
  forumCreateBoard,
  setBoardToRemove,
  boardRemove,
})(Forum);
