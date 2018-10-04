const events = require('express').Router();
const { getUpdates, postUpdate, getUpdate, updateUpdate, getUpdateForStall } = require('../controllers/Updates.js');

events.route('/')
  .get(getUpdates)
  .post(postUpdate);

events.route('/:events_id')
  .get(getUpdate)
  .patch(updateUpdate);

events.route('/:events_id/:stall_id')
  .get(getUpdateForStall);

module.exports = events;