const bcrypt = require('bcrypt');
const JWT = require('../utils/JWT');
const User = require('../models/userModel');

const authController = {
  signin(req, res) {
    res.send('sigin');
  },
  signup(req, res) {
    res.send('signup');
  },
  refreshToken(req, res) {
    res.send('refreshToken');
  },
};

module.exports = authController;
