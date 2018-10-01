const { Event } = require('../models');

const getEvents = (req, res, next) => {
  Event.selectAll('*')
    .then(events => {
      res.status(200).send({ events });
    })
    .catch(err => {
      next(err);
    })
}

const getEvent = (req, res, next) => {
  Event.selectById(req.params.event_id, '*')
    .then(event => {
      res.status(200).send({ event });
    })
    .catch(err => {
      next(err);
    })
}

const postEvent = (req, res, next) => {
  Event.add(req.body)
    .then(event => {
      res.status(201).send({ event })
    })
    .catch(err => {
      next(err);
    })
}

const updateEvent = (req, res, next) => {
  Event.updateValue(/*decide what to send*/)
    .then(event => {
      res.status(201).send({ event })
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { getEvents, postEvent, getEvent, updateEvent };