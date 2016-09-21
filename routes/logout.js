'use strict'

const { Router } = require('express')

const router = Router()

const logout = require('../controllers/logout')

router.get('/logout', logout.edit)
router.post('/logout', logout.destroy)

module.exports = router
