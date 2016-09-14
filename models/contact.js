'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Contact', {
  name: String,
  email: String,
  phone: String,
  message: String,
})
