'use strict'

const { Router } = require('express')

const router = Router()

const Order = require('../models/order')
const Size = require('../models/size')
const Topping = require('../models/topping')

const root = require('./root')
const about = require('./about')
const contact = require('./contact')
const login = require('./login')
const register = require('./register')

router.use(root)
router.use(about)
router.use(contact)
router.use(login)
router.use(register)

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login')
  })
})

// login guard middleware
router.use((req, res, next) => {
  if (req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
})

router.get('/order', (req, res, err) => {
  Promise
    .all([
      Size.find().sort({ inches: 1 }),
      Topping.find().sort({ name: 1 }),
    ])
    .then(([
        sizes,
        toppings,
      ]) =>
      res.render('order', { page: 'Order', sizes, toppings })
    )
    .catch(err)
})

router.post('/order', ({ body }, res, err) =>
  Order
    .create(body)
    .then(() => res.redirect('/'))
    .catch(({ errors })  =>
      Promise.all([ // retrieve sizes and toppings again,
        Promise.resolve(errors), // but pass the errors along as well
        Size.find().sort({ inches: 1 }),
        Topping.find().sort({ name: 1 }),
      ])
    )
    .then(([
        errors,
        sizes,
        toppings,
      ]) =>
      // UI/UX additions
      // send errors to renderer to change styling and add error messages
      // also, send the req.body to use as initial form input values
      res.render('order', { page: 'Order', sizes, toppings, errors, body })
    )
    .catch(err)
)

router.get('/logout', (req, res) =>
  res.render('logout', { page: 'Logout'})
)

module.exports = router
