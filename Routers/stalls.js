const stalls = require('express').Router()


stallsRouter.route('/')
    .get(getStalls)
    .post(postStall)
    

stallsRouter.route('/:stall_id')
    .patch(updateStallInfo)

