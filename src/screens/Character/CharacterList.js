import React from 'react';
import { Link } from 'react-router-dom';

const CharacterList = ({ characterList }) => {
  return (
    <table className="table table-striped table-condensed">
      <tbody>
        <tr>
          <td>
            <b>Characters</b>
          </td>
          <th>Status</th>
        </tr>
        {characterList.map((list, index) => {
          return (
            <tr key={list.name}>
              <td>
                <b>{index + 1}. </b>
                <Link to={`/character/${list.name}`}>{list.name}</Link>
              </td>
              <td>
                {' '}
                <font
                  color={list.players_onlines?.length > 0 ? 'green' : 'black'}
                >
                  <b>
                    {list.players_onlines?.length > 0 ? 'Online' : 'Offline'}
                  </b>
                </font>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CharacterList;
