const { Stall } = require('../models');

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
      res.status(201).send({ stall })
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { getStalls, postStall, getStall, updateStallInfo };