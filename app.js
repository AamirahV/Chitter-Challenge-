require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000
const methodOverride = require('method-override');
const { User } = require('./models/user.js');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session')


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(expressLayouts);
app.use(session({
    secret: 'super top secret',
    resave: false,
    saveUninitialized: true,
  }))

const registrationRouter = require('./routes/registration.js')
app.use('/registration', registrationRouter)


const chitterRouter = require('./routes/chitter.js')
app.use('/chitter', chitterRouter)

app.use(async (req, res, next) => {
    if (req.session.userId) {
      res.locals.currentUser = await User.findOne({
        where: {
          id: req.session.userId
        }
      })
    } else {
      res.locals.currentUser = undefined
    }
    res.locals.errors = []
    next()
  })
  
  const authenticator = (req, res, next) => {
    if (req.session.userId === undefined) {
      res.redirect('/')
    } else {
      next()
    }
  }

  app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/welcome', authenticator, (req, res) => {
    res.render('welcome')
  })


app.listen(port, () => {
    console.log(`Chitter app listening at http://localhost:${port}`)
  })