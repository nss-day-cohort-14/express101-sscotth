'use strict'

const express = require('express')

const app = express()

// Get port from environment and store in Express.
const port = process.env.PORT || 3000
app.set('port', port)

// routes
app.get('/', (req, res) =>
  res.send('<h1>Welcome to My App!</h1>')
)

// Listen to requests on the provided port and log when available
app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
