import React, { useState, useContext } from 'react';
import Helmet from 'react-helmet';
import { AuthContext } from '../../../context/AuthContext';
import PRIVATE_ROUTES from '../../../routes/private';
import { Redirect } from 'react-router-dom';

const INITIAL_STATE = {
  username: '',
  password: '',
  rememberMe: false,
};

const LOCAL_STORAGE_KEY = 'loginUserName';

export default function LoginRoute() {
  const shouldBeRemembered = !!localStorage.getItem(LOCAL_STORAGE_KEY);

  const [data, setData] = useState({
    ...INITIAL_STATE,
    ...(shouldBeRemembered && {
      username: localStorage.getItem(LOCAL_STORAGE_KEY),
      rememberMe: true,
    }),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { handleLogin, isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Redirect to={PRIVATE_ROUTES.Dashboard.path} />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(function() {
      setIsLoading(false);

      // some password verification, verify on backend, etc
      // flip a coin to fake backend answer
      const randomNumber = Math.random();

      if (randomNumber >= 0.5) {
        setError('Username unknown.');
      } else {
        if (data.rememberMe) {
          localStorage.setItem(LOCAL_STORAGE_KEY, data.username);
        } else if (shouldBeRemembered) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        handleLogin(data.username);
      }
    }, 1000);
  }

  function handleChange({ target }) {
    const { name, value, type, checked } = target;

    switch (type) {
      case 'checkbox':
        setData({ ...data, rememberMe: checked });
        break;
      default:
        setData({ ...data, [name]: value });
    }
  }

  const { username, password } = data;

  const isDisabled = username.length === 0 || password.length === 0;

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <form onSubmit={handleSubmit} spellCheck={false} autoComplete="off">
        <fieldset disabled={isLoading}>
          <legend>
            <h1>Login</h1>
          </legend>

          <label>
            Username
            <input
              type="text"
              placeholder="username"
              required
              name="username"
              onChange={handleChange}
              autoFocus={!shouldBeRemembered}
              value={username}
            />
          </label>

          <br />

          <label>
            Password
            <input
              type="password"
              placeholder="password"
              required
              name="password"
              onChange={handleChange}
              autoFocus={shouldBeRemembered}
            />
          </label>

          <br />

          <br />

          <label>
            Remember me
            <input
              type="checkbox"
              name="rememberMe"
              onChange={handleChange}
              defaultChecked={shouldBeRemembered}
            />
          </label>

          <br />

          {error && <p>There was an error logging you in: {error}</p>}

          <button type="submit" disabled={isDisabled}>
            {isLoading ? 'loading...' : 'Login'}
          </button>
        </fieldset>
      </form>
    </>
  );
}
