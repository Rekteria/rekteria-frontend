import React from 'react';
import Container from '../Layouts/Container';

const ServerInfo = () => {
  return (
    <Container>
      <div className="card p-3 mt-2">
        <h3>Server Info</h3>
        <hr />
        <table className="table table-striped">
          <tbody>
            <tr>
              <td colSpan={2}>
                The exp and skill rates are staged and there is little variation
                in skill rates between different vocations to provide a perfect
                balance.
                <br />
                More information as such as your current rates in-game can be
                found using the <kbd>!info</kbd> command.
                <br />
                <br />
                Explaining: From 10x in level 10 to 2x in level 100.
                <br />
                Starting as 10x, at level 10, and gradually decreasing to 2x, at
                level 100.
              </td>
            </tr>
            <tr>
              <th>Knight</th>
              <td>
                <b>Fist, shielding, axe, sword and club fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 100
                <br />
                <b>Magic level:</b>
                <br />
                From 5x in level 0 to 2x in level 8<br />
                <b>Distance fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 36
                <br />
                <b>Fishing:</b>
                <br />
                From 10x in level 10 to 2x in level 40
              </td>
            </tr>
            <tr>
              <th>Sorcerer</th>
              <td>
                <b>Axe, sword, club and distance fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 23
                <br />
                <b>Magic level:</b>
                <br />
                From 5x in level 0 to 2x in level 90
                <br />
                <b>Fist and shielding fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 31
                <br />
                <b>Fishing:</b>
                <br />
                From 10x in level 10 to 2x in level 40
              </td>
            </tr>
            <tr>
              <th>Paladin</th>
              <td>
                <b>Fist, axe, sword and club fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 57
                <br />
                <b>Magic level:</b>
                <br />
                From 5x in level 0 to 2x in level 26
                <br />
                <b>Distance and shielding fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 100
                <br />
                <b>Fishing:</b>
                <br />
                From 10x in level 10 to 2x in level 40
              </td>
            </tr>
            <tr>
              <th>Druid</th>
              <td>
                <b>Axe, sword, club and distance fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 25
                <br />
                <b>Magic level:</b>
                <br />
                From 5x in level 0 to 2x in level 90
                <br />
                <b>Fist and shielding fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 31
                <br />
                <b>Fishing:</b>
                <br />
                From 10x in level 10 to 2x in level 40
              </td>
            </tr>
            <tr>
              <th>Rooker</th>
              <td>
                <b>Axe, sword, club and distance fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 23
                <br />
                <b>Magic level:</b>
                <br />
                From 5x in level 0 to 2x in level 7<br />
                <b>Fist and shielding fighting:</b>
                <br />
                From 10x in level 10 to 2x in level 31
                <br />
                <b>Fishing:</b>
                <br />
                From 10x in level 10 to 2x in level 40
              </td>
            </tr>
            <tr>
              <th>Lootrate</th>
              <td>2x</td>
            </tr>
            <tr>
              <th>Level to buy house</th>
              <td>120, houses have to be purchased on website - </td>
            </tr>
            <tr>
              <th>Special Bonus Reward from Quests</th>
              <td>Yes, from certain quests that can be found on our </td>
            </tr>
            <tr>
              <th>PvP Type</th>
              <td>
                Retro PvP with Twist of Fate
                <br />
                Frag timer above 60 hours: <b>Red skull</b>
                <br />
                Frag timer above 96 hours: <b>Black skull</b>
                <br />
                More information on our{' '}
              </td>
            </tr>
            <tr>
              <th>Protection Level</th>
              <td>Level 8</td>
            </tr>
            <tr>
              <th style={{ width: 250 }}>Client</th>
              <td>Rekteria 12 custom client </td>
            </tr>
            <tr>
              <th>Features</th>
              <td>
                <ul>
                  <li>Anti CaveBot!</li>
                  <li>Cast System</li>
                  <li>Reward Chest System</li>
                  <li>Party Shared Exp Bonus</li>
                  <li>Prey System</li>
                  <li>Achievements</li>
                  <li>Crown Tokens</li>
                  <li>Player's special settings</li>
                  <li>Imbuing System</li>
                  <li>Enhanced Monster A.I</li>
                  <li>Custom Access to respawns, island and special areas</li>
                  <li>Auto Loot</li>
                  <li>Custom Retro PvP</li>
                  <li>Plenty of Unique War Features</li>
                  <li>Tasks</li>
                  <li>World Changes</li>
                  <li>Custom Quests!</li>
                  <li>Custom Rookgaard</li>
                  <li>Custom Adventurer's Island</li>
                  <li>
                    <b>And much more!</b>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ServerInfo;
