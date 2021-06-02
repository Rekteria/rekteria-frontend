import React from 'react';
import { Link } from 'react-router-dom';

import IconCast from '../../../assets/img/icon-cast.png';
import IconStreamers from '../../../assets/img/icon-streamers.png';
import IconViwers from '../../../assets/img/icon-viewers.png';
import IconYoutuber from '../../../assets/img/icon-youtube.png';

const Topbar = ({ currentStatus }) => {
  return (
    <div className="topbar streams">
      <div className="el">
        <span style={{ color: '#f7bfbf' }}>{currentStatus}!</span>
      </div>{' '}
      <div className="el">IP: Rekteria.net</div>
      <div className="el">Port: 7171</div>
      {/*
<div className="el">Boosted Creature: <div className="monsterbox" style="background-image: url(https://static.tibia.com/images/global/header/monsters/demon.gif);"></div></div>
*/}
      <Link to="#" className="btn btn-topbar btn-sm" style={{ float: 'right' }}>
        <i className="fas fa-file-download" /> Download Client{' '}
        <span style={{ opacity: '0.8' }}>10.00/12.61</span>
      </Link>
      <div style={{ float: 'right' }}>
        <div className="el">
          <Link to="/cast">
            <img style={{ marginRight: 5 }} src={IconCast} alt="" />
            <span style={{ fontSize: 11 }}>
              <img
                style={{ marginRight: 5 }}
                className="InfoBarSmallElement"
                src={IconStreamers}
                alt=""
              />
              <strong> 0 </strong>
              <img
                style={{ margin: '0 5px' }}
                className="InfoBarSmallElement"
                src={IconViwers}
                alt=""
              />
              <strong> 0 </strong>
            </span>
          </Link>
        </div>
        <div className="el">
          <Link to="http://youtube.com/c/yourchannelname">
            <img
              src={IconYoutuber}
              style={{ display: 'none !important' }}
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
