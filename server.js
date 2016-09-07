'use strict'

const express = require('express')

const app = express()

// Get port from environment and store in Express.
const port = process.env.PORT || 3000
app.set('port', port)

// pug configuration
app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'production') {
  app.locals.pretty = true
}

// middlewares
app.use(express.static('public'))

// routes
app.get('/', (req, res) =>
  res.render('index')
)

// Listen to requests on the provided port and log when available
app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
