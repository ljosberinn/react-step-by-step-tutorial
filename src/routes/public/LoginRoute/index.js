import React from 'react';
import Helmet from 'react-helmet';

export default function LoginRoute() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange({ target }) {
    const { name, value, type, checked } = target;

    console.log(name, value, type, checked);
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <form onSubmit={handleSubmit} spellCheck={false} autoComplete='off'>
        <fieldset>
          <legend>
            <h1>Login</h1>
          </legend>

          <label>
            Username
            <input
              type='text'
              placeholder='username'
              required
              name='username'
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Password
            <input
              type='password'
              placeholder='password'
              required
              name='password'
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Repeat password
            <input
              type='password'
              placeholder='repeat password'
              required
              name='repeatPassword'
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Remember me
            <input type='checkbox' name='rememberMe' onChange={handleChange} />
          </label>

          <br />

          <button type='submit'>Login</button>
        </fieldset>
      </form>
    </>
  );
}
