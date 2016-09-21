'use strict'

const { Router } = require('express')

const router = Router()

// public routes
router.use(require('./about'))
router.use(require('./contact'))
router.use(require('./login'))
router.use(require('./register'))
router.use(require('./root'))

// login guard middleware
router.use((req, res, next) => {
  if (req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
})

// private routes
router.use(require('./logout'))
router.use(require('./order'))

module.exports = router
