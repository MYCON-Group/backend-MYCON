const events = require('express').Router();
const { getEvents, postEvent, getEvent, updateEvent } = require('../controllers/articles');

articlesRouter.route('/')
  .get(getEvents)
  .post(postEvent);

articlesRouter.route('/:event_id')
  .get(getEvent)
  .patch(updateEvent);


module.exports = events;