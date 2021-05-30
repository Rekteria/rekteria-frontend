import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFormData } from '../../../helpers/FormData';
import { forgotPassword } from '../../../actions/AccountActions';
import Container from '../../Layouts/Container';

import Background from '../../../assets/img/backgrounds/pattern-1.svg';

import Error from '../../../helpers/Error';

const ForgotPassword = ({ forgotPassword }) => {
  const [error, setError] = React.useState();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = getFormData(e);

    forgotPassword(data)
      .then(({ payload }) => {
        history.push('/reset');
      })
      .catch((err) => {
        const { data } = err.response;

        if (Object.entries(data.metadata).length > 0) {
          Object.keys(data.metadata.error).forEach(function (item) {
            setError(data.metadata.error[item]);
          });
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <Container>
      <div className="text-center mb-3">
        <div className="col mt-2">
          <div className="card p-4 rounded-plus bg-faded">
            <div className="page-inner bg-brand-gradient ">
              <div className="page-content-wrapper bg-transparent m-0">
                <div
                  className="flex-1"
                  style={{
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center bottom',
                    backgroundSize: 'cover',
                  }}
                >
                  {' '}
                  <div className="py-4 py-lg-5 my-lg-5 px-4 px-sm-0">
                    <div className="row">
                      <div className="col-xl-12">
                        <h2 className="fs-xxl fw-500 mt-4 text-center text-primary">
                          "My dog ate my password"{' '}
                          <small className="h3 fw-300 mt-3 mb-5 opacity-60 hidden-sm-down">
                            Not a problem, happens to the best of us. Just use
                            the form below to reset it!
                          </small>
                        </h2>
                      </div>
                      <div className="col-xl-6 ml-auto mr-auto">
                        <div className="card p-4 rounded-plus bg-faded">
                          <form onSubmit={submitHandler}>
                            <div className="form-group">
                              <label className="form-label" htmlFor="email">
                                Your username or email
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Recovery email"
                                required
                              />
                              <div className="invalid-feedback">
                                No, you missed this one.
                              </div>
                              <div className="help-block">
                                We will email you the instructions
                              </div>
                              <Error error={error} />
                            </div>
                            <div className="row no-gutters">
                              <div className="col-md-4 ml-auto text-right">
                                <button
                                  type="submit"
                                  className="btn btn-danger waves-effect waves-themed"
                                >
                                  Recover
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-block text-center text-primary">
                    2021 © Rekteria;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
  };
};

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
