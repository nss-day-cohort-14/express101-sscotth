'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Size', {
  name: String,
  inches: Number,
})
