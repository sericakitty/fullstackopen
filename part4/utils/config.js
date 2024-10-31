
require('dotenv').config() // import dotenv and configure

const PORT = process.env.PORT // set port from .env file
const SECRET = process.env.SECRET // set secret from .env file, used for jwt token
const MONGODB_URI = process.env.Node_ENV === 'test' // set mongodb url from .env file
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}