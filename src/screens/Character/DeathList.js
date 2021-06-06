import React from 'react';
import { Link } from 'react-router-dom';

import { convertTimestempToDate } from '../../helpers/DateTime';
const DeathList = ({ playerDeaths }) => {
  return (
    <>
      <table
        width="100%"
        className="guild-list table-bordered mb-5"
        cellPadding={10}
      >
        <tbody>
          {playerDeaths.map((deaths) => {
            return (
              <tr key={deaths.time}>
                <td width="30%">{convertTimestempToDate(deaths.time)}</td>
                <td>
                  Died on level {deaths.level} by
                  {deaths.is_player === 0 ? (
                    <strong className="m-1">{deaths.killed_by}</strong>
                  ) : (
                    <Link
                      to={`/character/${deaths.killed_by}`}
                      className="notranslate"
                    >
                      <strong className="m-1">{deaths.killed_by}</strong>
                    </Link>
                  )}
                  {deaths.killed_by !== deaths.mostdamage_by &&
                  deaths.is_player !== 0 ? (
                    <>
                      and
                      <span className="badge badge-danger m-1">
                        <font style={{ fontSize: '12px' }}>most damage</font>
                      </span>
                      <Link
                        to={`/character/${deaths.mostdamage_by}`}
                        className="notranslate"
                      >
                        <strong>{deaths.mostdamage_by}</strong>
                      </Link>
                      .
                    </>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DeathList;
