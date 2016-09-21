'use strict'

const Contact = require('../models/contact')

module.exports.new = (req, res) =>
  res.render('contact', { page: 'Contact' })

module.exports.create = (req, res, err) =>
  Contact
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
