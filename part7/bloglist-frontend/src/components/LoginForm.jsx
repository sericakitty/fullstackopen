import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap'; // 7.20, 7.21 - import Bootstrap Form ja Button

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => (
  <div className="login-form-container">
    <h2>Login</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          data-testid="username-input"
          type="text"
          value={username}
          name="Username"
          placeholder="Enter your username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          data-testid="password-input"
          type="password"
          value={password}
          name="Password"
          placeholder="Enter your password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button data-testid="login-button" variant="primary" type="submit">
        Login
      </Button>
    </Form>
  </div>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
