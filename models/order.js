'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Order', {
  name: String,
  email: String,
  phone: String,
  size: Number,
  toppings: [String], // toppings should be an array of `String`s
})
