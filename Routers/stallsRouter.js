const stallsRouter = require('express').Router()
const { getStalls, getStall, postStall, updateStallInfo, getStallByName } = require('../controllers/Stalls.js')


stallsRouter.route('/')
    .get(getStalls)
    .post(postStall);


stallsRouter.route('/:stall_id')
    .get(getStall)
    .patch(updateStallInfo);

stallsRouter.route('/:stall_name/login')
    .get(getStallByName)

module.exports = stallsRouter