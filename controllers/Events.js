const Event = require('../models/Event');

const getEvents = (req, res, next) => {
  let query = {};
  if (req.params.event_id) query = { _id: req.params.event_id };
  return Event.find(query)
    .lean()
    // .populate('created_by')
    .then((events) => {
      if (!events[0]) return Promise.reject({ status: 404, msg: 'Page Not Found' });
      events = events[0];
      res.status(200).send({ events });
    })
    .catch(err => {
      if (err.name === 'CastError') next({ status: 400, msg: 'Bad Request' });
      else next(err);
    });
};


module.exports = { getEvents, postEvent, getEvent, updateEvent };