import React from 'react';

import IconCast from '../../../assets/img/icon-cast.png';
import IconStreamers from '../../../assets/img/icon-streamers.png';
import IconViwers from '../../../assets/img/icon-viewers.png';

const Topbar = () => {
  return (
    <div className="topbar streams">
      <div className="el">
        <span style={{ color: '#f7bfbf' }}>Server Offline!</span>
      </div>{' '}
      <div className="el">IP: Rekteria.net</div>
      <div className="el">Port: 7171</div>
      {/*
<div className="el">Boosted Creature: <div className="monsterbox" style="background-image: url(https://static.tibia.com/images/global/header/monsters/demon.gif);"></div></div>
*/}
      <a href="#" className="btn btn-topbar btn-sm" style={{ float: 'right' }}>
        <i className="fas fa-file-download" /> Download Client{' '}
        <span style={{ opacity: '0.8' }}>10.00/12.61</span>
      </a>
      <div style={{ float: 'right' }}>
        <div className="el">
          <a href="casts.php">
            <img style={{ marginRight: 5 }} src={IconCast} />
            <span style={{ fontSize: 11 }}>
              <img
                style={{ marginRight: 5 }}
                className="InfoBarSmallElement"
                src={IconStreamers}
              />
              <strong> 0 </strong>
              <img
                style={{ margin: '0 5px' }}
                className="InfoBarSmallElement"
                src={IconViwers}
              />
              <strong> 0 </strong>
            </span>
          </a>
        </div>
        <div className="el">
          <a href="http://youtube.com/c/yourchannelname">
            {' '}
            <img
              src="layout/icon-youtube.png"
              style={{ display: 'none !important' }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
