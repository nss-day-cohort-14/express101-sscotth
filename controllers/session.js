'use strict'

const passport = require('passport')

module.exports.new = (req, res) =>
  res.render('login')

module.exports.create = (req, res, next) =>
  passport.authenticate('local', (err, user, msg) => {
    if (err) { return next(err) }
    if (!user) { return res.render('login', msg) }

    req.logIn(user, err => {
      if (err) { return next(err) }
      res.redirect('/')
    })
  })(req, res, next)

module.exports.edit = (req, res) =>
  res.render('logout', { page: 'Logout'})

module.exports.destroy = (req, res) => {
  req.logout()
  res.redirect('/login')
}
