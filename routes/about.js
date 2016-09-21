'use strict'

const { Router } = require('express')

const router = Router()

const { index } = require('../controllers/about')

router.get('/about', index)

module.exports = router
