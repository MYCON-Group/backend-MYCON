const events = require('express').Router();
const { addStallToEvent, getEventStallInfo, addEventStallInfo, getStallForEvent } = require('../controllers/Event-Stalls.js')
const { getEvents, postEvent, getEvent, updateEvent } = require('../controllers/Events.js');

events.route('/')
  .get(getEvents)
  .post(postEvent);

events.route('/:events_id')
  .get(getEvent)
  .post(addStallToEvent)
  .patch(updateEvent);

events.route('/:events_id/map')
  .get(getEventStallInfo)
  .patch(addEventStallInfo)

events.route('/:events_id/stalls')
  .get(getStallForEvent)

module.exports = events;