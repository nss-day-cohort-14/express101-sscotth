'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { cyan, red } = require('chalk')

const routes = require('./routes/') // same as ./routes/index.js
const { connect } = require('./db/database')

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
app.locals.errors = {} // errors & body added to avoid guard statements
app.locals.body = {} // i.e. value=(body && body.name) vs. value=body.name

// middlewares
app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'pizzadescottsupersecretkey'
}))

require('./lib/passport-strategies')
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.email = req.user && req.user.email
  next()
})

app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
  const timeStamp = new Date()
  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use(routes)

// Custom 404 page
app.use((req, res) =>
  res.render('404')
)

// Error handling middleware
app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {

    if (process.env.NODE_ENV === 'production') {
      res.sendStatus(err.status || 500)
    } else {
      res.set('Content-Type', 'text/plain').send(err.stack)
    }

    const timeStamp = new Date()
    const statusCode = res.statusCode
    const statusMessage = res.statusMessage

    console.error(
      `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
    )
    console.error(err.stack)
  }
)

// Listen to requests on the provided port and log when available
connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
