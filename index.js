const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
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
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

app.get('api/restaurantsdata', (req, res) => {
    const restaurantArray = [
        {
            name: 'Burger & Lobster',
            hours: '24 Hours',
            cusine: 'Seafood, Burgers',
            price: 20,
            address: '39 W 19th St New York, NY 10011',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/burger-and-lobster-new-york',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Upstate',
            hours: '24 Hours',
            cusine: 'Seafood, Wine Bars, Beer Bar',
            price: 20,
            address: '95 1st Ave New York, NY 10003',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/upstate-new-york-2',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Sotto Le Stelle',
            hours: '24 Hours',
            cusine: 'Pizza',
            price: 20,
            address: '44-07 Queens Blvd Sunnyside, NY 11104',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/sotto-le-stelle-sunnyside',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Amélie',
            hours: '24 Hours',
            cusine: 'French, Wine Bars',
            price: 20,
            address: '22 W 8th St New York, NY 10011',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/am%C3%A9lie-new-york',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Joe’s Shanghai',
            hours: '24 Hours',
            cusine: 'Shanghainese, Desserts, Seafood',
            price: 20,
            address: '9 Pell St New York, NY 10013',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/joes-shanghai-new-york-2',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Cecconi’s Dumbo',
            hours: '24 Hours',
            cusine: 'Italian, Breakfast & Brunch, Bars',
            price: 30,
            address: '55 Water St Brooklyn, NY 11201',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/cecconis-dumbo-brooklyn',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Jacob’s Pickles',
            hours: '24 Hours',
            cusine: 'Comfort Food, Southern, American',
            price: 20,
            address: '509 Amsterdam Ave New York, NY 10024',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/jacobs-pickles-new-york',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Summerhill',
            hours: '24 Hours',
            cusine: 'Cocktail Bars, American (New), Tiki Bars',
            price: 40,
            address: '637 Nostrand Ave Brooklyn, NY 11216',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/summerhill-brooklyn-4',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Petra Bar & Restaurant',
            hours: '24 Hours',
            cusine: 'Bars, American',
            price: 20,
            address: '523 Evergreen Ave Brooklyn, NY 11221',
            reservation: false,
            restaurant_URL: 'https://www.yelp.com/biz/petra-bar-and-restaurant-brooklyn',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        }, {
            name: 'Suffolk Arms',
            hours: '24 Hours',
            cusine: 'Cocktail Bars, Breakfast & Brunch, Gastropubs',
            price: 20,
            address: '269 Houston St, New York, NY 10002',
            reservation: false,
            restaurant_URL: 'http://www.suffolkarms.com/',
            restaurant_Image_URL: 'https://s3-media4.fl.yelpcdn.com/bphoto/fF1GcoJ6r9K3VckugcoZeg/180s.jpg'
        },
    ];
    res.json(restaurantArray);
})


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

module.exports = { app };