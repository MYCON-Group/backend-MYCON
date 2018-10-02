const generateModel = require('./generate-models.js');

module.exports = {
  Event: generateModel('events'),
  Stall: generateModel('stall'),
  EventStalls: generateModel('event_stalls')
}