'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const router = Router()

router.get('/login', (req, res) =>
  res.render('login')
)

router.post('/login', ({ session, body: { email, password } }, res, err) => {
  User.findOne({ email })
    .then(user => {
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolve(matches)
            }
          })
        })
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
})

module.exports = router
