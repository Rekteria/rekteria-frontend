import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { playerCreate, playerList } from '../../../../actions/PlayerActions';
import { toast, ToastContainer } from 'react-toastify';
import Container from '../../../Layouts/Container';
import { createVocations, towns } from '../../../../config';
import './styles.css';

const CreateCharacter = ({ playerCreate, playerList, player }) => {
  const history = useHistory();

  const [, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [vocation, setVocation] = React.useState('');
  const [town_id, setTown_id] = React.useState();

  React.useEffect(() => {
    playerList();
  }, [playerList]);

  const submitHandler = (event) => {
    event.preventDefault();

    const data = {
      name,
      sex,
      vocation,
      town_id,
    };

    playerCreate(data)
      .then(() => {
        toast.success('Your character was created successfully, good game.');
        setTimeout(() => history.push('/account'), 5000);
      })
      .catch((err) => {
        const metadata = err.response.data.metadata;
        const message = err.response.data.message;

        const convertObjToArray = Object.entries(metadata).length;

        if (convertObjToArray === 0) {
          setError(message);
          toast.error(message);
        } else {
          let messageError = Object.values(metadata.error);
          setError(metadata.error.name);
          toast.error(messageError[0]);
        }
      });
  };

  if (player?.length >= 5) {
    return <Redirect to="/account" />;
  }

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <div className="tab-content">
          <div className="tab-pane fade active show">
            <div className="panel panel-default">
              <div className="panel-heading">Create Character</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Character Name:</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name={name}
                              placeholder="Character name"
                              onChange={(event) =>
                                setName(
                                  event.target.value
                                    .toLowerCase()
                                    .split(' ')
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(' ')
                                )
                              }
                              required
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Town:</td>
                          <td>
                            <select
                              name="town_id"
                              className="form-control width:200px"
                              onChange={(event) =>
                                setTown_id(Number(event.target.value))
                              }
                            >
                              <option value="" selected hidden disabled>
                                Choose Town
                              </option>
                              <option value={8}>{towns[8]}</option>
                              <option value={6}>{towns[6]}</option>
                              <option value={9}>{towns[9]}</option>
                              <option value={7}>{towns[7]}</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-auto">
                    <div className="form-group">
                      <input
                        type="radio"
                        className="visible"
                        name="sex"
                        value="1"
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
                        value="0"
                        data-icon=""
                        onChange={(event) => setSex(Number(event.target.value))}
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  {Object.keys(createVocations).map((vocation) => (
                    <div className="col-auto" key={vocation}>
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
      <ToastContainer className="toast-message" />
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
