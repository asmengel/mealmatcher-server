'use strict';
// endpoint: /api/auth/

const express = require('express');
const router = express.Router();
const config = require('../config');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('passport');
const jsonParser = bodyParser.json();
//import apiRepr

const createAuthToken = function (user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

// const basicAuth = passport.authenticate('basic', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

router.post('/login', jsonParser, (req, res) => {
  console.log(req);
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

router.post('/refresh', jwtAuth, jsonParser, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { router, jwtAuth };
