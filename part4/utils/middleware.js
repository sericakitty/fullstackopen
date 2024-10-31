const jwt = require('jsonwebtoken');
const config = require('./config');
const logger = require('./logger')
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  // skip logging in test environment or production
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    return next();
  }
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  } else if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ error: 'unauthorized' });
  }

  next(error);
};

// 4.20 - tokenExtractor middleware to extract token from request
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // extract token and set it in request object
    request.token = authorization.substring(7);
  } else {
    // if no valid token is provided
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  next();
};

// 4.22 - userExtractor middleware to extract user from request
const userExtractor = async (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, config.SECRET);

      if (decodedToken.id) {
        // retrieve user by decoded token id and set to request.user
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return response.status(400).json({ error: 'User not found' });
        }
        request.user = user;
      }
    } else {
      return response.status(401).json({ error: 'Token missing or invalid' });
    }
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token or user not found' });
  }
  next();
};



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}