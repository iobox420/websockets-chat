//Config file
const { HttpServerPort, MongoDbConnectionDriverCode } = require('./config');

//auth require
const authServer = require('./authServer/HttpAuthServer');
const callbackAuthServer = require('./authServer/callbackAuthServer');
const mongoose = require('mongoose');

/*//ws require
const connection = require("./websocket").connection;
const wss = require("./websocket").wss;

//WebSockets server
//On event connection call function connection
wss.on("connection", connection);*/

async function start() {
  try {
    console.log('Start connect to mongo  DB');
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
