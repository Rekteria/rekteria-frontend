import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { sellCharcter } from '../../../actions/CharacterBazarActions';
import Container from '../../Layouts/Container';

const SellCharacter = () => {
  const { state } = useLocation();
  const [priceInCoins, setPriceInCoins] = React.useState(0);
  const [recoveryKey, setRecoveryKey] = React.useState('');
  const [descriptionChar, setDescriptionChar] = React.useState('');
  const [characterName] = React.useState(state.name);

  const data = {
    characterName,
    priceInCoins,
    recoveryKey,
    descriptionChar,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    sellCharcter(data);
  };

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Sell Character Bazar</div>
        <div className="panel-body">
          <form method="POST">
            <p>
              <b>Before selling your character</b>
            </p>
            <p></p>
            <ul>
              <li>Your character must be offline to create the offer.</li>
              <li>
                When creating an offer, you will lose your character and all the
                items that your character has, you will need to wait{' '}
                <b style={{ color: 'red' }}>1 day (24 hours)</b> to be abble to
                remove your character from offers in your panel.
              </li>
              <li>Remove all market offers that are linked to the character</li>
              <li>Banned characters can not be sold.</li>
              <li>Characters with house can not be sold.</li>
              <li>
                <b style={{ color: 'red' }}>ATTENTION!</b> REMOVE this character
                access to the houses, doors and subowners, because will be
                transferred automatically to the new owner.
              </li>
              <li>
                When the trade is complete, you will automatically receive the
                Rekteria Coins from your offer in your account.
              </li>
            </ul>
            <p />
            <div className="form-group">
              <label>Character</label>
              <input
                defaultValue={state.name}
                type="text"
                name="character"
                className="form-control"
                disabled
              />
            </div>
            <div className="form-group">
              <label>Price in Rekteria Coins</label>
              <input
                min={100}
                max={99998}
                type="number"
                name="price"
                className="form-control"
                onChange={(event) => setPriceInCoins(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Recovery key</label>
              <input
                type="text"
                name="rk"
                maxLength={50}
                placeholder="Recovery key"
                className="form-control"
                onChange={(event) => setRecoveryKey(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="info"
                maxLength={100}
                className="form-control"
                defaultValue={''}
                onChange={(event) => setDescriptionChar(event.target.value)}
              />
            </div>
            <p>
              <b style={{ color: 'red' }}>
                Attention! If you put to sell this character, you will lose the
                control of the character for 1 day (24 hours), we will not make
                any kind of refund. The responsibility for sell this character
                is all yours.
              </b>
            </p>
            <div className="form-group">
              <Link to="/bazar" className="btn btn-danger">
                Back
              </Link>{' '}
              <button
                name="submit"
                className="btn btn-success"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(SellCharacter);
