import React from 'react';

import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { signIn } from '../../../actions/AccountActions';

import { toast, ToastContainer } from 'react-toastify';

import { FaSignInAlt } from 'react-icons/fa';

import { TextField } from '../../../components/Input/TextField';

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

  if (account) {
    return <Redirect to="/account" />;
  }

  return (
    <Formik
      initialValues={{
        name: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        dispatch(signIn(values))
          .then(() => {
            history.push('/account');
          })
          .catch((err) => {
            const { data } = err.response;
            toast.error(data.message);
            setLoading(false);
          });
      }}
    >
      {(formik) => (
        <div className="col-bg">
          <h3>Account</h3>
          <hr />
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
            <button
              className="btn btn-secondary btn-block w-100 mb-2 mt-2"
              type="submit"
              disabled={loading ? true : false}
            >
              <FaSignInAlt size={20} className="mr-2" />
              {loading ? 'Loading... ' : 'Login'}
            </button>
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
          <ToastContainer className="toast-message" />
        </div>
      )}
    </Formik>
  );
};

export default AccountWidget;
