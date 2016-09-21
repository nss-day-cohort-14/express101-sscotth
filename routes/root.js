'use strict'

const { Router } = require('express')

const router = Router()

const { index } = require('../controllers/home')

router.get('/', index)

module.exports = router
