'use strict'

const { Router } = require('express')

const router = Router()

const about = require('./about')
const contact = require('./contact')
const login = require('./login')
const logout = require('./logout')
const order = require('./order')
const register = require('./register')
const root = require('./root')

// public routes
router.use(about)
router.use(contact)
router.use(login)
router.use(register)
router.use(root)

// login guard middleware
router.use((req, res, next) => {
  if (req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
})

// private routes
router.use(logout)
router.use(order)

module.exports = router
