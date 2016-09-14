'use strict'

const { Router } = require('express')
const router = Router()

const Contact = require('../models/contact')
const Order = require('../models/order')
const Size = require('../models/size')

router.get('/', (req, res) =>
  res.render('index')
)

router.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

router.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

router.post('/contact', (req, res, err) =>
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
)

router.get('/order', (req, res) =>
  Size
    .find()
    .sort({ inches: 1 })
    .then(sizes => res.render('order', { page: 'Order', sizes }))
)

router.post('/order', (req, res, err) =>
  Order
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
)

module.exports = router
