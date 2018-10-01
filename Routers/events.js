const events = require('express').Router();
const { getEvents, postEvent, getEvent, updateEvent } = require('../controllers/Events.js');

events.route('/')
  .get(getEvents)
  .post(postEvent);

events.route('/:event_id')
  .get(getEvent)
  .patch(updateEvent);


module.exports = events;