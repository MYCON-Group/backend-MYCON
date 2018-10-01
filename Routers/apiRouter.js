const apiRouter = require('express').Router();
const eventsRouter = require('./events');

apiRouter.route('/')
// .get((req, res, next) => {
//   if (err) next(err);
//   res.render('../view/pages/api.ejs');
// });

apiRouter.use('/event', eventsRouter);


module.exports = apiRouter;