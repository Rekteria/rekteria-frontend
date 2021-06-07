import React from 'react';
import { Link } from 'react-router-dom';

import { convertTimestempToDate } from '../../helpers/DateTime';
const CharacterVictims = ({ victimsList }) => {
  return (
    <>
      <table
        width="100%"
        className="guild-list table-bordered mb-5"
        cellPadding={10}
      >
        <tbody>
          {victimsList.map((victims) => {
            return (
              <tr key={victims.time}>
                <td width="30%">{convertTimestempToDate(victims.time)}</td>
                <td>
                  Killed{' '}
                  <Link
                    to={`/character/${victims.player.name}`}
                    className="notranslate"
                  >
                    <strong>{victims.player.name}</strong>
                  </Link>{' '}
                  at level {victims.level}.
                  <font className="m-1" color="green">
                    (Justified)
                  </font>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CharacterVictims;
