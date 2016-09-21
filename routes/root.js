'use strict'

const { Router } = require('express')

const { index } = require('../controllers/home')

const router = Router()

router.get('/', index)

module.exports = router
