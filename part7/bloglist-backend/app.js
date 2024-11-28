const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const router = require('express').Router();
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require('./utils/middleware');
const User = require('./models/user');
const Blog = require('./models/blog');

app.use(cors());
app.use(express.json());

app.use(requestLogger);

// Reset database only in test environment
if (process.env.NODE_ENV === 'test') {
  app.delete('/api/reset', async (request, response) => {
    console.log('Reset endpoint called in test mode');
    await Blog.deleteMany({});
    await User.deleteMany({});
    response.status(204).end();
  });
}

app.use('/api/blogs', tokenExtractor, userExtractor, blogsRouter); // use tokenExtractor & userExtractor middleware for blogsRouter
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
