import React from 'react';
import { useDispatch } from 'react-redux';
import { playerList } from '../../../actions/PlayerActions';
import { guildCreate } from '../../../actions/GuildActions';
import { getFormData } from '../../../helpers/FormData';
import { toast, ToastContainer } from 'react-toastify';
import Container from '../../Layouts/Container';

const GuildCreate = () => {
  const dispatch = useDispatch();
  const [players, setPlayers] = React.useState([]);

  React.useEffect(() => {
    dispatch(playerList()).then(({ payload }) => {
      const newData = payload.data.data;
      setPlayers(newData);
    });
  }, [dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = getFormData(e);
    dispatch(guildCreate(data))
      .then(() => {})
      .catch((err) => {
        const metadata = err.response.data.metadata;
        const message = err.response.data.message;
        const convertObjToArray = Object.entries(metadata).length;

        if (convertObjToArray === 0) {
          toast.error(message);
        } else {
          toast.error(metadata.error.name);
        }
      });
  };

  return (
    <Container>
      <div className="panel panel-default mx-auto">
        <div className="panel-heading">Guild Create</div>
        <div className="panel-body">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">We are almost there!</h4>
            <p>
              You need to have at least one character with minimum level of 50
              to form a guild. Also this character cannot be member of other
              guild.
            </p>
          </div>
          <br />
          <br />
          <form onSubmit={submitHandler}>
            <div className="col ml-auto mr-auto">
              <div className="card p-4 rounded-plus bg-faded">
                <div className="form-group row">
                  <div className="col-6 pr-1">
                    <select className="form-control" name="ownerid">
                      {players && players.length
                        ? players.map((player) => {
                            return (
                              <option key={player.id} value={player.id}>
                                {player.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                    {/* <div className="invalid-feedback">
										No, you missed this one.
									</div> */}
                  </div>
                  <div className="col-6 pl-1">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Guild Name"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    placeholder="Description"
                    cols="30"
                    rows="3"
                  ></textarea>
                </div>

                <div className="row justify-content-center pb-1">
                  <div className="mx-auto">
                    <button className="btn btn-block btn-danger btn-lg mt-3 waves-effect waves-themed">
                      Create Guild
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer className="toast-message" />
    </Container>
  );
};

export default GuildCreate;
