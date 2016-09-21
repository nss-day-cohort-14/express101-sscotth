'use strict'

const { Router } = require('express')

const router = Router()

router.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

module.exports = router
