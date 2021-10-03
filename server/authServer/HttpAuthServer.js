//Http authentification server require
const express = require('express');
const cors = require('cors');
/*const bodyParser = require('body-parser');*/
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const router = require('./routers');
const mainRouter = require('./routers/mainPageRouter');
const errorMiddleware = require('./middleware/error-middleware');

//Express
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(logger());
app.use(
  cors({
    credentials: true,
    /*origin: process.env.CLIENT_URL,*/
    origin: 'http://localhost:3000',
  })
);
app.use('/api', router);
app.use('', mainRouter);
app.use(errorMiddleware);

module.exports = app;
