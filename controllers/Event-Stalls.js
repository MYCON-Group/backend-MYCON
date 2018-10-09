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
  EventStalls.selectByParameter('events_id', req.params.events_id, '*')
    .then(event_stalls_unformatted => {
      const event_stalls = {};
      event_stalls_unformatted.map(info => {
        event_stalls[info.stall_id] = info
      })
      res.status(200).send({ event_stalls })
    })
    .catch(err => {
      next(err);
    })
}

const addEventStallInfo = (req, res, next) => {
  const infoToUpdate = Object.values(req.body)
  Promise.all(
    infoToUpdate.map(updateStall => {
      return EventStalls.updateManyValues(updateStall.event_stalls_id, updateStall)
    })
  )
    .then(event_stalls => {
      res.status(201).send({ event_stalls })
    })
    .catch(err => {
      next(err);
    })

}

const getStallForEvent = (req, res, next) => {
  EventStalls.selectAndJoin(req.params, 'stall', 'stall_id', '*')
    .then(stalls_unformatted => {
      const stalls = {};
      stalls_unformatted.map(stall => {
        stalls[stall.stall_id] = stall
      })
      res.status(200).send({ stalls })
    })
    .catch(err => {
      next(err);
    })
}

module.exports = { addStallToEvent, getEventStallInfo, addEventStallInfo, getStallForEvent }