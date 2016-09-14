'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Order', {
  name: String,
  email: String,
  phone: String,
  size: Number,
})
