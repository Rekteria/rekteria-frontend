import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopKillers } from '../../actions/PlayerDeathsActions';

import Container from '../Layouts/Container';

const TopKillers = () => {
  const dispatch = useDispatch();
  const [topKillers, setTopKillers] = React.useState([]);
  const [topGuildKill, setTopGuildKill] = React.useState([]);

  React.useEffect(() => {
    dispatch(getTopKillers())
      .then(({ payload }) => {
        const newData = payload.data.data;
        setTopKillers(newData.TopKillers);
        setTopGuildKill(newData.TopGuilds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Top Killers</div>
        <div className="panel-body">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-topkills-tab"
                data-toggle="tab"
                href="#nav-topkills"
                role="tab"
                aria-controls="nav-topkills"
                aria-selected="true"
              >
                Top Kills
              </a>
              <a
                className="nav-item nav-link"
                id="nav-topguilds-tab"
                data-toggle="tab"
                href="#nav-topguilds"
                role="tab"
                aria-controls="nav-topguilds"
                aria-selected="false"
              >
                Top Guilds
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-topkills"
              role="tabpanel"
              aria-labelledby="nav-topkills-tab"
            >
              <table className="table table-striped table-condensed">
                <tbody>
                  {console.log(topKillers)}
                  <tr>
                    <th width="70%">Name</th>
                    <th width="15%">Frags</th>
                  </tr>
                  {topKillers.map((playerKiller) => {
                    return (
                      <tr key={playerKiller.killed_by}>
                        <td>
                          <span className="label label-primary">
                            <Link to={`/character/${playerKiller.killed_by}`}>
                              {playerKiller.killed_by}
                            </Link>
                          </span>
                        </td>
                        <td>{playerKiller.total_kills}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              className="tab-pane fade"
              id="nav-topguilds"
              role="tabpanel"
              aria-labelledby="nav-topguilds-tab"
            >
              <table className="table table-striped table-condensed">
                <tbody>
                  <tr>
                    <th width="70">Guild Name</th>
                    <th width="15%">Frags</th>
                  </tr>
                  {topGuildKill.map((topGuild) => {
                    return (
                      <tr key={topGuild.guild}>
                        <td>
                          <span className="label label-primary">
                            {topGuild.guildName}
                          </span>
                        </td>
                        <td>{topGuild.totalKills}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopKillers;
