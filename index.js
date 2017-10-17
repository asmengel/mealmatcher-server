const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
const { router: restaurantsRouter } = require('./restaurants');
const { router: usersRouter } = require('./users');
const { router: authRouter, basicStrategy, jwtStrategy } = require('./auth');
//const {dbConnect} = require('./db-knex');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
// passport.use(basicStrategy);
passport.use(jwtStrategy);
const app = express();
// endpoints
app.use('/api/auth/', authRouter);
app.use('/api/restaurants/', restaurantsRouter);
app.use('/api/users', usersRouter);
app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

if (require.main === module) {
    dbConnect();
    runServer();
}

module.exports = {app};