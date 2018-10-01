const generateModel = require('./generate-model');

module.exports = {
  Event: generateModel('events'),
  Stall: generateModel('stall')
}