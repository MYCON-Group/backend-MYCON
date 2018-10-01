const { EventStalls } = require('../models');


const addStallToEvent = (req, res, next) => {
  EventStalls.addToLookUp(req.params, req.body)
    .then(eventStall => {
      console.log(eventStall, 'eventStall')
      res.status(201).send({ eventStall })
    })
    .catch(err => {
      next(err);
    })
}

module.exports = { addStallToEvent }