'use strict'

const { Router } = require('express')
const router = Router()

router.get('/', (req, res) =>
  res.render('index')
)

router.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

router.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

router.post('/contact', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

module.exports = router
