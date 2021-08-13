const express = require('express')
const router = express.Router({mergeParams: true})
const { User } = require('../models')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    req.session.userId = user.id
    res.redirect('/welcome')
  }
  else {
    res.render('/login', { errors: ["ERRRRORRRR"] })
  }
})

router.delete('/', (req, res) => {
  req.session.userId = undefined
  res.redirect('/')
})

module.exports = router
