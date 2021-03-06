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
  Updates.selectAndJoin(req.params, 'stall', 'stall_id', '*')
    .then(update => {
      if (typeof update === 'object') {
        res.status(200).send({ update });
      } else {
        throw ({ status: 400, msg: 'No data returned from the query.' })
      }
    })
    .catch(err => {
      next(err);
    })
}

const getUpdateForStall = (req, res, next) => {
  Updates.selectByDoubleParam(req.params.events_id, req.params.stall_id, '*')
    .then(updates => {
      if (isEmpty(updates)) throw ({ status: 400, msg: 'No data returned from the query.' })
      else res.status(200).send({ updates })
    })
    .catch(err => {
      next(err)
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

module.exports = { getUpdates, postUpdate, getUpdate, updateUpdate, getUpdateForStall };