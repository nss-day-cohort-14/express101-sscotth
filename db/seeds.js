'use strict'

const { connect, disconnect } = require('./database')

const Size = require('../models/size')
const sizes = require('./sizes')

const Topping = require('../models/topping')
const toppings = require('./toppings')

connect()
  .then(() => Size.remove({}))
  .then(() => Size.insertMany(sizes))
  .then(() => Topping.remove({}))
  .then(() => Topping.insertMany(toppings))
  .then(disconnect)
  .catch(console.error)
