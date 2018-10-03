const events = require('express').Router();
const { getUpdates, postUpdate, getUpdate, updateUpdate } = require('../controllers/Updates.js');

events.route('/')
  .get(getUpdates)
  .post(postUpdate);

events.route('/:events_id')
  .get(getUpdate)
  .patch(updateUpdate);

module.exports = events;