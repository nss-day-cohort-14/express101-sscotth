'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')

const User = require('../models/user')

passport.serializeUser((user, cb) => cb(null, user.id))
passport.deserializeUser((_id, cb) => User.findOne({ _id }, cb))

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, cb) =>
    User.findOneByEmail(email)
      .then(user => {
        if (user) {
          return Promise.all([
            user,
            user.comparePassword(password),
          ])
        }

        cb(null, null, { msg: 'Email does not exist in our system' })
      })
      .then(([user, matches]) => {
        if (matches) {
          cb(null, user, { msg: 'Successfully logged in' })
        } else {
          cb(null, null, { msg: 'Password does not match' })
        }
      })
      .catch(cb)
)

passport.use(localStrategy)
