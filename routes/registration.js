const express = require('express')
const router = express.Router({mergeParams: true})
const bcrypt = require('bcryptjs')
const { User } = require('../models')


router.get('/', (req, res) => {
    let currentUser = res.locals.currentUser
  res.render('registration', {currentUser: currentUser})
})

router.post('/', async (req, res) => {
  const user = await User.findOrCreate({
      where: { email: req.body.email, 
        passwordHash: bcrypt.hashSync(req.body.password)}
  }).then((user) => {
    req.session.userId = user[0].id
  })
  
  res.redirect('/welcome')
})

module.exports = router