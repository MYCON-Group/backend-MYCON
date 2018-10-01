const stallsRouter = require('express').Router()
const { getStalls, getStall, postStall, updateStallInfo} = require('../controllers/Stalls.js')


stallsRouter.route('/')
    .get(getStalls)
    .post(postStall);
    

stallsRouter.route('/:stall_id')
    .get(getStall)
    .patch(updateStallInfo);

module.exports = stallsRouter