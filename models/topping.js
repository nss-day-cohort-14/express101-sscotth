'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Topping', {
  name: String,
})
