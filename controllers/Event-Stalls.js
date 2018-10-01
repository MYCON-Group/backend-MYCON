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

module.exports = { addStallToEvent }