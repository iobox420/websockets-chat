require('dotenv').config();

/*




*/

//Config file
const { HttpServerPort, MongoDbConnectionDriverCode } = require('./config');

//auth require
const authServer = require('./authServer/HttpAuthServer');
const callbackAuthServer = require('./authServer/callbackAuthServer');
const mongoose = require('mongoose');

async function start() {
  try {
    console.log('Start connect to mongo DB');
    await mongoose.connect(MongoDbConnectionDriverCode, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: false ,
    });
    console.log('Database connected');
    authServer.listen(HttpServerPort, callbackAuthServer);
  } catch (e) {
    console.log('Server start error');
    console.log(e);
  }
}
start();
/*






*/
const express = require('express');
const app = express();
const userController = require('./authServer/controllers/user-controller');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`${socket.client.id} connected`);

  socket.room = 'general';
  socket.join('general');

  socket.on('change-room', (room) => {
    socket.leave(socket.room);
    socket.join(room);
    socket.to(room).emit('broadcast-message', `${socket.id} joined to room-1`);
    socket.room = room;
    console.log(`${socket.id} change room to ${room}`);
  });

  socket.on('chat-message', (message) => {
    if (socket.room !== 'room-for-auth-users') {
      socket.disconnect();
    }
    console.log(
      `broadcast-message: ${message} \r\n to room:${socket.room}\r\n ${io.engine.clientsCount}`
    );
    io.to(socket.room).emit('broadcast-message', {
      email: socket.email,
      text: message,
    });
  });

  socket.on('auth', (AuthDataForWS) => {
    const { accessToken, email } = AuthDataForWS;
    socket.email = email;
    const CheckAccessToken = userController.verifyAccessSocketIO(accessToken);
    /*const CheckAccessToken = false;*/
    if (CheckAccessToken) {
      console.log(`${socket.email} Authorized`);
      socket.emit('auth-response  ', {
        status: 200,
        message: 'Authorized',
      });
      socket.leave('room-for-auth-users');
      socket.join('room-for-auth-users');
      socket.room = 'room-for-auth-users';
      console.log(`${socket.email} change room to room-for-auth-users`);
    }
    if (!CheckAccessToken) {
      console.log(`${socket.email} Not authorized`);
      socket.emit('auth-response', {
        status: 401,
        message: 'Unauthorized',
      });
      socket.disconnect();
    }
  });

  socket.on('disconnecting', (socket) => {
    console.log(`disconnecting ${socket}`);
  });
});

server.listen(process.env.WS_SERVER_PORT, () => {
  console.log(
    `Socket.IO server listening on http://localhost:${process.env.WS_SERVER_PORT}`
  );
});
/*






























*/
/*
const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);
const request = mailjet.post('send', { version: 'v3.1' }).request({
  Messages: [
    {
      From: {
        Email: 'iobox420@gmail.com',
        Name: 'Mailjet Pilot',
      },
      To: [
        {
          Email: '2028future@gmail.com',
          Name: 'passenger 1',
        },
      ],
      Subject: 'Your email flight plan!',
      TextPart:
        'Dear passenger 1, welcome to Mailjet! May the delivery force be with you!',
      HTMLPart:
        '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
    },
  ],
});
request
  .then((result) => {
    console.log('mail jet result', result.body);
  })
  .catch((err) => {
    console.log('mail jet error', err.statusCode);
  });
*/

// const MailJetApiService = require('./authServer/service/mail-jet-api-service');
//
// MailJetApiService.sendMail('2028future@gmail.com');
