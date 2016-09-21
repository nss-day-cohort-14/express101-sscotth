'use strict'

const { Router } = require('express')

const { index } = require('../controllers/about')

const router = Router()

router.get('/about', index)

module.exports = router
