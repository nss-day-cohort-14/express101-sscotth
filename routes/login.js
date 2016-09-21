'use strict'

const { Router } = require('express')

const login = require('../controllers/login')

const router = Router()

router.get('/login', login.new)
router.post('/login', login.create)

module.exports = router
