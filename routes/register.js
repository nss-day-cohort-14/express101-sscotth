'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const router = Router()

router.get('/register', (req, res) =>
  res.render('register')
)

router.post('/register', ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered' })
        } else {
          return new Promise((resolve, reject) => {
            bcrypt.hash(password, 15, (err, hash) => {
              if (err) {
                reject(err)
              } else {
                resolve(hash)
              }
            })
          })
        }
      })
      .then(hash => User.create({ email, password: hash }))
      .then(() => res.redirect('/login'))
      .catch(err)
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
})

module.exports = router
