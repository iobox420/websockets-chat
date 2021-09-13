const { HttpServerPort } = require('../config');

function callbackAuthServer() {
  console.log(`AuthServer app listening at http://localhost:${HttpServerPort}`);
}

module.exports = callbackAuthServer;
