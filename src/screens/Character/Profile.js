import React from 'react';
import { genders, characterVocations, towns } from '../../config';
import { formatDate } from '../../helpers/DateTime';

const Profile = ({ characterPage }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-condensed mb-5">
        <tbody>
          <tr>
            <td width="200px">Name: </td>
            <td>{characterPage.name} </td>
          </tr>
          <tr>
            <td>Sex:</td>
            <td>{genders[characterPage.sex]} </td>
          </tr>
          <tr>
            <td>Level:</td>
            <td>{characterPage.level}</td>
          </tr>
          <tr>
            <td>Vocation: </td>
            <td>{characterVocations[characterPage.vocation]}</td>
          </tr>
          <tr>
            <td>Residence:</td>
            <td>{towns[characterPage.town_id]}</td>
          </tr>
          <tr>
            <td>House: </td>
            <td>Aureate Court 3, Yalahar</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <font
                color={
                  characterPage.players_onlines?.length > 0 ? 'green' : 'red'
                }
              >
                <b>
                  {characterPage.players_onlines?.length > 0
                    ? 'ONLINE'
                    : 'OFFLINE'}
                </b>
              </font>
            </td>
          </tr>
          <tr>
            <td>Created at:</td>
            <td>{formatDate(characterPage.create_date)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
