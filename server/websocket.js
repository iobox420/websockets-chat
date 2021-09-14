const { WebSocketsPort } = require('./config');

const ws = require('ws');

const wss = new ws.Server(
  {
    port: WebSocketsPort,
  },
  () =>
    console.log(
      `WebSockets app listening at http://localhost:${WebSocketsPort}`
    )
);

module.exports.wss = wss;

function connection(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message);
    switch (message.event) {
      case 'message':
        broadcastMessage(message);
        break;
      case 'connection':
        broadcastMessage(message);
        break;
      case 'auth':
        break;
      case 'new-user':
        break;
    }
  });
}

module.exports.connection = connection;

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}

/*function Authentification() {}*/
