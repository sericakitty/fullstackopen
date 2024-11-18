import React from 'react';
import PropTypes from 'prop-types';

// 5.1 - login form
const LoginForm = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        data-testid="username-input"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        data-testid="password-input"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button data-testid="login-button" type="submit">
      login
    </button>
  </form>
);

// 5.12 - prop types
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
