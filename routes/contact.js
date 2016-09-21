'use strict'

const { Router } = require('express')

const Contact = require('../models/contact')

const router = Router()

router.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

router.post('/contact', (req, res, err) =>
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
)

module.exports = router
