import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { signIn } from '../../../actions/AccountActions';
import { getImageUrl } from '../../../helpers/Api';

import { toast, ToastContainer } from 'react-toastify';

import { FaSignInAlt } from 'react-icons/fa';

import { TextField } from '../../../components/Input/TextField';
import Button from '../../../components/Button';

import ProfileAvatar from '../../../assets/img/Profile_Avatar.png';

const AccountWidget = ({ account }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const validate = Yup.object({
    name: Yup.string()
      .min(6)
      .max(15, 'Must be 15 characters or less')
      .required('Account Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  });

  // if (account) {
  //   return <Redirect to="/account" />;
  // }

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        setLoading(true);
        dispatch(signIn(values))
          .then(() => {
            history.push('/account');
          })
          .catch((err) => {
            const { data } = err.response;
            toast.error(data.message);
            setLoading(false);
            resetForm();
          });
      }}
    >
      {(formik) => (
        <div className="col-bg">
          <h3>Account</h3>
          <hr />

          {account ? (
            <>
              <div className="card mb-g rounded-top">
                <div className="row no-gutters row-grid">
                  <div className="col-12">
                    <div className="d-flex flex-column align-items-center justify-content-center p-4">
                      {account.avatar === '' ||
                      account.avatar === null ||
                      account.avatar === undefined ? (
                        <img
                          src={ProfileAvatar}
                          alt={ProfileAvatar}
                          style={{
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                        />
                      ) : (
                        <div className="imagem-avatar">
                          <img
                            src={getImageUrl(account.avatar)}
                            alt="Avatar"
                            className="profile-image-lg rounded-circle"
                          />
                        </div>
                      )}
                      <h5 className="mb-0 fw-700 text-center mt-3">
                        <span className="subheader-title text-truncate text-truncate-lg text-primary mr-2">
                          {account?.profileName === '' ||
                          account?.profileName === null ? (
                            <Link to="/account/profile_name">Set Profile</Link>
                          ) : (
                            account?.profileName
                          )}
                          ,
                        </span>
                        <small className="text-muted mb-0">
                          {account?.location === '' ||
                          account?.location === null ? (
                            <Link to="/account/profile">Set Location</Link>
                          ) : (
                            account?.location
                          )}
                        </small>
                      </h5>
                    </div>
                  </div>
                  <div className="col">
                    <div className="text-center py-1">
                      <h5 className="mb-0 fw-700">
                        You have {account?.coins}
                        <small className="text-muted mb-0 ml-2">Coins</small>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm ml-2"
                        >
                          Buy Coins
                        </button>
                      </h5>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 text-center">
                      <Link to="/account" className="btn-link font-weight-bold">
                        My Account
                      </Link>
                      <span className="text-primary d-inline-block m-1">●</span>
                      <Link
                        to="/account/characters/create"
                        className="btn-link font-weight-bold"
                      >
                        Create Character
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Form className="form-signin">
                <TextField
                  type="text"
                  placeholder="Your account name"
                  name="name"
                />
                <TextField
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
                {/* <button
                  className="btn btn-secondary btn-block w-100 mb-2 mt-2"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  <FaSignInAlt size={20} className="mr-2" />
                  {loading ? 'Loading... ' : 'Login'}
                </button> */}
                <Button
                  className="btn btn-info btn-block btn-lg waves-effect waves-themed mb-1 mt-3"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  <FaSignInAlt size={20} className="mr-2" />
                  {loading ? 'Loading... ' : 'Sign-in'}
                </Button>
              </Form>
              <Link to="/sign-up">
                <button
                  className="btn btn-warning btn-block w-100 mb-2"
                  type="submit"
                >
                  <i className="fas fa-user-plus" /> Create New Account
                </button>
              </Link>

              <center>
                <a href="recovery.php" id="forgot_pswd">
                  Lost Acount?
                </a>
              </center>
            </>
          )}
          <ToastContainer className="toast-message" />
        </div>
      )}
    </Formik>
  );
};

export default AccountWidget;
