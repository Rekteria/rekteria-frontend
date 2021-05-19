import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { playerGetCharacter } from '../../../actions/PlayerActions';
import { changeMinify, changeMenuOnMobile } from '../../../assets/js/scripts';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import './styles.css';

const Header = ({ playerGetCharacter, hideCart }) => {
  const history = useHistory();
  const { cart } = useSelector((state) => state.shop);
  const { name } = useParams();
  const [searchName, setSearchName] = useState();
  const [, setError] = useState(false);

  const Header = React.useRef();
  // React.useEffect(() => {
  //   if (window.localStorage.getItem('mod-skin-dark')) {
  //     Header.current.checked = true;
  //   } else {
  //     Header.current.checked = false;
  //   }
  // });

  const openDrawer = () => {
    const event = new CustomEvent('openCart');
    window.dispatchEvent(event);
  };

  const toggleTheme = () => {
    document.body.classList.toggle('mod-skin-dark');

    document.body.classList.contains('mod-skin-dark')
      ? localStorage.setItem('mod-skin-dark', true)
      : localStorage.removeItem('mod-skin-dark');
  };

  const themeSavedLocalStorage = () => {
    const getThemeFromLocalStorage = localStorage.getItem('mod-skin-dark');

    getThemeFromLocalStorage
      ? document.body.classList.add('mod-skin-dark')
      : localStorage.removeItem('mod-skin-dark') &&
        document.body.classList.remove('mod-skin-dark');
  };
  // themeSavedLocalStorage();

  useEffect(() => {
    if (name !== undefined) {
      playerGetCharacter(name)
        .then(({ payload }) => {
          /* data players */
          const dataPlayers = payload.data;
          setSearchName(dataPlayers);
        })
        .catch((err) => {
          const { data } = err.response;
          setError(data.message);
        });
    }
  }, [name, playerGetCharacter]);

  const submitHandle = (e) => {
    e.preventDefault();

    history.push(`/character/${searchName}`);
  };

  return (
    <>
      <section id="ticker-slide">
        <div className="container">
          <div className="tsBox">
            <div className="slider">
              <ul id="slides">
                <li id="slide-1" className="slide">
                  <a href="?view=donate">
                    <img src="images/double-slide.png" alt />
                    <div className="slide-infos"></div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="tickers">
              <h2>Tickers</h2>
              <ul className="ticker">
                <p style={{ marginTop: 10 }} className="info-warning">
                  Sem tickers.
                </p>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="warningBox container">
        <center>Welcome to Warmen-ATS</center>
      </div>
      <section id="server-infos" className="container">
        <div className="info-box info-status">
          <h2>Status do Servidor</h2>
          <center>
            <table className="table table-striped table-condensed">
              <tbody>
                <tr>
                  <td>Status:</td>
                  <td colSpan={1}>
                    {/*?php
                      if($config['status']['serverStatus_online'] == 1)
                        echo '<span className="label label-success pull-right label-sm"*/}
                    Online'; else echo '
                    <span className="label label-danger pull-right label-sm">
                      Offline
                    </span>
                    '; ?&gt;
                  </td>
                </tr>
                <tr>
                  <td>Server Save:</td>
                  <td>06:00</td>
                </tr>
                <tr>
                  <td>
                    <a href="?view=online">{/* online */}</a>
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </center>
        </div>
        <div className="info-box info-infos">
          <h2>Informações</h2>
          <ul>
            <li>IP: thoria.online</li>
            <li>Porta: 7171</li>
            <li>Versão: 10.99/11</li>
            <li>Tipo: PVP</li>
          </ul>
        </div>
        <div className="info-box info-rates">
          <h2>Rates</h2>
          <ul>
            <li>
              Exp: <a href="?view=serverinfo#stages">stages de 20x</a>
            </li>
            <li>Magic: 3x</li>
            <li>Skill: 10x</li>
            <li>Loot: 1x</li>
          </ul>
        </div>
        <div className="info-box info-download">
          <h2>Download Clientes</h2>
          <a href="?view=downloads" className="infos-button">
            <span className="infos-button-bg-left" />
            <span className="infos-button-bg-mid">
              <span>
                Clientes <i className="fa fa-download" />
              </span>
            </span>
            <span className="infos-button-bg-right" />
          </a>
        </div>
        <div className="info-box info-donate">
          <h2>Doação</h2>
          <a href="?view=donate" className="infos-button">
            <span className="infos-button-bg-left" />
            <span className="infos-button-bg-mid">
              <span>
                Doar <i className="fa fa-gift" />
              </span>
            </span>
            <span className="infos-button-bg-right" />
          </a>
        </div>
        <div className="clr" />
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    players: state.player.player,
  };
};

export default connect(mapStateToProps, { playerGetCharacter })(Header);
