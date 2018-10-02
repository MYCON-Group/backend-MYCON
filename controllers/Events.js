const { Event } = require('../models');
const { isEmpty } = require('lodash');

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
  Event.selectById(req.params.events_id, '*')
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
  Event.updateValue(req.params.events_id, req.body)
    .then(event => {
      if (isEmpty(event)) throw ({ status: 400, msg: 'No data returned from the query.' })
      else res.status(201).send({ event })
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { getEvents, postEvent, getEvent, updateEvent };