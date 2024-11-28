const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

// 4.18 - login
loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username }); // finds user by username
  const passwordCorrect =
    user === null // if user is null, password is incorrect
      ? false
      : await bcrypt.compare(password, user.passwordHash); // compares password with user's passwordHash

  if (!(user && passwordCorrect)) {
    // if user or password is incorrect return error
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    // create user object for token
    username: user.username,
    id: user._id,
  };

  // create token with user object and secret key
  const token = jwt.sign(userForToken, config.SECRET, {
    expiresIn: 60 * 60, // 1 hour expiration 60 * 60
  });

  response // send token and user info as response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
