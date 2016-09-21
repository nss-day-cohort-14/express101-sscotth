'use strict'

const { Router } = require('express')

const session = require('../controllers/session')

const router = Router()

router.get('/login', session.new)
router.post('/login', session.create)

module.exports = router
