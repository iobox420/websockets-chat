//Http authentification server require
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const router = require('./routers');
const errorMiddleware = require('./middleware/error-middleware');

//Express
const app = express();

app.use(bodyParser());
app.use(express.json());
app.use(cookieParser());
/*app.use(logger());*/
app.use(
  cors({
    credentials: true,
    /*origin: process.env.CLIENT_URL,*/
    origin: (origin, callback) => {
      callback(null, true);
    },
  })
);
app.use('/api', router);
app.use(errorMiddleware);

module.exports = app;
