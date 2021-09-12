//Http authentification server require
const express = require("express");
const cors = require("cors");
//Express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routers
const router = require("./routers/test");

app.use("/test", router);

module.exports = app;
