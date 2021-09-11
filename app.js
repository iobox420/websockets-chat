const { HttpServerPort } = require("./config");
//auth require
const authServer = require("./authServer/HttpAuthServer");
const callbackAuthServer = require("./authServer/callbackAuthServer");

//ws require1
const connection = require("./websocket").connection;
const wss = require("./websocket").wss;

authServer.listen(HttpServerPort, callbackAuthServer);

//WebSockets server
//On event connection call function connection
wss.on("connection", connection);
