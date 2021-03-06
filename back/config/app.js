const { PROTOCOLS } = require('../consts');

module.exports = {
  port: process.env.PORT || 3000,
  sslPort: 3333,
  socket_port: process.env.SOCKET_PORT || 30000,
  mongoUri: process.env.MONGO_URI,
  PROTOCOL: process.env.PROTOCOL || PROTOCOLS.HTTP,
  secret: 'SECRET',
};
