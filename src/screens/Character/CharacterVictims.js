import React from 'react';

import { convertTimestempToDate } from '../../helpers/DateTime';
const CharacterVictims = ({ playerDeaths }) => {
  return (
    <>
      <table
        width="100%"
        className="guild-list table-bordered"
        cellPadding={10}
      >
        <tbody>
          {playerDeaths.map((victims) => {
            return victims.unjustified === 1 ? (
              <tr key={victims.time}>
                <td width="30%">30 May 2021, 00:44</td>
                {console.log(victims)}
                <td>
                  Killed{' '}
                  <a
                    className="notranslate"
                    href="/character/show/Fake-tibia-coach"
                  >
                    <strong>Fake-tibia-coach</strong>
                  </a>{' '}
                  at level 503.
                  <font color="green">(Justified)</font>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </>
  );
};

export default CharacterVictims;
