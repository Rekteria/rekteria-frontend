import React from 'react';

const Powergamers = () => {
  return (
    <div className="side-box">
      <div className="side-box-title">PowerGamers</div>
      <div className="side-box-content">
        fetchAll() as $player) {'{'}
        $i++; $change = $player['experience']-$player['exphist_lastexp']; $nam = $player['name']; if (strlen($nam) &gt;
        15)
        {'{'}$nam = substr($nam, 0, 12) . '...';{'}'}
        echo ' ';
        {'}'}
        ?&gt;
        <table className="table">
          <tbody>
            {/*?php
  $i=0;
  foreach($powergamers-*/}
            <tr>
              <td style={{ width: '80%' }}>
                <strong>'.$i.'.</strong>
                <a href="?view=characters&name=' . $player['name'] . '">' . $nam . '</a>
              </td>
              <td>
                <span className="label label-' . ($change >= 0 ? 'success' : 'error') . ' pull-right">
                  ' . ($change &gt;= 0 ? '+' : '-') . $change . ' exp
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-striped">
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Powergamers;
