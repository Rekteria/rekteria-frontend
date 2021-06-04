import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { guildList } from '../../actions/GuildActions';

import { getAccount } from '../../helpers/Account';
import { getImageUrl } from '../../helpers/Api';

import { showLoading, hideLoading } from 'react-redux-loading-bar';
import Container from '../Layouts/Container';

import Search from './Search';
import GuildLogoDefault from '../../assets/img/guild_logo_default.png';

const Guilds = ({ guildList, showLoading, hideLoading }) => {
  const [guild, setGuild] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [searchBy, setSearchBy] = React.useState('name');
  const [sortBy] = React.useState('name');
  const account = getAccount();

  React.useEffect(() => {
    showLoading();

    guildList().then(({ payload }) => {
      const newData = payload.data.data;
      setGuild(newData);
      hideLoading();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildList]);

  const processGuilds = (_guilds) => {
    return _guilds
      .filter((p) => {
        if (search === '') {
          return true;
        }
        if (!p[searchBy]) {
          return false;
        }
        return p[searchBy]
          .replace(',', '')
          .toLowerCase()
          .includes(search.toLowerCase());
      })
      .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  };

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleSearchByChange = (event) => setSearchBy(event.target.value);

  const processedGuilds = processGuilds(guild);

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Guild List</div>
        <div className="panel-body">
          <div className="card-body p-2">
            {!account ? (
              <div>
                Before you can create guild you must login.
                <span className="float-right mb-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-sign-in fa-sm" aria-hidden="true" />{' '}
                    Login
                  </button>
                </span>
              </div>
            ) : (
              <Link to="/guilds/create">
                <button
                  type="submit"
                  className="btn btn-primary float-right mb-2"
                >
                  <i className="fa fa-sign-in fa-sm" aria-hidden="true" />{' '}
                  Create Guild
                </button>
              </Link>
            )}

            <Search
              handleSearchChange={handleSearchChange}
              handleSearchByChange={handleSearchByChange}
              searchBy={searchBy}
              search={search}
            />
            <table
              id="guildTable"
              className="table table-hover table-striped table-bordered"
            >
              <tbody>
                {processedGuilds.map((guilds) => {
                  return (
                    <tr key={guilds.id}>
                      <td width="64px" className="p-2">
                        <img
                          src={
                            guilds.logo_gfx_name
                              ? getImageUrl(guilds.logo_gfx_name)
                              : GuildLogoDefault
                          }
                          width={64}
                          alt="GuildLogo"
                          className="profile-image rounded-circle d-block"
                          style={{
                            backgroundSize: 'cover',
                          }}
                        />
                      </td>
                      <td width="100%" className="p-2">
                        <b>{guilds.name}</b>
                        <br />
                        {guilds.description}
                      </td>
                      <td width="80px" className="align-middle">
                        <Link
                          to={{
                            pathname: `/guilds/${guilds.id}`,
                            state: { leader: guilds?.player?.name },
                          }}
                        >
                          <button
                            className="btn btn-primary"
                            type="submit"
                            id="navbar-search-submit"
                          >
                            <i className="fa fa-eye" aria-hidden="true" /> View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
  };
};

export default connect(mapStateToProps, {
  guildList,
  showLoading,
  hideLoading,
})(Guilds);
