const apiRouter = require('express').Router();
const eventsRouter = require('./eventsRouter');
const stallsRouter = require('./stallsRouter');

apiRouter.route('/')
// .get((req, res, next) => {
//   if (err) next(err);
//   res.render('../view/pages/api.ejs');
// });

apiRouter.use('/events', eventsRouter);
apiRouter.use('/stalls', stallsRouter);

module.exports = apiRouter;