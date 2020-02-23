const express = require('express');
const router = express.Router();
//const gravatar = require('gravatar');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
//const keys = require('../config/keys');
const passport = require('passport');

const vertify =  passport.authenticate('jwt', { session: false });
const control = require('../controllers/Users')

router.post('/register', (req, res) => {
    control.registerUser(req,res);
  }
);

router.post('/login', (req, res) => {
    control.loginUser(req,res);
  }
);

router.get( '/current',vertify,(req, res) => {
    control.currentUser(req,res);
  }
);

module.exports = router;
