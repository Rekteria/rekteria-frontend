import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { playerCreate, playerList } from '../../../../actions/PlayerActions';

import Container from '../../../Layouts/Container';
import { createVocations } from '../../../../config';
import Error from '../../../../helpers/Error';
import './styles.css';

const CreateCharacter = ({ playerCreate, playerList, player }) => {
  const history = useHistory();

  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [vocation, setVocation] = React.useState('');

  React.useEffect(() => {
    playerList();
  }, [playerList]);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name,
      sex,
      vocation,
    };

    playerCreate(data)
      .then(() => {
        history.push('/account/characters');
      })
      .catch((err) => {
        const metadata = err.response.data.metadata;
        const message = err.response.data.message;

        const convertObjToArray = Object.entries(metadata).length;

        if (convertObjToArray === 0) {
          setError(message);
        } else {
          setError(metadata.error.name);
        }
      });
  };

  if (player?.length >= 5) {
    return <Redirect to="/account" />;
  }

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <div className="tab-content py-3">
          <div className="tab-pane fade active show">
            <div className="panel panel-default">
              <div className="panel-heading">Create Character</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label className="form-label" htmlFor={name}>
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={name}
                        placeholder="Enter your nickname"
                        onChange={(event) =>
                          setName(
                            event.target.value
                              .toLowerCase()
                              .split(' ')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(' ')
                          )
                        }
                        required
                      />
                      <span className="help-block">
                        Your unique username to Game.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-auto">
                    <div className="form-group">
                      <input
                        type="radio"
                        className="visible"
                        name="sex"
                        value="0"
                        data-icon=""
                        onChange={(event) => setSex(Number(event.target.value))}
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="form-group">
                      <input
                        type="radio"
                        className="visible"
                        name="sex"
                        value="1"
                        data-icon=""
                        onChange={(event) => setSex(Number(event.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  {Object.keys(createVocations).map((vocation) => (
                    <div className="col-auto">
                      <label
                        key={createVocations[vocation].vocation_id}
                        htmlFor={createVocations[vocation].vocation_id}
                        className="custom-radio"
                      >
                        <input
                          type="radio"
                          name="vocation"
                          id={createVocations[vocation].vocation_id}
                          value={createVocations[vocation].vocation_id}
                          onChange={(event) =>
                            setVocation(Number(event.target.value))
                          }
                        />
                        <span className="radio-btn">
                          <i className="las la-check"></i>
                          <div className="hobbies-icon">
                            <i className="fas fa-ghost"></i>
                            <h3>{createVocations[vocation].name}</h3>
                          </div>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="row justify-content-center pb-2">
                  <button className="btn btn-primary btn-md btn-round mr-3">
                    Create Character
                  </button>
                  <Link to="/account">
                    <button className="btn btn-warning btn-md btn-round">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player.player,
  };
};

export default connect(mapStateToProps, { playerCreate, playerList })(
  CreateCharacter
);
