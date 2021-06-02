import React from 'react';
import { FaThList } from 'react-icons/fa';
import { RiTableLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { guildCreate, guildList } from '../../actions/GuildActions';
import { playerList } from '../../actions/PlayerActions';
import GuildLogoDefault from '../../assets/img/guild_logo_default.png';
import { getImageUrl } from '../../helpers/Api';
import { getFormData } from '../../helpers/FormData';
import Container from '../Layouts/Container';

const Guilds = ({ playerList, guildList, players }) => {
  const [guild, setGuild] = React.useState([]);
  const [postInteraction, setPostInteraction] = React.useState(false);

  function interaction() {
    setPostInteraction(!postInteraction);
  }

  React.useEffect(() => {
    playerList();
    guildList().then(({ payload }) => {
      const newData = payload.data.data;
      setGuild(newData);
    });
  }, [playerList, guildList, postInteraction]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = getFormData(e);
    guildCreate(data);
    interaction();
  };

  return (
    <Container>
      <div className="row" style={{ marginTop: '11px' }}>
        <div className="col-xl-12">
          <div className="border-faded bg-faded p-3 mb-g d-flex">
            <input
              type="text"
              name="filter-guilds"
              className="form-control shadow-inset-2 form-control-lg"
              placeholder="Filter Guilds"
            />
            <div
              className="btn-group btn-group-lg btn-group-toggle hidden-lg-down ml-3"
              data-toggle="buttons"
            ></div>
          </div>
        </div>
      </div>

      <div className="text-center mb-3">
        <form onSubmit={submitHandler}>
          <div className="card p-4 bg-faded">
            <div className="form-group row">
              <div className="col-6 pr-1">
                <select className="form-control" name="ownerid">
                  {players && players.length
                    ? players.map((player) => {
                        return (
                          <option key={player.id} value={player.id}>
                            {player.name}
                          </option>
                        );
                      })
                    : null}
                </select>
                {/* <div className="invalid-feedback">
										No, you missed this one.
									</div> */}
              </div>
              <div className="col-6 pl-1">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Guild Name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="description"
                id="description"
                placeholder="Description"
                cols="30"
                rows="3"
              ></textarea>
            </div>

            <div className="row justify-content-center pb-1">
              <div className="mx-auto">
                <button className="btn btn-block btn-danger btn-lg mt-3 waves-effect waves-themed">
                  Create Guild
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Guilds List */}
      <div className="row">
        {guild.map((guilds, index) => (
          <div key={guilds.id} className="col-xl-4">
            <div className="card border shadow-0 shadow-sm-hover mb-g">
              <div className="card-body border-faded border-top-0 border-left-0 border-right-0 rounded-top">
                <div className="d-flex flex-row align-items-center">
                  <img
                    src={
                      guilds.logo_gfx_name
                        ? getImageUrl(guilds.logo_gfx_name)
                        : GuildLogoDefault
                    }
                    alt="GuildLogo"
                    className="profile-image-lg rounded-circle d-block"
                    style={{
                      backgroundSize: 'cover',
                    }}
                  />

                  <div className="info-card-text flex-1 ml-3">
                    <Link to={`/guilds/${guilds.id}`}>
                      <span className="fs-xl text-truncate text-truncate-lg text-info">
                        {guilds.name}
                      </span>
                    </Link>
                  </div>
                  <button
                    className="js-expand-btn btn btn-sm btn-default waves-effect waves-themed"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`#collapse${index}`}
                  >
                    <span className="collapsed-hidden">+</span>
                    <span className="collapsed-reveal">-</span>
                  </button>
                </div>
              </div>

              <div id={`collapse${index}`} className="card-body p-0 collapse">
                <div className="p-3">
                  <span className="text-truncate text-truncate-xl">
                    Leader: {guilds.player.name}
                  </span>
                  <span className="mt-1 d-block fs-sm fw-400 text-dark">
                    {guilds.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    players: state.player.player,
  };
};

export default connect(mapStateToProps, { playerList, guildList })(Guilds);
