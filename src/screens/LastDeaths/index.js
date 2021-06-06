import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLastDeaths } from '../../actions/PlayerDeathsActions';
import { convertTimestempToDate } from '../../helpers/DateTime';

import Container from '../Layouts/Container';

const LastDeaths = () => {
  const dispatch = useDispatch();
  const [deathPlayer, setDeathPlayer] = React.useState([]);

  React.useEffect(() => {
    dispatch(getLastDeaths())
      .then(({ payload }) => {
        const newData = payload.data.data;
        setDeathPlayer(newData);
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
                        at level {death.level} by{' '}
                        <font color="red">
                          <b>{death.killed_by}</b>
                        </font>{' '}
                        and most damage{' '}
                        <font color="green">
                          <b>{death.mostdamage_by}</b>
                        </font>
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
