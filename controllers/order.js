'use strict'

const Order = require('../models/order')
const Size = require('../models/size')
const Topping = require('../models/topping')

module.exports.new = (req, res, err) =>
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

module.exports.create = ({ body }, res, err) =>
  Order
    .create(body)
    .then(() => res.redirect('/'))
    .catch(({ errors }) =>
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
