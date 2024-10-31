// 4.1 - 4.2 bloglist
const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app) // create server using app

server.listen(config.PORT, () => { // listen to port
  logger.info(`Server running on port ${config.PORT}`) // log success message
})