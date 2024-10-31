const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware');

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use('/api/blogs',tokenExtractor, userExtractor, blogsRouter); // 4.20, 4.22 - use tokenExtractor & userExtractor middleware for blogsRouter
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
