'use strict'

const bcrypt = require('bcrypt')

const User = require('../models/user')

module.exports.new = (req, res) =>
  res.render('login')

module.exports.create = ({ session, body: { email, password } }, res, err) =>
  User.findOne({ email })
    .then(user => {
      if (user) {
        return new Promise((resolve, reject) =>
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolve(matches)
            }
          })
        )
      } else {
        res.render('login', { msg: 'Email does not exist in our system' })
      }
    })
    .then((matches) => {
      if (matches) {
        session.email = email
        res.redirect('/')
      } else {
        res.render('login', { msg: 'Password does not match' })
      }
    })
    .catch(err)
