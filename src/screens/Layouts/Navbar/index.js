import React from 'react';
import { Link } from 'react-router-dom';
import { getAccount } from '../../../helpers/Account';

import SmallLogo from '../../../assets/img/logo_small.png';

const Menu = ({ mobile }) => {
  const account = getAccount();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark rounded fixed-center">
        <Link className="navbar-brand" to="/">
          <img
            src={SmallLogo}
            width={67}
            height={65}
            className="d-inline-block align-top"
            alt="rekteria"
            loading="lazy"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="nav navbar-nav mr-auto">
            <li className="d-inline d-lg-none">
              <button
                data-toggle="collapse"
                data-target="#nav"
                className="close float-right"
              >
                &times;
              </button>
            </li>

            {mobile && (
              <li className="nav-item">
                <button className="nav-link submit" to="index.php">
                  {/* tratar depois no mobile */}
                  <i className="fas fa-sign-in-alt mr-2"></i> Login
                </button>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="forum.php">
                Forum
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Account
              </Link>
              <div className="dropdown-menu">
                <Link
                  className="dropdown-item"
                  to={account ? '/account' : '/sign-up'}
                >
                  {account ? 'My Account' : 'Create Account'}
                </Link>
                <Link className="dropdown-item" to="#">
                  Account Lost?
                </Link>
                <Link className="dropdown-item" to="#">
                  Download Client
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Community
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">
                  Search Character
                </Link>
                <Link className="dropdown-item" to="#">
                  Who is online?
                </Link>
                <Link className="dropdown-item" to="#">
                  Item Market
                </Link>
                <Link className="dropdown-item" to="#">
                  Helpdesk
                </Link>
                <Link className="dropdown-item" to="#">
                  Deaths
                </Link>
                <Link className="dropdown-item" to="#">
                  Killers
                </Link>
                <Link className="dropdown-item" to="#">
                  Guilds
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Statistics
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/highscores">
                  Highscores
                </Link>
                <Link className="dropdown-item" to="#">
                  Killers
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Library
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">
                  Gallery
                </Link>
                <Link className="dropdown-item" to="#">
                  Support
                </Link>
                <Link className="dropdown-item" to="#">
                  Houses
                </Link>
                <Link className="dropdown-item" to="#">
                  Spells
                </Link>
                <Link className="dropdown-item" to="#">
                  Changelog
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">
                  Buy Points
                </Link>
                <Link className="dropdown-item" to="#">
                  Shop Offers
                </Link>
                <Link className="dropdown-item" to="#">
                  Character Auction
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <form action="characterprofile.php" method="get" className="mr-3">
          <div className="input-group me-2">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Character name"
              aria-label="Character name"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                <i className="fas fa-search" /> Search
              </button>
            </div>
          </div>
        </form>
      </nav>
    </>
  );
};

export default Menu;
