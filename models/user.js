'use strict'

const { compare } = require('bcrypt')
const mongoose = require('mongoose')

const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [HTML5_EMAIL_REGEX, 'Please enter a valid email address'],
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  }
})

// class/static/model methods
userSchema.statics.findOneByEmail = function (email, cb) {
  const collection = this
  return collection.findOne({ email }, cb)
}

// instance methods
userSchema.methods.comparePassword = function (password, cb) {
  const user = this

  // Support callback and `Promise` pattern
  if (typeof cb === 'function') {
    return compare(password, user.password, cb)
  }

  return new Promise((resolve, reject) =>
    compare(password, user.password, (err, matches) =>
      err ? reject(err) : resolve(matches)
    )
  )
}

module.exports = mongoose.model('User', userSchema)
