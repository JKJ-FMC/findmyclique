import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../store';
import './Login_Page.css';
import firebase from 'firebase/app';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const siginIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.uid);
        // ...
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="login_container">
      {/* <div className="login-bg"></div> */}
      <div className="login_form_container">
        <form
          onSubmit={handleSubmit}
          name={name}
          className="login-form-container login-form"
        >
          <div className="login_form_element">
            <h1>Sign in</h1>
          </div>

          <div className="login_form_element">
            <label className="email" htmlFor="email">
              Email
            </label>
            <input
              onChange={(ev) => setEmail(ev.target.value)}
              name="email"
              type="text"
            />
          </div>
          <div className="login_form_element">
            <label htmlFor="password">Password</label>
            <input
              onChange={(ev) => setPassword(ev.target.value)}
              name="password"
              type="password"
            />
          </div>
          <div className="login_form_element">
            <button
              type="submit"
              className="submit-btn"
              onClick={() => siginIn(email, password)}
            >
              Sign in
            </button>
          </div>
          <p className="sign-up-opt">Dont have an account yet? Sign Up</p>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <div className="right-side"></div>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
