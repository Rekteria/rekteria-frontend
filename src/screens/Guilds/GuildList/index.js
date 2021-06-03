import React from 'react';
import { FaRegTrashAlt, FaSignInAlt, FaUsers } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { GiBattleGear } from 'react-icons/gi';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import {
  editGuildDescription,
  editGuildRanks,
  guildAccept,
  guildGetInvites,
  guildHasInvite,
  guildInvite,
  guildMember,
  guildRemove,
  guildShow,
  postGuildLogo,
  setGuildToRemove,
} from '../../../actions/GuildActions';
import { playerList } from '../../../actions/PlayerActions';
import GuildLogoDefault from '../../../assets/img/guild_logo_default.png';
import { characterVocations } from '../../../config';
import { getImageUrl } from '../../../helpers/Api';
import { getFormData } from '../../../helpers/FormData';
import { formatDate } from '../../../helpers/DateTime';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import Container from '../../Layouts/Container';
import ChangeLogo from './ChangeLogo';
import GuildDescription from './GuildDescription';
import GuildRank from './GuildRank';

import './styles.css';

const GuildList = ({
  guildShow,
  guildMember,
  guildInvite,
  guildGetInvites,
  guildHasInvite,
  guildAccept,
  postGuildLogo,
  editGuildRanks,
  setGuildToRemove,
  guildToRemove,
  guildRemove,
  guild,
  playerList,
  showLoading,
  hideLoading,
}) => {
  const [currentGuild, setCurrentGuild] = React.useState([]);
  const [member, setMember] = React.useState([]);
  const [invitedList, setInvitedList] = React.useState([]);
  const [acceptInvite, setAcceptInvite] = React.useState([]);
  const [playerId, setPlayerId] = React.useState(0);
  const [postInteraction, setPostInteraction] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState('');
  const [getPlayerInAccount, setGetPlayerInAccount] = React.useState([]);

  const [getRanks, setGetRanks] = React.useState([]);
  const [editLeader, setEditLeader] = React.useState('');
  const [editVice, setEditVice] = React.useState('');
  const [editMember, setEditMember] = React.useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  let { state } = useLocation();

  function interaction() {
    setPostInteraction(!postInteraction);
  }

  React.useEffect(() => {
    showLoading();
    playerList().then(({ payload }) => {
      const newData = payload.data.data;
      setGetPlayerInAccount(newData);
      hideLoading();
    });
    guildShow(id).then(({ payload }) => {
      const newData = payload.data.data;
      setCurrentGuild(newData);
      hideLoading();
    });
    guildMember(id).then(({ payload }) => {
      const newData = payload.data.data;
      setMember(newData);
      hideLoading();
    });
    guildGetInvites(id).then(({ payload }) => {
      const newData = payload.data.data;
      setInvitedList(newData);
      hideLoading();
    });
    guildHasInvite(id).then(({ payload }) => {
      const newData = payload.data.data;
      setAcceptInvite(newData);
      hideLoading();
    });
    editGuildRanks(id).then(({ payload }) => {
      const newData = payload.data.data;
      setGetRanks(newData);
      hideLoading();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    guildShow,
    guildGetInvites,
    guildMember,
    guildHasInvite,
    editGuildRanks,
    playerList,
    postInteraction,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);
    guildInvite(id, data);
    interaction();
  };

  const acceptHandler = (e) => {
    e.preventDefault(e);
    guildAccept(id, playerId);
    interaction();
  };

  const handleSelectImages = (e) => {
    if (!e.target.files) {
      return;
    }

    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const preview = URL.createObjectURL(selectedImage);
    setImagePreview(preview);
  };

  const submitLogoHandler = (e) => {
    e.preventDefault(e);
    const formData = new FormData();
    formData.append('guild_logo', image);
    postGuildLogo(id, formData)
      .then(() => {
        toast.success('Your Guild Logo has been successfully exchanged..');
        interaction();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const submitDescriptionHandler = (e) => {
    e.preventDefault(e);
    const data = getFormData(e);
    dispatch(editGuildDescription(id, data))
      .then(() => {
        toast.success(
          'Your Guild Description has been successfully exchanged..'
        );
        interaction();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const submitRanksHandler = (e) => {
    e.preventDefault(e);

    const addRanks = [
      { name: editLeader || getRanks[0].name, level: 3, id: getRanks[0].id },
      { name: editVice || getRanks[1].name, level: 2, id: getRanks[1].id },
      { name: editMember || getRanks[2].name, level: 1, id: getRanks[2].id },
    ];

    editGuildRanks(id, addRanks)
      .then(() => {
        toast.success('Your Ranks Name has been successfully exchanged..');
        interaction();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const getPlayer = getPlayerInAccount.map((player) => player.id);
  const verifyRanks = member.map((member) => member.player_id);

  const settings = getPlayer.filter((arr1Item) =>
    verifyRanks.includes(arr1Item)
  );

  //create logic to leader view settings.

  const deleteClick = (e) => setGuildToRemove(currentGuild);
  const cancelDelete = (e) => setGuildToRemove(null);
  const confirmDelete = async (e) => {
    if (guildToRemove) {
      await guildRemove(guildToRemove);
      history.push('/guilds');
    }
  };

  const handleDeleteInvited = (event) => {
    // const a = event.target.parentNode.parentNode.parentNode;
    // const b = a.childNodes[0];
    // const c = b.childNodes[0].innerHTML;
    // console.log(c);
    // const a = event.target.parentNode.childNodes[0].innerHTML;
  };

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Overview</div>
        <div className="panel-body">
          <div style={{ float: 'left', marginRight: 10 }}>
            <span className="fw-300 fs-xs d-block opacity-50">
              {currentGuild.logo_gfx_name === undefined ? null : (
                <img
                  className="profile-image-lg"
                  src={`${
                    currentGuild.logo_gfx_name === '' ||
                    currentGuild.logo_gfx_name === null
                      ? GuildLogoDefault
                      : currentGuild.logo_gfx_name &&
                        getImageUrl(currentGuild.logo_gfx_name)
                  }`}
                  alt="GuildLogo"
                />
              )}
            </span>
          </div>
          <div style={{ float: 'right', marginRight: 10 }}>
            <span className="fw-300 fs-xs d-block opacity-50">
              {currentGuild.logo_gfx_name === undefined ? null : (
                <img
                  className="profile-image-lg"
                  src={`${
                    currentGuild.logo_gfx_name === '' ||
                    currentGuild.logo_gfx_name === null
                      ? GuildLogoDefault
                      : currentGuild.logo_gfx_name &&
                        getImageUrl(currentGuild.logo_gfx_name)
                  }`}
                  alt="GuildLogo"
                />
              )}
            </span>
          </div>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%, 0)',
              marginTop: '-10px',
            }}
          >
            <div className="centered guild-name">{currentGuild.name}</div>
          </div>
          <div id="guildDescription">
            <p>
              <br />
            </p>
            <center>
              <br />
              <p
                dangerouslySetInnerHTML={{
                  __html: currentGuild.description,
                }}
              />
            </center>
            <p />
          </div>
          <div className="panel panel-default">
            <div className="panel-body">
              <div>
                The guild was founded on <strong>Rekteria</strong> on{' '}
                {formatDate(currentGuild.createdAt)}
              </div>
              <div className="text-success">
                Current leader is {state.leader}.
              </div>
            </div>
          </div>

          <div className="panel-body mt-4">
            <ul className="nav nav-pills" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#members"
                >
                  <FaUsers className="mr-1" size={20} />
                  Members
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#wars">
                  <GiBattleGear className="mr-1" size={20} /> Active Wars
                </a>
              </li>
              {settings.length > 0 ? (
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#settings">
                    <FiSettings className="mr-1" size={20} />
                    Settings
                  </a>
                </li>
              ) : null}
            </ul>

            <hr />
            <div className="tab-content">
              <div className="tab-pane active" id="members">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Player</th>
                      <th>Vocation</th>
                      <th>Level</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.map((members, index) =>
                      members.rank === members.guild_rank.level ? (
                        <tr
                          key={members.id}
                          className={index % 2 !== 0 ? 'highscores-tr-odd' : ''}
                        >
                          <td>
                            {members.rank === members.guild_rank.level
                              ? members.guild_rank.name
                              : null}
                          </td>

                          <td>
                            <div className="info-card-text flex-1">
                              <h2 className="fs-xl text-  uncate text-truncate-lg text-primary">
                                <Link to={`/character/${members.player.name}`}>
                                  {members.player.name}{' '}
                                </Link>
                              </h2>
                            </div>
                          </td>
                          <td className="hidden-xs">
                            {characterVocations[members.player.vocation]}
                          </td>
                          <td>(Level {members.player.level})</td>
                          <td>
                            {members.players_online === null ? (
                              <font color="FF0000">Offline</font>
                            ) : (
                              <font color="00FF00">Online</font>
                            )}
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
              <div className="tab-pane" id="wars">
                <br />
                {currentGuild.name} is not currently participating in any active
                war.
              </div>
              <div className="tab-pane" id="settings">
                <div className="panel-container show">
                  <div className="panel-content">
                    <div className="row">
                      <div className="col-auto">
                        <div
                          className="nav flex-column nav-pills"
                          id="v-pills-tab"
                          role="tablist"
                          aria-orientation="vertical"
                        >
                          <a
                            className="nav-link active"
                            id="v-pills-changelogo-tab"
                            data-toggle="pill"
                            href="#v-pills-changelogo"
                            role="tab"
                            aria-controls="v-pills-changelogo"
                            aria-selected="true"
                          >
                            <span className="hidden-sm-down ml-1">
                              {' '}
                              Change Logo
                            </span>
                          </a>
                          <a
                            className="nav-link"
                            id="v-pills-changeguild-description-tab"
                            data-toggle="pill"
                            href="#v-pills-changeguild-description"
                            role="tab"
                            aria-controls="v-pills-changeguild-description"
                            aria-selected="false"
                          >
                            <span className="hidden-sm-down ml-1">
                              {' '}
                              Change Guild Description
                            </span>
                          </a>
                          <a
                            className="nav-link"
                            id="v-pills-renameguildrank-tab"
                            data-toggle="pill"
                            href="#v-pills-renameguildrank"
                            role="tab"
                            aria-controls="v-pills-renameguildrank"
                            aria-selected="false"
                          >
                            <span className="hidden-sm-down ml-1">
                              {' '}
                              Rename Guild Ranks
                            </span>
                          </a>
                          <a
                            className="nav-link"
                            id="v-pills-disband-tab"
                            data-toggle="pill"
                            href="#v-pills-disband"
                            role="tab"
                            aria-controls="v-pills-disband"
                            aria-selected="false"
                          >
                            <span className="hidden-sm-down ml-1">
                              Disband Guild
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="col">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div
                            className="tab-pane fade active show"
                            id="v-pills-changelogo"
                            role="tabpanel"
                            aria-labelledby="v-pills-changelogo-tab"
                          >
                            <ChangeLogo
                              submitLogoHandler={submitLogoHandler}
                              handleSelectImages={handleSelectImages}
                              imagePreview={imagePreview}
                              GuildLogoDefault={GuildLogoDefault}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="v-pills-changeguild-description"
                            role="tabpanel"
                            aria-labelledby="v-pills-changeguild-description-tab"
                          >
                            <GuildDescription
                              submitDescriptionHandler={
                                submitDescriptionHandler
                              }
                              guild={guild}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="v-pills-renameguildrank"
                            role="tabpanel"
                            aria-labelledby="v-pills-renameguildrank-tab"
                          >
                            <GuildRank
                              submitRanksHandler={submitRanksHandler}
                              getRanks={getRanks}
                              setEditLeader={setEditLeader}
                              setEditVice={setEditVice}
                              editMember={editMember}
                              setEditMember={setEditMember}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="v-pills-disband"
                            role="tabpanel"
                            aria-labelledby="v-pills-disband-tab"
                          >
                            <h3>Disbang Guild</h3>
                            <button
                              type="button"
                              className="btn btn-lg btn-outline-danger waves-effect waves-themed col-12"
                              onClick={deleteClick}
                            >
                              <span className="fal fa-times mr-1"></span>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {guildToRemove ? (
        <div className="alert alert-danger rounded shadow-bold col-xl-6 ml-auto mr-auto pl-3 pr-3">
          <h4 className="alert-heading">Delete Confirmation!</h4>
          <p>Are you sure you want to delete, this action cannot be undone.</p>
          <hr />
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-dark" onClick={cancelDelete}>
              Cancel
            </button>
            <button className="btn btn-outline-danger" onClick={confirmDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : null}

      <div className="col-sm-5 mx-auto">
        <form onSubmit={acceptHandler}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Player</th>
                <th>Vocation &amp; Level</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {acceptInvite.length > 0
                ? acceptInvite.map((list) => (
                    <tr key={list.id}>
                      <td>
                        <Link to={`/character/${list.player.name}`}>
                          {list.player.name}
                        </Link>
                      </td>
                      <td className="hidden-xs">
                        {characterVocations[list.player.vocation]} (Level{' '}
                        {list.player.level})
                      </td>

                      <td>
                        <div align="center">
                          {acceptInvite.length > 0 ? (
                            <button
                              type="submit"
                              className="btn btn-outline-success btn-sm ml-auto mr-2 flex-shrink-0 waves-effect waves-themed"
                              id={list.id}
                              onClick={() => setPlayerId(list.player_id)}
                            >
                              <FaSignInAlt size={14} />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                : invitedList?.map((list) => (
                    <tr key={list.id}>
                      <td>
                        <Link
                          to={`/character/${list.player.name}`}
                          id="deleteInvite"
                        >
                          {list.player.name}
                        </Link>
                        {settings.length > 0 ? (
                          <FaRegTrashAlt
                            size={14}
                            onClick={handleDeleteInvited}
                            className="ml-2"
                          />
                        ) : null}
                      </td>
                      <td className="hidden-xs">
                        {characterVocations[list.player.vocation]} (Level{' '}
                        {list.player.level})
                      </td>

                      <td>
                        <div align="center">
                          {acceptInvite.length > 0 ? (
                            <button
                              type="submit"
                              className="btn btn-outline-success btn-sm ml-auto mr-2 flex-shrink-0 waves-effect waves-themed"
                              id={list.id}
                              onClick={() => setPlayerId(list.player_id)}
                            >
                              <FaSignInAlt size={14} />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </form>
      </div>
      {settings.length > 0 ? (
        <form onSubmit={submitHandler}>
          <div className="d-flex flex-column align-items-center justify-content-center text-center">
            <div className="row">
              <div className="col-9 pr-1 mb-3">
                <input
                  type="text"
                  name="player_id"
                  className="form-control"
                  placeholder="Enter name to invite player."
                />
              </div>
              <div className="col-3 pr-1 mb-3">
                <button className="btn btn-sm btn-outline-primary">
                  Invite
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : null}
      <ToastContainer className="toast-message" />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    players: state.player.player,
    guild: state.guild.guild,
    guildToRemove: state.guild.guildToRemove,
  };
};

export default connect(mapStateToProps, {
  guildShow,
  guildMember,
  guildInvite,
  guildGetInvites,
  guildHasInvite,
  guildAccept,
  postGuildLogo,
  editGuildRanks,
  setGuildToRemove,
  guildRemove,
  playerList,
  showLoading,
  hideLoading,
})(GuildList);
