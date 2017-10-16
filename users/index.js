'use strict';

const { Users } = require('./models');
const { router } = require('./router');
// const {basicStrategy, jwtStrategy} = require('../auth/strategies');
module.exports = { Users , router };