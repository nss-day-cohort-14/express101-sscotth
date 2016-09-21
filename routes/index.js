'use strict'

const { Router } = require('express')

const router = Router()

const root = require('./root')
const about = require('./about')
const contact = require('./contact')
const login = require('./login')
const register = require('./register')
const order = require('./order')
const logout = require('./logout')

router.use(root)
router.use(about)
router.use(contact)
router.use(login)
router.use(register)

// login guard middleware
router.use((req, res, next) => {
  if (req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
})

router.use(order)
router.use(logout)

module.exports = router
