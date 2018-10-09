const { Stall } = require('../models');
const { isEmpty } = require('lodash');

const getStalls = (req, res, next) => {
  Stall.selectAll('*')
    .then(stalls => {
      res.status(200).send({ stalls });
    })
    .catch(err => {
      next(err);
    })
}

const getStall = (req, res, next) => {
  Stall.selectById(req.params.stall_id, '*')
    .then(stall => {
      res.status(200).send({ stall });
    })
    .catch(err => {
      next(err);
    })
}

const getStallByName = (req, res, next) => {
  Stall.selectByParameter(req.params, req.params.stall_name, '*')
    .then(stall => {
      stall = stall[0]
      res.status(200).send({ stall })
    })
    .catch(err => {
      next(err)
    })
}

const postStall = (req, res, next) => {
  Stall.add(req.body)
    .then(stall => {
      res.status(201).send({ stall })
    })
    .catch(err => {
      next(err);
    })
}

const updateStallInfo = (req, res, next) => {
  Stall.updateValue(req.params.stall_id, req.body)
    .then(stall => {
      if (isEmpty(stall)) throw ({ status: 400, msg: 'No data returned from the query.' })
      else res.status(201).send({ stall })
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { getStalls, postStall, getStall, updateStallInfo, getStallByName };