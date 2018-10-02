const { EventStalls } = require('../models');


const addStallToEvent = (req, res, next) => {
  EventStalls.addToLookUp(req.params, req.body)
    .then(event_stalls => {
      res.status(201).send({ event_stalls })
    })
    .catch(err => {
      next(err);
    })
}

const getEventStallInfo = (req, res, next) => {
  EventStalls.selectById(req.params.events_id, '*')
    .then(event_stalls => {
      res.status(200).send({ event_stalls })
    })
    .catch(err => {
      next(err);
    })
}

module.exports = { addStallToEvent, getEventStallInfo }