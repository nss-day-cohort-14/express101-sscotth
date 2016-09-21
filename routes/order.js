'use strict'

const { Router } = require('express')

const order = require('../controllers/order')

const router = Router()

router.get('/order', order.new)
router.post('/order', order.create)

module.exports = router
