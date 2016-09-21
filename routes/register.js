'use strict'

const { Router } = require('express')

const user = require('../controllers/user')

const router = Router()

router.get('/register', user.new)
router.post('/register', user.create)

module.exports = router
