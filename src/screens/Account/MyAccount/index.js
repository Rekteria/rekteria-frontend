import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import {
  deleteProfileAvatar,
  getAccount,
  getProfileAvatar,
  signOut,
} from '../../../actions/AccountActions';
import { playerList } from '../../../actions/PlayerActions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import ProfileAvatar from '../../../assets/img/Profile_Avatar.png';

import { formatDate } from '../../../helpers/DateTime';
import Container from '../../Layouts/Container';
import PaymentHistory from '../PaymentHistory';
import './styles.css';

const MyAccount = ({
  playerList,
  getProfileAvatar,
  getAccount,
  signOut,
  account,
  showLoading,
  hideLoading,
}) => {
  const dispatch = useDispatch();
  const { player } = useSelector((state) => state.player);
  const [myAccount, setMyAccount] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    showLoading();
    dispatch(getAccount())
      .then(({ payload }) => {
        const newData = payload.data.data;
        setMyAccount(newData);
        hideLoading();
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(playerList());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccount, dispatch]);

  if (!account) {
    return <Redirect to="/" />;
  }

  const signOutHandler = (event) => {
    event.preventDefault();
    signOut();
  };

  function handleDeleteAvatar(event) {
    event.preventDefault();
    deleteProfileAvatar();
    toast.success('Your avatar has been deleted..');

    setTimeout(() => history.push('/account/avatar'), 2000);
  }

  return (
    <Container>
      <div id="contentBody">
        <div className="panel panel-default">
          <div className="panel-heading ">Account Management</div>

          <div className="panel panel-danger mt-3 m-3">
            <div className="panel-heading ">Recovery Key</div>
            <div className="panel-body">
              <strong>
                You do not have a recovery key. It is recommended that you
                generate one.
                <br />
                In case you lose your account, using the recovery key is the
                only option to recover it.
              </strong>
              <br />
              <br />
              <Link to="/account/key">
                <button className="btn btn-success btn-sm">
                  Generate Recovery Key
                </button>
              </Link>
            </div>
          </div>

          <div className="panel-body">
            <div className="panel-content">
              <div className="border px-3 pt-3 pb-0 rounded">
                <ul className="nav nav-pills" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#account-information"
                    >
                      <i className="fas fa-home mr-1"></i>Account Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#account-profile"
                    >
                      <i className="fas fa-user mr-1"></i>Profile
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#account-paymenthistory"
                    >
                      <i className="fas fa-credit-card mr-1"></i>Payments
                      History
                    </a>
                  </li>
                </ul>
                <div className="tab-content py-3">
                  <div
                    className="tab-pane fade active show"
                    id="account-information"
                    role="tabpanel"
                  >
                    <div className="panel panel-default">
                      <div className="panel-heading">Account Information</div>
                      <div className="panel-body">
                        <table className="table table-striped table-hover table-fixed">
                          <tbody>
                            <tr>
                              <td>Name</td>
                              <td>{myAccount.name}</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>E-mail Address</td>
                              <td>{myAccount.email}</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Created</td>
                              <td className="col-md-9">
                                {formatDate(myAccount.creation)}
                              </td>
                              <td></td>
                            </tr>
                            <tr>
                              <td className="col-md-2 notranslate">
                                Hati Coins
                              </td>
                              <td>{myAccount.coins}</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Premium Account</td>
                              <td>(Premmium Days: {myAccount.premdays})</td>
                            </tr>
                          </tbody>
                        </table>

                        <Link to="/account/password">
                          <button className="btn btn-primary btn-sm mr-3">
                            Change Password
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={signOutHandler}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="account-profile"
                    role="tabpanel"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="panel panel-default">
                          <div className="panel-heading">
                            Profile Information
                          </div>
                          <div className="panel-body">
                            <table className="table table-striped table-hover table-fixed">
                              <tbody>
                                <tr>
                                  <td>Real Name:</td>
                                  <td className="col-md-4 notranslate">
                                    {myAccount.rlname}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Location:</td>
                                  <td className="col-md-4">
                                    {myAccount.location}
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <div className="row">
                              <div className="col">
                                {myAccount.profileName !== '' ? null : (
                                  <span className="col-md-3 mb-1" align="right">
                                    <Link to="/account/profile_name">
                                      <button className="btn btn-primary btn-sm">
                                        Set Profile Name
                                      </button>
                                    </Link>
                                  </span>
                                )}
                              </div>
                              <div className="col">
                                {' '}
                                <Link to="/account/profile">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    align="left"
                                  >
                                    Update Information
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="panel panel-default">
                          <div className="panel-heading">Profile Avatar</div>
                          <div className="panel-body" align="center">
                            <div className="fc-toolbar fc-header-toolbar">
                              <div className="fc-left">
                                <h2 className="fs-md">
                                  {' '}
                                  <span className="subheader-title text-truncate text-truncate-lg text-primary">
                                    {myAccount.profileName}
                                  </span>
                                </h2>
                              </div>
                            </div>
                            {myAccount?.avatar === '' ||
                            myAccount?.avatar === null ? (
                              <img
                                src={ProfileAvatar}
                                alt={ProfileAvatar}
                                style={{
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'center',
                                  backgroundSize: 'cover',
                                }}
                              />
                            ) : (
                              <div className="imagem-avatar">
                                <img
                                  src={`https://api.rekteria.net/${myAccount.avatar}`}
                                  alt="Avatar"
                                  className="profile-image rounded-circle"
                                />
                                <div
                                  className="avatar-delete"
                                  data-toggle="modal"
                                  data-target=".example-modal-centered-transparent"
                                >
                                  <RiDeleteBin6Line size={30} color="#114a4d" />
                                </div>
                              </div>
                            )}
                            <div
                              className="modal fade example-modal-centered-transparent"
                              id="newCategory"
                              tabIndex="-1"
                              role="dialog"
                              aria-hidden="true"
                              style={{ display: 'none' }}
                            >
                              <div
                                className="modal-dialog modal-dialog-centered modal-transparent"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-titlef">
                                      do you want to delete this avatar?
                                      <small className="m-0 opacity-70">
                                        do you really intend to delete your
                                        avatar? you will delete it from our
                                        database, and you will not be able to
                                        recover it again.
                                      </small>
                                    </h4>
                                    <button
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">
                                        <i className="fa fa-times"></i>
                                      </span>
                                    </button>
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
                                      onClick={handleDeleteAvatar}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <br />

                            {/* {avatar && avatar === null ? (
                              <button
                                className="btn btn-primary btn-sm disabled"
                                align="center"
                                disabled
                              >
                                Update Avatar
                              </button>
                            ) : (
                              <Link to="/account/avatar">
                                <button
                                  className="btn btn-primary btn-sm"
                                  align="center"
                                >
                                  Update Avatar
                                </button>
                              </Link>
                            )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="account-paymenthistory"
                    role="tabpanel"
                  >
                    <PaymentHistory />
                  </div>
                </div>
              </div>
            </div>

            <div className="panel panel-default mt-3">
              <div className="panel-heading">Characters</div>

              <div className="panel-body hidden-md hidden-lg">
                <div className="character-container">
                  {player && player.length
                    ? player.map((player) => {
                        return (
                          <div key={player.id} className="new-character">
                            <Link to={`/character/${player.name}`}>
                              <span
                                className="profile-image rounded-circle d-block m-auto"
                                style={{
                                  backgroundImage: `url("https://www.tibiawiki.com.br/images/e/e4/Outfit_Citizen_Male.gif")`,
                                  backgroundSize: 'cover',
                                }}
                              ></span>
                              <span className="d-block text-truncate fs-xs mt-1">
                                {player.name}
                              </span>
                            </Link>
                          </div>
                        );
                      })
                    : null}
                  {player?.length < 5 && (
                    <Link to="/account/characters/create">
                      <span className="new-character">
                        <FiPlus size={24} color="#17a7af" />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    players: state.player.player,
  };
};

export default connect(mapStateToProps, {
  playerList,
  signOut,
  getProfileAvatar,
  getAccount,
  showLoading,
  hideLoading,
})(MyAccount);
