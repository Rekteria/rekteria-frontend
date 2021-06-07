import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLastDeaths } from '../../actions/PlayerDeathsActions';
import { convertTimestempToDate } from '../../helpers/DateTime';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import Container from '../Layouts/Container';

const LastDeaths = () => {
  const dispatch = useDispatch();
  const [deathPlayer, setDeathPlayer] = React.useState([]);

  React.useEffect(() => {
    dispatch(showLoading());
    dispatch(getLastDeaths())
      .then(({ payload }) => {
        const newData = payload.data.data;
        setDeathPlayer(newData);
        dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Last Deaths</div>
        <div className="panel-body">
          <div className="card-body p-2">
            <table
              id="deathsTable"
              className="table table-striped table-condensed notranslate"
            >
              <tbody>
                <tr>
                  <th>Victim</th>
                  <th>By</th>
                  <th>Time</th>
                </tr>
                {deathPlayer.map((death) => {
                  return (
                    <tr key={death.time}>
                      <td>
                        <Link to={`/character/${death?.player.name}`}>
                          {death?.player.name}
                        </Link>
                      </td>
                      <td>
                        at level {death.level} by
                        {death.is_player !== 0 ? (
                          <Link to={`/character/${death.killed_by}`}>
                            <font className="m-1" color="red">
                              <b>{death.killed_by}</b>
                            </font>
                          </Link>
                        ) : (
                          <font className="m-1">
                            <b>{death.killed_by}</b>
                          </font>
                        )}
                        {death.killed_by !== death.mostdamage_by &&
                        death.is_player !== 0 ? (
                          <>
                            and
                            <span className="badge badge-danger m-1">
                              <font style={{ fontSize: '12px' }}>
                                most damage
                              </font>
                            </span>
                            <Link
                              to={`/character/${death.mostdamage_by}`}
                              className="notranslate"
                            >
                              <strong>{death.mostdamage_by}</strong>
                            </Link>
                            .
                          </>
                        ) : null}
                      </td>
                      <td>{convertTimestempToDate(death.time)}</td>
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

export default LastDeaths;
