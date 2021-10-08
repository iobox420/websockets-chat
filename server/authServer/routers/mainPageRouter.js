const Router = require('express').Router;
const mainRouter = new Router();

const MainPageRouter = (req, res, next) => {
  try {
    res.json('Main page');
  } catch (e) {
    next(e);
  }
};

mainRouter.get('', MainPageRouter);

module.exports = mainRouter;
