'use strict'

const mongoose = require('mongoose')

const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

module.exports = mongoose.model('Order', {
  name: { type: String, required: true },
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: HTML5_EMAIL_REGEX,
  },
  phone: { type: String, required: true },
  size: { type: Number, required: true },
  toppings: { type: [String], default: ['Cheese'] },
})
