const apiRouter = require('express').Router();
const usersRouter = require('./usersRouter');

apiRouter.route('/')
// .get((req, res, next) => {
//   if (err) next(err);
//   res.render('../view/pages/api.ejs');
// });

apiRouter.use('/users', usersRouter);


module.exports = apiRouter;