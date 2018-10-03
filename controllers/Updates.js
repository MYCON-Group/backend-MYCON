const { Updates } = require('../models');
const { isEmpty } = require('lodash');

const getUpdates = (req, res, next) => {
  Updates.selectAll('*')
    .then(updates => {
      res.status(200).send({ updates });
    })
    .catch(err => {
      next(err);
    })
}

const getUpdate = (req, res, next) => {
  Updates.selectById(req.params.events_id, '*')
    .then(update => {
      res.status(200).send({ update });
    })
    .catch(err => {
      next(err);
    })
}

const postUpdate = (req, res, next) => {
  Updates.add(req.body)
    .then(update => {
      res.status(201).send({ update })
    })
    .catch(err => {
      next(err);
    })
}

const updateUpdate = (req, res, next) => {
  Updates.updateValue(req.params.events_id, req.body)
    .then(update => {
      if (isEmpty(update)) throw ({ status: 400, msg: 'No data returned from the query.' })
      else res.status(201).send({ update })
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { getUpdates, postUpdate, getUpdate, updateUpdate };