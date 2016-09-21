'use strict'

const { Router } = require('express')

const router = Router()

const root = require('./root')
const about = require('./about')
const contact = require('./contact')
const login = require('./login')
const register = require('./register')
const order = require('./order')

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

router.get('/logout', (req, res) =>
  res.render('logout', { page: 'Logout'})
)

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

module.exports = router
