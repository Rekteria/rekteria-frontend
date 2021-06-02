import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { playerGetCharacter } from '../../../actions/PlayerActions';
import { getAccount } from '../../../helpers/Account';

import SmallLogo from '../../../assets/img/logo_small.png';
import SearchInput from '../../../components/PageSearch/SearchInput';

const Menu = ({ mobile }) => {
  const account = getAccount();
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchName, setSearchName] = React.useState('');
  const [fulfilledName, setFulfilledName] = React.useState('');

  React.useEffect(() => {
    if (searchName) {
      setFulfilledName('');

      dispatch(playerGetCharacter(searchName))
        .then(({ payload }) => {
          setFulfilledName(payload.data.data.rows[0].name);
        })
        .catch((err) => {
          const { data } = err.response;

          history.push({
            pathname: '/PageSearch',
            customNameData: { error: data.message, name: searchName },
          });
        });
    }
  }, [searchName, dispatch, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (fulfilledName) {
      history.push(`/character/${fulfilledName}`);
    }
  };

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
              <Link className="nav-link" to="/forum">
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
                <Link className="dropdown-item" to="/forgot">
                  Account Lost?
                </Link>
                <Link className="dropdown-item" to="/downloads">
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
                <Link className="dropdown-item" to="/online">
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
                <Link className="dropdown-item" to="/guilds">
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
                <Link className="dropdown-item" to="/info">
                  Server Info
                </Link>
                <Link className="dropdown-item" to="/support">
                  Support
                </Link>
                <Link className="dropdown-item" to="/houses">
                  Houses
                </Link>
                <Link className="dropdown-item" to="/spells">
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

        <form
          onSubmit={submitHandler}
          className="app-forms hidden-xs-down mr-3"
          role="search"
          autoComplete="off"
        >
          <div className="input-group me-2">
            <SearchInput
              value={searchName}
              onChange={(search) => setSearchName(search)}
            />

            {!searchName && !fulfilledName ? (
              <div className="input-group-append">
                <button className="btn btn-primary disabled" type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
            ) : (
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  <i className="fas fa-search" /> <span>Search</span>
                </button>
              </div>
            )}
          </div>
        </form>
      </nav>
    </>
  );
};

export default Menu;
