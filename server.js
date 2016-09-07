'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Get port from environment and store in Express.
const port = process.env.PORT || 3000
app.set('port', port)

// pug configuration
app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'production') {
  app.locals.pretty = true
}

app.locals.company = '🍕 Pizza de Scott'

// middlewares
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.get('/', (req, res) =>
  res.render('index')
)

app.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

app.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

app.post('/contact', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

// Listen to requests on the provided port and log when available
app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
